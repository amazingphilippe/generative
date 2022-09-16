import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
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

const { width, height } = svg.viewbox();
const palette = ["#8f814a","#323131","#cb2f00","#ffc992","#503004"];

//-----------------------------------------

function generate() {
  svg.clear();

  svg.rect(width, height).x(0).y(0).fill(chroma.average([random(palette), chroma.random()], 'rgb', [10,1]).hex());

  for (var i = 0; i < 7; i++) {
    svg.each(function(i, children) {
      const coin = random(0, 1) > this.attr("width") / this.attr("height");
      const stop = random(0, 1) > 0.5
      if (coin && !stop) {
        let half = this.attr("height") / 2;
        this.attr("height", half);
        console.log();
        svg.rect(this.attr("width"), half).x(this.attr("x")).y(this.attr("y") + half).fill(chroma.average([random(palette), chroma.random()], 'rgb', [10,1]).hex());
      } else if (!stop) {
        let half = this.attr("width") / 2;
        this.attr("width", half);
        svg.rect(half, this.attr("height")).x(this.attr("x") + half).y(this.attr("y")).fill(chroma.average([random(palette), chroma.random()], 'rgb', [10,1]).hex());
      }
    })
  }

}
generate();
