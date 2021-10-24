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
  if (e.code === "Space") {
    generate();
  }
});

const { width, height } = svg.viewbox();

const resolution = { width: width / 8, height: height / 4 };

function generate() {
  svg.clear();

  for (let i = 0; i < width; i += resolution.width) {
    for (let j = 0; j < height; j += resolution.height) {
      let color;

      if (j == 0 || j == height - resolution.height) {
        color = ["369eb8","68a8c4","99adc1"][random(0, 0, true)];
      } else {
        color = ["fb5e53","ffc098","ffc870"][random(0, 1, true)];
      }

      const gradient = svg.gradient("linear", function (add) {
        add.stop(0, chroma(color).set("lch.h", `*${random(0.9, 1.3, false)}`));
        add.stop(1, chroma(color).brighten(random(3, 5, false)));
      });

      if (i < width / 2) {
        gradient.from(1, 0).to(0, 0);
      }

      if (j == 0) {
        gradient.from(0, 1).to(0, 0);
      }

      if (j == height - resolution.height) {
        gradient.from(0, 0).to(0, 1);
      }

      svg.rect(resolution.width, resolution.height).x(i).y(j).fill(gradient);
    }
  }
}
generate();
