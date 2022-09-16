import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import chroma from "https://cdn.skypack.dev/chroma-js";

const svg = SVG(".canvas");

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

let palette;
const { width, height } = svg.viewbox();

const density = 60;

//-----------------------------------------

function generate() {
  svg.clear();
  palette = chroma
    .scale([chroma.random(), chroma.random()])
    .mode("lch")
    .colors(5);
    console.log(palette);
  let points = [];
  let midCircle = [];
  for (var a = 0; a < Math.PI * 2; a += Math.PI / density) {
    let r = 180;

    let x = r * Math.cos(a);
    let y = r * Math.sin(a);

    points.push([x + width / 2, y + height / 2]);

    x = random(-r, r);
    y = random(-r, r);

    let shine = { x: -120, y: -120 };

    let shineD = Math.sqrt(
      (x - shine.x) * (x - shine.x) + (y - shine.y) * (y - shine.y)
    );

    let d = Math.sqrt(x * x + y * y);

    if (d < r && shineD > r) {
      midCircle.push([x + width / 2, y + height / 2]);
    }
  }
  points.push(points[0]);
  let baseColor = chroma(random(palette)).brighten(2).hex();
  svg.polyline(points).stroke({ color: baseColor, width: 5 }).fill(baseColor);

  for (var i = 0; i < 500; i++) {
    let a = random(points);
    let b = random(midCircle);
    let c = random(points);
    svg
      .line(a[0], a[1], b[0], b[1])
      .fill("none")
      .stroke({ color: random(palette), width: 1 })
      .css({ "mix-blend-mode": "multiply" });
    svg
      .line(a[0], a[1], c[0], c[1])
      .fill("none")
      .stroke({ color: random(palette), width: 1 })
      .css({ "mix-blend-mode": "multiply" });
    svg
      .line(a[0], a[1], c[0], c[1])
      .fill("none")
      .stroke({ color: random(palette), width: 1 })
      .css({ "mix-blend-mode": "multiply" });
    svg
      .polyline([a[0], a[1], b[0], b[1], c[0], c[1]])
      .fill("none")
      .stroke({ color: random(palette), width: 1 })
      .css({ "mix-blend-mode": "multiply" });
  }
}
generate();
