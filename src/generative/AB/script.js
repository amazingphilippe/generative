import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
  pointsInPath,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

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

const { width, height } = svg.viewbox();

//-----------------------------------------


function generate() {
  svg.clear();

  const pair = [random(10, 350), random(10, 350)];

  const a = chroma.lch(random(50, 60), random(20, 60), random(pair[0] - 10, pair[0] + 10)).hex();
  const b = chroma.lch(random(50, 60), random(20, 60), random(pair[1] - 10, pair[1] + 10)).hex();

  svg.rect(150, 150).x(58.333).y(75).fill(a).attr({"class": "a"});
  svg.rect(150, 150).x(191.666).y(75).fill(b).attr({"class": "b"});
  //svg.circle(2).cx(200).cy(150).fill("black").opacity(0.7);

}
generate();
