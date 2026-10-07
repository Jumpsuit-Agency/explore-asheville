const PORT=9333;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws=new WebSocket(l.find(t=>t.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true})).result?.result?.value;
await send("Page.enable");await send("Runtime.enable");
const fs=await import("node:fs");
async function load(h){await send("Page.navigate",{url:"about:blank"});await sleep(320);
 await send("Page.navigate",{url:"http://localhost:3000/#"+h});await sleep(3200);}
const M=`const sc=new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.slide-canvas')).transform).a;
 const px=n=>Math.round(n/sc);
 const slide=document.querySelector('.slide'); const sr=slide.getBoundingClientRect();
 const rows=[...document.querySelectorAll('.ui-disclose')];
 const hdr=rows[0].previousElementSibling;
 const g=getComputedStyle(rows[0]).gridTemplateColumns.split(' ').map(v=>Math.round(parseFloat(v)/sc));
 const nameP=rows[0].querySelector('p');
 const glyph=rows[0].querySelectorAll('span')[1]||rows[0].querySelector('span');
 const score=slide.querySelector('.type-label');
 return {tableTop:px(hdr.getBoundingClientRect().top-sr.top),
         rowsTop:px(rows[0].getBoundingClientRect().top-sr.top),
         cols:g, rowH:px(rows[0].getBoundingClientRect().height),
         nameFs:getComputedStyle(nameP).fontSize,
         headerH:px(hdr.getBoundingClientRect().height),
         rowCount:rows.length};`;
const a=await load("rationale").then(()=>ev(M));
const s1=await send("Page.captureScreenshot",{format:"png"});fs.writeFileSync("rubric-16.png",Buffer.from(s1.result.data,"base64"));
const b=await load("client-rubric").then(()=>ev(M));
const s2=await send("Page.captureScreenshot",{format:"png"});fs.writeFileSync("rubric-17.png",Buffer.from(s2.result.data,"base64"));
console.log("                       rationale   client-rubric   match");
const keys=["tableTop","rowsTop","rowH","nameFs","headerH"];
for(const k of keys){
  const same=JSON.stringify(a[k])===JSON.stringify(b[k]);
  console.log(`  ${k.padEnd(20)} ${String(a[k]).padEnd(11)} ${String(b[k]).padEnd(14)} ${same?"yes":"NO"}`);
}
console.log(`  ${"columns".padEnd(20)} ${a.cols.join("/").padEnd(11)} ${b.cols.join("/").padEnd(14)} ${JSON.stringify(a.cols)===JSON.stringify(b.cols)?"yes":"NO"}`);
console.log(`  rows: ${a.rowCount} vs ${b.rowCount} (expected 5 vs 4)`);
// overview overlap check
await load("title");
await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'o',bubbles:true}));`);await sleep(900);
console.log("\noverview:", JSON.stringify(await ev(`
 const cards=[...document.querySelectorAll('.overview-thumb')];
 let overlaps=0;
 for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){
   const a=cards[i].getBoundingClientRect(), b=cards[j].getBoundingClientRect();
   if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1) overlaps++;
 }
 const grid=document.querySelector('.overview-grid');
 const last=cards[cards.length-1].getBoundingClientRect();
 return {cards:cards.length, overlaps, spillsBelowViewport: Math.round(last.bottom-innerHeight), scrolls: grid.scrollHeight>grid.clientHeight+2};`)));
const s3=await send("Page.captureScreenshot",{format:"png"});fs.writeFileSync("overview.png",Buffer.from(s3.result.data,"base64"));
ws.close();process.exit(0);
