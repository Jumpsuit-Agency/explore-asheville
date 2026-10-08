/**
 * Build a PDF from the captured page images with no PDF dependency.
 *
 * JPEGs embed into a PDF verbatim under the DCTDecode filter, so the file is
 * just a container: one Page, one Image XObject and a two-operator content
 * stream per slide. Pages are 960x540pt — the standard 16:9 deck size — with
 * the bitmap sitting behind at higher density.
 */
import { writeFileSync, readdirSync, existsSync, readFileSync } from "node:fs";
import sharp from "sharp";

const dir = process.argv[2], out = process.argv[3];
const URL_TARGET = process.argv[4] || "https://explore-asheville.vercel.app";

// The capture records where the "Keep Exploring" card sits so this page can
// carry a real link annotation back to the live deck.
let link = null;
if (existsSync(`${dir}/link.json`)) {
  const raw = JSON.parse(readFileSync(`${dir}/link.json`, "utf8"));
  if (raw.rect) link = raw;
}
const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
const W = 960, H = 540;

const chunks = [];
const offsets = [];
let len = 0;
const push = (b) => {
  const buf = Buffer.isBuffer(b) ? b : Buffer.from(b, "latin1");
  chunks.push(buf); len += buf.length;
};
const obj = (n, body) => { offsets[n] = len; push(`${n} 0 obj\n`); push(body); push("\nendobj\n"); };

push("%PDF-1.7\n%\xE2\xE3\xCF\xD3\n");

const n = files.length;
const pageIds = files.map((_, i) => 3 + i * 3);
const annotId = pageIds[n - 1] + 3;   // one spare object, after every page

obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
obj(2, `<< /Type /Pages /Count ${n} /Kids [${pageIds.map((i) => `${i} 0 R`).join(" ")}] >>`);

let i = 0;
for (const f of files) {
  const jpeg = await sharp(`${dir}/${f}`)
    .flatten({ background: "#1E1F38" })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  const meta = await sharp(jpeg).metadata();
  const pid = pageIds[i], cid = pid + 1, iid = pid + 2;

  const annots = link && link.page === i + 1 ? ` /Annots [${annotId} 0 R]` : "";
  obj(pid,
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] ` +
    `/Resources << /XObject << /Im0 ${iid} 0 R >> >> /Contents ${cid} 0 R${annots} >>`);

  const content = `q\n${W} 0 0 ${H} 0 0 cm\n/Im0 Do\nQ\n`;
  obj(cid, `<< /Length ${content.length} >>\nstream\n${content}endstream`);

  offsets[iid] = len;
  push(`${iid} 0 obj\n`);
  push(`<< /Type /XObject /Subtype /Image /Width ${meta.width} /Height ${meta.height} ` +
       `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  push(jpeg);
  push("\nendstream\nendobj\n");

  i++;
  if (i % 20 === 0) console.log(`  embedded ${i}/${n}`);
}

if (link) {
  // CSS pixels -> PDF points, and the origin flips from top-left to
  // bottom-left, so the y axis is measured up from the page foot.
  const k = W / link.rect.vw;
  const x0 = link.rect.x * k;
  const x1 = (link.rect.x + link.rect.w) * k;
  const y1 = H - link.rect.y * k;
  const y0 = H - (link.rect.y + link.rect.h) * k;
  const esc = URL_TARGET.replace(/([()\\])/g, "\\$1");
  obj(annotId,
    `<< /Type /Annot /Subtype /Link /Rect [${x0.toFixed(2)} ${y0.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}] ` +
    `/Border [0 0 0] /F 4 /A << /S /URI /URI (${esc}) >> >>`);
  console.log(`  link on page ${link.page}: [${x0.toFixed(0)} ${y0.toFixed(0)} ${x1.toFixed(0)} ${y1.toFixed(0)}] -> ${URL_TARGET}`);
}

const maxObj = link ? annotId : pageIds[n - 1] + 2;
const xref = len;
let table = `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
for (let k = 1; k <= maxObj; k++) table += `${String(offsets[k] ?? 0).padStart(10, "0")} 00000 n \n`;
push(table);
push(`trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);

const pdf = Buffer.concat(chunks);
writeFileSync(out, pdf);
console.log(`wrote ${out} — ${n} pages, ${(pdf.length / 1048576).toFixed(1)} MB`);
