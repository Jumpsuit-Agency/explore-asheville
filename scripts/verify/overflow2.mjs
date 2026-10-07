const PORT=9333, BASE="http://localhost:3000";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function conn(){for(let i=0;i<40;i++){try{const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();const p=l.find(t=>t.type==="page");if(p?.webSocketDebuggerUrl)return p.webSocketDebuggerUrl;}catch{}await sleep(250);}throw new Error("no chrome");}
const ws=new WebSocket(await conn());await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>{const r=await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true});
 if(r.result?.exceptionDetails)return {err:1};return r.result?.result?.value;};
await send("Page.enable");await send("Runtime.enable");
const IDS=["title","about","assignment","territories","territory-1-desc","territory-1","territory-2-desc","territory-2-creative","territory-3-desc","territory-3-montage","territory-3-digital","territory-3-guerrilla-intro","territory-3-sas-story","production-schedule","territory-3-creative","rationale","client-rubric","closing"];
// Only count elements that are NOT inside a clipping/scrolling ancestor —
// content inside one of those is scrolled, not spilling out of the slide.
const OVER=`const px=n=>+n.toFixed(0);
 const slide=document.querySelector('.slide'); if(!slide) return null;
 const sr=slide.getBoundingClientRect();
 const sc=new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.slide-canvas')).transform).a;
 const clipped=el=>{let n=el.parentElement;
   while(n && n!==slide){const o=getComputedStyle(n); if(o.overflowY!=='visible'||o.overflowX!=='visible') return true; n=n.parentElement;}
   return false;};
 let worst=0, culprit=null;
 for(const el of slide.querySelectorAll('*')){
   const r=el.getBoundingClientRect();
   if(r.width===0||r.height===0) continue;
   if(clipped(el)) continue;
   const ob=(r.bottom-sr.bottom)/sc;
   if(ob>worst){worst=ob;culprit=(el.textContent||el.tagName).trim().slice(0,32);}
 }
 // does the rail actually scroll, i.e. is any content unreachable?
 const sr2=slide.querySelector('[data-scroll-region]');
 const scrollable = sr2 ? {h:px(sr2.clientHeight/sc), content:px(sr2.scrollHeight/sc), scrolls: sr2.scrollHeight>sr2.clientHeight+2} : null;
 return {overflow:px(worst), culprit, scrollRegion:scrollable};`;
const out={};
for(const h of IDS){
  await send("Page.navigate",{url:"about:blank"});await sleep(280);
  await send("Page.navigate",{url:BASE+"/#"+h});await sleep(2500);
  out[h]=await ev(OVER);
}
await import("node:fs").then(fs=>fs.writeFileSync("overflow2.json",JSON.stringify(out,null,2)));
console.log("wrote overflow2.json");
ws.close();process.exit(0);
