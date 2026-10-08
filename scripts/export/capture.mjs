// Walk the deck end to end with the forward key, capturing every stop —
// including each carousel comp — so the PDF holds the whole deck, not just
// the first frame of each slide.
const PORT=9333;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws=new WebSocket(l.find(t=>t.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true})).result?.result?.value;
const fs=await import('node:fs');
const BASE=process.argv[2], OUT=process.argv[3];
await send("Page.enable");await send("Runtime.enable");
await send("Network.enable");await send("Network.setCacheDisabled",{cacheDisabled:true});
await send("Emulation.setDeviceMetricsOverride",{width:1920,height:1080,deviceScaleFactor:2,mobile:false});
await send("Page.navigate",{url:BASE+"/"});await sleep(1800);
await ev(`if(navigator.serviceWorker){for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();}
          if(window.caches){for(const k of await caches.keys())await caches.delete(k);} return 1;`);
await send("Page.navigate",{url:"about:blank"});await sleep(300);
await send("Page.navigate",{url:BASE+"/#title"});await sleep(4000);

// Kill entrance animations and the deck chrome so pages print clean.
// Strip the presenter chrome. A client-facing PDF should not carry the
// slide counter, nav arrows, keyboard legend, offline toast or the advisor
// launcher on every page.
// Strip presenter chrome. A client-facing PDF should not carry the slide
// counter, nav arrows, progress bar, keyboard legend, offline toast or the
// advisor launcher — and the carousel arrows would be dead controls on paper.
const CHROME_OFF=`
 let s=document.getElementById('pdfcss');
 if(!s){ s=document.createElement('style'); s.id='pdfcss'; document.head.appendChild(s); }
 s.textContent = \`*,*::before,*::after{animation:none!important;transition:none!important}
   .nav-counter,.key-legend,.nav-arrow,.offline-chip,.advisor-trigger,.advisor-panel,
   .progress-bar,.carousel-stage button{display:none!important;visibility:hidden!important}\`;
 return 1;`;

/**
 * Per-slide staging. The deck's interactive states exist for a presenter
 * clicking live; on paper they have to be resolved to the state the slide is
 * actually making its point in.
 */
const STAGE=`
 const hash=location.hash.slice(1);
 if(hash==='assignment'){
   // Both rubrics ship collapsed behind a "Click to reveal" affordance.
   for(const el of document.querySelectorAll('.ui-disclose')){
     if(/Click to reveal/.test(el.textContent||'')) el.click();
   }
 }
 if(hash==='territories'){
   // Only one card can be flipped at a time in the live deck, so force all
   // three faces round for the export rather than changing that behaviour.
   for(const el of document.querySelectorAll('div')){
     if(getComputedStyle(el).transformStyle==='preserve-3d'){
       el.style.transition='none'; el.style.transform='rotateY(180deg)';
     }
   }
   // The CTAs lead nowhere in a PDF.
   for(const b of document.querySelectorAll('button,a')){
     if(/Explore the Big Idea|Flip to see the pitch|Flip back/.test(b.textContent||b.getAttribute('aria-label')||'')){
       b.style.visibility='hidden';
     }
   }
 }
 return 1;`;

const SETTLE=`const cap=(pr,ms)=>Promise.race([pr,new Promise(r=>setTimeout(r,ms))]);
 await cap(Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;}))),6000);
 await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 return 1;`;

// Hash the whole slide, not a prefix: the three script stops on Territory 1
// share an identical first 160 characters, which made consecutive distinct
// stops look like a stuck deck and ended the walk 50 pages early.
const SIG=`const c=document.querySelector('.nav-counter');
 const slide=document.querySelector('.slide');
 const imgs=[...document.querySelectorAll('img')].map(i=>i.getAttribute('src')).join('|');
 const on=[...document.querySelectorAll('button,.pill,span')]
   .filter(b=>getComputedStyle(b).backgroundColor!=='rgba(0, 0, 0, 0)')
   .map(b=>(b.textContent||'').trim()).join('/');
 const txt=(slide?slide.textContent:'')||'';
 let h=0; const all=imgs+'##'+on+'##'+txt;
 for(let i=0;i<all.length;i++){ h=(h*31+all.charCodeAt(i))|0; }
 return (c?c.textContent.trim():'?')+'##'+h;`;

let last=null, same=0, n=0;
const pages=[];
// The deck is done when the counter sits on the final slide and a further
// press changes nothing. Anything short of that is a stop worth capturing.
let total=null;
for(let i=0;i<400;i++){
  await ev(CHROME_OFF); await ev(STAGE); await ev(SETTLE); await sleep(300);
  const sig=await ev(SIG);
  const counter=sig.split('##')[0];
  if(!total && /\d+\s*\/\s*\d+/.test(counter)) total=counter.split('/')[1].trim();
  const atLast = total && counter.split('/')[0].trim() === String(total).padStart(2,'0');

  if(sig===last){
    same++;
    if(atLast && same>=2) break;      // genuinely at the end
    if(same>=6) break;                // wedged somewhere; bail rather than spin
  } else {
    same=0;
    const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
    fs.writeFileSync(`${OUT}/p${String(++n).padStart(3,"0")}.png`, Buffer.from(shot.result.data,'base64'));
    pages.push(counter);
    last=sig;
  }
  await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));`);
  await sleep(430);
}
// The closing page gets a live link back to the deck; capture the card's
// rect in CSS pixels so the PDF builder can place the annotation.
const linkRect = await ev(`
  const lbl=[...document.querySelectorAll('span,p')].find(e=>(e.textContent||'').trim()==='Keep Exploring');
  if(!lbl) return null;
  let card=lbl.parentElement;
  for(let i=0;i<4 && card;i++){ if(card.getBoundingClientRect().height>120) break; card=card.parentElement; }
  const r=card.getBoundingClientRect();
  return {x:r.x, y:r.y, w:r.width, h:r.height, vw:innerWidth, vh:innerHeight};`);
fs.writeFileSync(`${OUT}/link.json`, JSON.stringify({ page: n, rect: linkRect }, null, 1));
console.log("link rect on page", n, "->", JSON.stringify(linkRect));
console.log(`captured ${n} pages`);
const bySlide={};
for(const c of pages){ const k=c.split('/')[0].trim(); bySlide[k]=(bySlide[k]||0)+1; }
console.log("pages per slide:", JSON.stringify(bySlide));
ws.close();process.exit(0);
