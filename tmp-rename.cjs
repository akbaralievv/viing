const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const mv = (from, to) => {
  execSync(`git mv "${from}" "${to}"`, { stdio: "inherit" });
  console.log("mv", from, "->", to);
};

// 1) folder: tozaKoza -> toza-koza
mv("public/tozaKoza", "public/toza-koza");

// 2) files inside toza-koza
mv("public/toza-koza/40-hero.png", "public/toza-koza/hero.png");
mv("public/toza-koza/40-hero_mobile.png", "public/toza-koza/hero-mobile.png");
mv("public/toza-koza/use1.png", "public/toza-koza/use-1.png");
mv("public/toza-koza/use2.jpg", "public/toza-koza/use-2.jpg");
mv("public/toza-koza/use3.jpg", "public/toza-koza/use-3.jpg");
mv("public/toza-koza/use4.png", "public/toza-koza/use-4.png");
mv("public/toza-koza/use5.jpg", "public/toza-koza/use-5.jpg");
mv("public/toza-koza/icons/full-water_gold.svg", "public/toza-koza/icons/full-water-gold.svg");
mv("public/toza-koza/icons/no-alcohol_gold.svg", "public/toza-koza/icons/no-alcohol-gold.svg");
mv("public/toza-koza/icons/no_alcohol.svg", "public/toza-koza/icons/no-alcohol.svg");
mv("public/toza-koza/icons/no-pvc_gold.svg", "public/toza-koza/icons/no-pvc-gold.svg");
mv("public/toza-koza/icons/textile_gold.svg", "public/toza-koza/icons/textile-gold.svg");
mv("public/toza-koza/icons/halal-certified_ellipse.svg", "public/toza-koza/icons/halal-certified.svg");

// 3) gilam
mv("public/gilam/stretch_horizontal.png", "public/gilam/stretch-horizontal.png");
mv("public/gilam/stretch_vertical.png", "public/gilam/stretch-vertical.png");
mv("public/gilam/back.png", "public/gilam/cta-back.png");
for (let i = 1; i <= 6; i++) mv(`public/gilam/${i}.png`, `public/gilam/production-${i}.png`);
mv("public/gilam/use1.png", "public/gilam/use-1.png");
mv("public/gilam/use2.jpg", "public/gilam/use-2.jpg");
mv("public/gilam/use3.jpg", "public/gilam/use-3.jpg");
mv("public/gilam/use4.jpg", "public/gilam/use-4.jpg");
mv("public/gilam/use5.jpg", "public/gilam/use-5.jpg");

// 4) dasturxon
for (let i = 1; i <= 5; i++) mv(`public/dasturxon/${i}.png`, `public/dasturxon/production-${i}.png`);

// 5) root
mv("public/logo_text.svg", "public/logo-text.svg");

// ---- update references in src/ ----
// order matters: specific paths first, then the folder catch-all
const replacements = [
  ["/tozaKoza/40-hero_mobile.png", "/toza-koza/hero-mobile.png"],
  ["/tozaKoza/40-hero.png", "/toza-koza/hero.png"],
  ["/tozaKoza/use1.png", "/toza-koza/use-1.png"],
  ["/tozaKoza/use2.jpg", "/toza-koza/use-2.jpg"],
  ["/tozaKoza/use3.jpg", "/toza-koza/use-3.jpg"],
  ["/tozaKoza/use4.png", "/toza-koza/use-4.png"],
  ["/tozaKoza/use5.jpg", "/toza-koza/use-5.jpg"],
  ["/tozaKoza/", "/toza-koza/"],
  ["full-water_gold.svg", "full-water-gold.svg"],
  ["no-alcohol_gold.svg", "no-alcohol-gold.svg"],
  ["no_alcohol.svg", "no-alcohol.svg"],
  ["no-pvc_gold.svg", "no-pvc-gold.svg"],
  ["textile_gold.svg", "textile-gold.svg"],
  ["halal-certified_ellipse.svg", "halal-certified.svg"],
  ["/gilam/stretch_horizontal.png", "/gilam/stretch-horizontal.png"],
  ["/gilam/stretch_vertical.png", "/gilam/stretch-vertical.png"],
  ["/gilam/back.png", "/gilam/cta-back.png"],
  ["/gilam/use1.png", "/gilam/use-1.png"],
  ["/gilam/use2.jpg", "/gilam/use-2.jpg"],
  ["/gilam/use3.jpg", "/gilam/use-3.jpg"],
  ["/gilam/use4.jpg", "/gilam/use-4.jpg"],
  ["/gilam/use5.jpg", "/gilam/use-5.jpg"],
  ["/logo_text.svg", "/logo-text.svg"],
];
for (let i = 1; i <= 6; i++) replacements.push([`/gilam/${i}.png`, `/gilam/production-${i}.png`]);
for (let i = 1; i <= 5; i++) replacements.push([`/dasturxon/${i}.png`, `/dasturxon/production-${i}.png`]);

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else r.push(p);
  }
  return r;
}

let changed = 0;
for (const p of walk("src")) {
  let s = fs.readFileSync(p, "utf8");
  const orig = s;
  for (const [from, to] of replacements) s = s.split(from).join(to);
  if (s !== orig) {
    fs.writeFileSync(p, s, "utf8");
    changed++;
    console.log("updated", p);
  }
}
console.log("files updated:", changed);
