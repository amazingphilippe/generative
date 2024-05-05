import { SVG } from "@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
  pointsInPath,
} from "@georgedoescode/generative-utils";

import chroma from "chroma-js";

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

const { width, height } = svg.viewbox();

//-----------------------------------------


function generate() {
  svg.clear();

  const pair = [random(10, 350), random(10, 350)];

  const a = chroma.lch(random(50, 60), random(20, 60), random(pair[0] - 10, pair[0] + 10)).hex();
  const b = chroma.lch(random(50, 60), random(20, 60), random(pair[1] - 10, pair[1] + 10)).hex();

  const c = chroma.blend(a, b, 'multiply').hex();

  svg.rect(100, 200).x(50).y(50).fill(a);
  svg.rect(100, 200).x(250).y(50).fill(b);
  svg.rect(100, 200).x(150).y(50).fill(c);


}
generate();
