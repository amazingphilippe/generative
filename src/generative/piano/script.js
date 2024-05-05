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

  let palette = ["#000", "#fff"];

  for (var i = 0; i < 20; i++) {
    if (i > 10) palette = ["#fff", "#000"];
    svg.rect(width, 25).x(0).y(i * 25).fill(palette[0]);
    svg.rect(width, 25).x(0).y(i * 25 + 10).fill(palette[1]);
    for (var j = 0; j < 2; j++) {
      let bar = random(20, 150);
      let offset = random(-80, 80);
      let middlish = (width - bar) / 2 + offset;
      svg.rect(bar, 10).x(middlish).y(i * 25 + 2).fill(palette[1]);
    }
  }

}
generate();
