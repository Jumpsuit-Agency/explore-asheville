const PORT=9333, BASE="http://localhost:3200";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws=new WebSocket(l.find(t=>t.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();const net={bytes:0,reqs:0};
ws.onmessage=e=>{const m=JSON.parse(e.data);
  if(m.method==="Network.loadingFinished"){net.bytes+=m.params.encodedDataLength||0;net.reqs++;}
  if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true})).result?.result?.value;
await send("Page.enable");await send("Runtime.enable");await send("Network.enable");

// ---- FIRST-TIME VISITOR: clear everything, measure bytes to usable first paint
await ev(`const ks=await caches.keys(); for(const k of ks) await caches.delete(k);
 const rs=await navigator.serviceWorker.getRegistrations(); for(const r of rs) await r.unregister(); return true;`).catch(()=>{});
await send("Network.clearBrowserCache");
await send("Page.navigate",{url:"about:blank"});await sleep(600);
net.bytes=0;net.reqs=0;
await send("Page.navigate",{url:BASE});await sleep(3500);
const firstPaint={bytes:net.bytes,reqs:net.reqs};
console.log(`first visit, document usable:  ${(firstPaint.bytes/1048576).toFixed(2)} MB over ${firstPaint.reqs} requests`);
// let the worker finish its precache, measure the full background cost
for(let i=0;i<50;i++){
  const n=await ev(`const ks=await caches.keys();let n=0;for(const k of ks){const c=await caches.open(k);n+=(await c.keys()).length;}return n;`);
  if(n>=90) break; await sleep(1200);
}
console.log(`full precache complete:        ${(net.bytes/1048576).toFixed(2)} MB total over ${net.reqs} requests`);

// ---- OFFLINE: check the heaviest slides specifically
await send("Network.emulateNetworkConditions",{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
const key=k=>ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'${k}',bubbles:true}));`);
let worst=[];
for(const h of ["about","territory-1","territory-2-creative","territory-3-creative","territory-3-sas-story","territory-3-montage","closing"]){
  await send("Page.navigate",{url:"about:blank"});await sleep(300);
  await send("Page.navigate",{url:BASE+"/#"+h});await sleep(2600);
  // page through a few carousel items so more art is requested
  for(let i=0;i<4;i++){await key("ArrowRight");await sleep(350);}
  const r=await ev(`const im=[...document.querySelectorAll('img')];
   const bg=[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).backgroundImage.includes('url(')).length;
   return {imgs:im.length, broken:im.filter(x=>!x.complete||x.naturalWidth===0).length, bgLayers:bg,
           slide:(document.querySelector('.nav-counter')||{}).textContent.trim()};`);
  console.log(`  offline ${h.padEnd(24)} slide ${r.slide}  imgs ${r.imgs} (broken ${r.broken})  bg layers ${r.bgLayers}`);
  if(r.broken>0) worst.push(h);
}
console.log(worst.length?`BROKEN OFFLINE ON: ${worst.join(", ")}`:"no broken images on any slide offline");
await send("Network.emulateNetworkConditions",{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
ws.close();process.exit(0);
