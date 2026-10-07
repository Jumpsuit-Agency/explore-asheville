const PORT=9333, BASE=process.env.BASE||"http://localhost:3000";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function conn(){for(let i=0;i<40;i++){try{const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();const p=l.find(t=>t.type==="page");if(p?.webSocketDebuggerUrl)return p.webSocketDebuggerUrl;}catch{}await sleep(250);}throw new Error("no chrome");}
const ws=new WebSocket(await conn());await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id))p.get(m.id)(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}));});
const ev=async x=>{const r=await send("Runtime.evaluate",{expression:`(async()=>{${x}})()`,awaitPromise:true,returnByValue:true});
 if(r.result?.exceptionDetails)return null;return r.result?.result?.value;};
await send("Page.enable");await send("Runtime.enable");
const CTR=`const c=document.querySelector('.nav-counter');return c?c.textContent.trim():null;`;
const ctr=()=>ev(CTR);
const key=k=>ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'${k}',bubbles:true}));`);
const click=async(x,y)=>{await send("Input.dispatchMouseEvent",{type:"mousePressed",x,y,button:"left",clickCount:1});
 await send("Input.dispatchMouseEvent",{type:"mouseReleased",x,y,button:"left",clickCount:1});await sleep(480);};
async function load(h=""){await send("Page.navigate",{url:"about:blank"});await sleep(350);
 await send("Page.navigate",{url:BASE+(h?"/#"+h:"")});await sleep(3400);}
const R={};
await load();
R.total=await ctr();
// 1 mouse-only traversal via chevron
const chev=await ev(`const b=document.querySelectorAll('.nav-arrow')[1].getBoundingClientRect();return {x:Math.round(b.x+b.width/2),y:Math.round(b.y+b.height/2)};`);
// Flattened navigation means crossing the deck is now ~200 stops, not 18.
for(let i=0;i<260;i++){ await click(chev.x,chev.y); if((await ctr())==="18 / 18") break; }
R.viaChevron=await ctr();
// 2 clicker keys
await load(); await key("PageDown");await sleep(450);await key("PageDown");await sleep(450);
R.pageDown=await ctr(); await key("End");await sleep(500); R.end=await ctr(); await key("Home");await sleep(500); R.home=await ctr();
// 3 carousel drift on all three
R.carousel={};
for(const h of ["territory-1","territory-2-creative","territory-3-creative"]){
  await load(h); const ys=[];
  for(let i=0;i<5;i++){
    const y=await ev(`const px=n=>+n.toFixed(1);const bs=[...document.querySelectorAll('.slide-content button')].filter(b=>b.getBoundingClientRect().width<40&&b.getBoundingClientRect().width>0);return bs[0]?px(bs[0].getBoundingClientRect().y):null;`);
    ys.push(y);
    await ev(`const bs=[...document.querySelectorAll('.slide-content button')].filter(b=>b.getBoundingClientRect().width<40&&b.getBoundingClientRect().width>0);if(bs.length)bs[bs.length-1].click();`);
    await sleep(750);
  }
  R.carousel[h]=ys;
}
// 4 accordion drift
R.rows={};
for(const h of ["rationale","client-rubric"]){
  await load(h);
  const ROWS=`const px=n=>+n.toFixed(1);return [...document.querySelectorAll('.ui-disclose')].map(r=>px(r.getBoundingClientRect().y));`;
  const base=await ev(ROWS); const snaps=[base];
  for(const i of [0,1]){await ev(`document.querySelectorAll('.ui-disclose')[${i}].click();`);await sleep(600);snaps.push(await ev(ROWS));}
  R.rows[h]={base,drift:snaps.map(s=>s.map((y,i)=>+(y-base[i]).toFixed(1)))};
}
// 5 controls escape nav
await load("territory-3-creative");
const ab=await ev(`const bs=[...document.querySelectorAll('.slide-content button')].filter(b=>b.getBoundingClientRect().width<40&&b.getBoundingClientRect().width>0);
 if(!bs.length)return null;const r=bs[bs.length-1].getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};`);
R.escape={before:await ctr()}; if(ab){await click(ab.x,ab.y); R.escape.after=await ctr();}
// 6 advisor survives the nav layer
await load("closing");
R.advisor=await ev(`const t=document.querySelector('.advisor-trigger');if(!t)return 'no trigger';
 const r=t.getBoundingClientRect();const top=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
 return {reachable: t===top||t.contains(top), z:getComputedStyle(t).zIndex};`);
// 7 nav zones + cursors
await load("about");
R.zones=await ev(`const pz=document.querySelector('.nav-zone-prev'),nz=document.querySelector('.nav-zone-next');
 const c=e=>{const v=getComputedStyle(e).cursor;return v.startsWith('url(')?'ARROW':v;};
 return {prev:c(pz),next:c(nz),prevPE:getComputedStyle(pz).pointerEvents};`);
// 8 tab stops across every slide
R.tabs={};
const ids=await ev(`return null;`);
for(const h of ["title","about","assignment","territories","territory-1","territory-3-sas-story","production-schedule","rationale","closing"]){
  await load(h);
  R.tabs[h]=await ev(`return {focusable:document.querySelectorAll('.slide-content button,.slide-content a[href],.slide-content [tabindex]:not([tabindex="-1"])').length,
   divSpan:[...document.querySelectorAll('.slide-content div,.slide-content span')].filter(e=>e.onclick).length};`);
}
// 9 back + overview + parallax
await load(); for(let i=0;i<5;i++){await key("ArrowRight");await sleep(400);}
R.back={before:await ctr(),hash:await ev(`return location.hash;`)};
await ev(`history.back();`);await sleep(900); R.back.after=await ctr(); R.back.hashAfter=await ev(`return location.hash;`);
await load("territory-1");
await ev(`const bs=[...document.querySelectorAll('.slide-content button')].filter(b=>b.getBoundingClientRect().width<40&&b.getBoundingClientRect().width>0);if(bs.length)bs[bs.length-1].click();`);await sleep(600);
const imgBefore=await ev(`const i=document.querySelector('.slide-content img');return i?i.getAttribute('src'):null;`);
await key("o");await sleep(700);await key("o");await sleep(800);
R.overview={before:imgBefore,after:await ev(`const i=document.querySelector('.slide-content img');return i?i.getAttribute('src'):null;`)};
const bg=()=>ev(`const d=[...document.querySelectorAll('.slide-canvas div')].find(x=>getComputedStyle(x).backgroundImage.includes('ridge-bg'));return d?getComputedStyle(d).backgroundPosition:null;`);
R.parallax=[];
for(const h of ["title","territory-3-sas-story","closing"]){ await load(h); R.parallax.push(await bg()); }
await import("node:fs").then(fs=>fs.writeFileSync(process.env.OUT||"v2-out.json",JSON.stringify(R,null,2)));
console.log("wrote "+(process.env.OUT||"v2-out.json"));
ws.close();process.exit(0);
