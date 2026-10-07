const PORT=9333;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws=new WebSocket(l.find(t=>t.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true})).result?.result?.value;
await send("Page.enable");await send("Runtime.enable");
const key=k=>ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'${k}',bubbles:true}));`);
const SNAP=`const c=document.querySelector('.nav-counter');
 const tab=[...document.querySelectorAll('.pill:not(.pill-sm)')].find(b=>getComputedStyle(b).backgroundColor!=='rgba(0, 0, 0, 0)');
 const sec=[...document.querySelectorAll('.pill-sm')].find(b=>getComputedStyle(b).backgroundColor!=='rgba(0, 0, 0, 0)');
 const img=document.querySelector('.carousel-stage img');
 const ctr=[...document.querySelectorAll('.slide-content span')].find(d=>/^\\d+\\s*\\/\\s*\\d+$/.test((d.textContent||'').trim()));
 const scr=[...document.querySelectorAll('button')].filter(b=>/Spot$|^Winter$|^Radio$/.test(b.textContent.trim()))
     .find(b=>getComputedStyle(b).backgroundColor!=='rgba(0, 0, 0, 0)');
 const comingSoon=/Coming Soon/.test(document.querySelector('.slide-content')?.textContent||'');
 return {slide:c?c.textContent.trim():null, tab:tab?tab.textContent.trim():null, sec:sec?sec.textContent.trim():null,
         img:img?img.getAttribute('src').split('/').pop():null, ctr:ctr?ctr.textContent.trim():null,
         scr:scr?scr.textContent.trim():null, comingSoon};`;
for (const [hash,label,expected] of [["territory-1","T1",26],["territory-2-creative","T2",27],["territory-3-creative","T3",26]]){
  await send("Page.navigate",{url:"about:blank"});await sleep(320);
  await send("Page.navigate",{url:"http://localhost:3000/#"+hash});await sleep(3200);
  const seen=[]; const tabs=new Set(); const secs=new Set(); const imgs=new Set(); let stranded=0; let last=null; let exitAt=null;
  const startSlide=(await ev(SNAP)).slide;
  for(let i=0;i<expected+8;i++){
    const s=await ev(SNAP);
    if(s.slide!==startSlide){ exitAt=i; break; }
    const sig=`${s.tab}|${s.sec}|${s.img}|${s.ctr}|${s.scr}`;
    if(sig!==last){ seen.push(sig); last=sig; if(s.tab)tabs.add(s.tab); if(s.sec)secs.add(s.sec); if(s.img)imgs.add(s.img); if(s.comingSoon)stranded++; }
    await key("ArrowRight"); await sleep(260);
  }
  console.log(`${label}: ${seen.length} distinct stops (expected ${expected}) | tabs visited ${tabs.size} | sections ${secs.size} | unique art ${imgs.size} | Coming-Soon landings ${stranded} | left the slide after ${exitAt} presses`);
}
ws.close();process.exit(0);
