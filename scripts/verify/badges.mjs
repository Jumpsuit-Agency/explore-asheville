// Walk every stop of every slide and check each visible image for a badge.
// Matches geometrically (is a visible .ai-badge sitting inside the image?)
// rather than by DOM order, so a differently-nested render still counts.
const PORT=9333;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws=new WebSocket(l.find(t=>t.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true})).result?.result?.value;
await send("Page.enable");await send("Runtime.enable");
await send("Network.enable");await send("Network.setCacheDisabled",{cacheDisabled:true});
await send("Emulation.setDeviceMetricsOverride",{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
const B=process.argv[2];
await send("Page.navigate",{url:B+"/"});await sleep(1800);
await ev(`if(navigator.serviceWorker){for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();}
          if(window.caches){for(const k of await caches.keys())await caches.delete(k);} return 1;`);
await send("Page.navigate",{url:"about:blank"});await sleep(300);
await send("Page.navigate",{url:B+"/#title"});await sleep(4000);

const SETTLE=`const cap=(pr,ms)=>Promise.race([pr,new Promise(r=>setTimeout(r,ms))]);
 await cap(Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;}))),6000);
 await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 return 1;`;

const CHECK=`
 const vis=el=>{const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&+s.opacity>0.05;};
 // Hit-test rather than trust geometry: a badge can be positioned correctly
 // and still be clipped by an ancestor's overflow or painted under something.
 const all=[...document.querySelectorAll('.ai-badge')];
 const prev=all.map(b=>b.style.pointerEvents);
 all.forEach(b=>b.style.pointerEvents='auto');
 const live=[];
 for(const b of all){
   if(!vis(b)) continue;
   const r=b.getBoundingClientRect();
   if(r.width<4||r.height<4) continue;
   const cx=(r.left+r.right)/2, cy=(r.top+r.bottom)/2;
   const hit=document.elementFromPoint(cx,cy);
   const painted = hit===b || (hit && b.contains(hit));
   live.push({r, painted});
 }
 all.forEach((b,i)=>b.style.pointerEvents=prev[i]||'');
 const out=[];
 for(const im of document.querySelectorAll('img')){
   const r=im.getBoundingClientRect();
   if(r.width<40||r.height<40) continue;
   if(!vis(im)) continue;
   const src=im.getAttribute('src')||'';
   const creative=src.startsWith('/creative/');
   const match=live.find(b=>{
     const cx=(b.r.left+b.r.right)/2, cy=(b.r.top+b.r.bottom)/2;
     return cx>=r.left-2&&cx<=r.right+2&&cy>=r.top-2&&cy<=r.bottom+2;
   });
   out.push({src, creative, badged: !!(match&&match.painted),
             positionedButHidden: !!(match&&!match.painted),
             w:Math.round(r.width), h:Math.round(r.height)});
 }
 const c=document.querySelector('.nav-counter');
 return {slide:(c?c.textContent.trim():'?'), hash:location.hash.slice(1), imgs:out};`;

const SIG=`const c=document.querySelector('.nav-counter');
 const slide=document.querySelector('.slide');
 const imgs=[...document.querySelectorAll('img')].map(i=>i.getAttribute('src')).join('|');
 const on=[...document.querySelectorAll('button,.pill,span')].filter(b=>getComputedStyle(b).backgroundColor!=='rgba(0, 0, 0, 0)').map(b=>(b.textContent||'').trim()).join('/');
 const txt=(slide?slide.textContent:'')||'';
 let h=0; const all=imgs+'##'+on+'##'+txt;
 for(let i=0;i<all.length;i++){h=(h*31+all.charCodeAt(i))|0;}
 return (c?c.textContent.trim():'?')+'##'+h;`;

const missing=new Map(); let stops=0, seenCreative=0, badged=0, total=0;
let last=null, same=0, totalSlides=null;
for(let i=0;i<400;i++){
  await ev(SETTLE); await sleep(220);
  const sig=await ev(SIG);
  const counter=sig.split('##')[0];
  if(!totalSlides && /\d+\s*\/\s*\d+/.test(counter)) totalSlides=counter.split('/')[1].trim();
  const atLast = totalSlides && counter.split('/')[0].trim()===String(totalSlides).padStart(2,'0');
  if(sig===last){ same++; if(atLast&&same>=2) break; if(same>=6) break; }
  else {
    same=0; last=sig; stops++;
    const r=await ev(CHECK);
    for(const im of r.imgs){
      total++;
      if(!im.creative) continue;
      seenCreative++;
      if(im.badged) badged++;
      else {
        const k=im.src;
        if(!missing.has(k)) missing.set(k,{src:k,slides:new Set(),size:`${im.w}x${im.h}`,why:im.positionedButHidden?'clipped/covered':'no badge'});
        missing.get(k).slides.add(r.hash||r.slide);
      }
    }
  }
  await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));`);
  await sleep(400);
}
console.log(`stops walked: ${stops}`);
console.log(`images seen: ${total} total | ${seenCreative} under /creative/ | ${badged} badged`);
console.log(`UNBADGED /creative/ images: ${missing.size}`);
for(const m of missing.values()) console.log(`  ${m.src}  (${m.size})  [${m.why}]  on: ${[...m.slides].join(', ')}`);
ws.close();process.exit(0);
