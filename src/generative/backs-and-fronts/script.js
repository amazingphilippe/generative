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

  let offset = 0;

  let samples = [chroma.random(), chroma.random()];

  while (chroma.distance(samples[0], samples[1]) < 130) {
    samples = [chroma.random(), chroma.random()];
  }

  const scale = chroma.scale(samples).mode("lch").colors(4);

  for (var i = 0; i < width; i += offset) {
    let height = random(4, 5, true) * 60;
    let bf = random(1, 5, true) * 20;
    if (i + bf > width) {
      bf = width - i;
    }

    let direction = random(0, 1, true);

    let stripes, y;
    if (direction === 1) {
      //horizontal
      //stripes = height / map(height, 240, 300, 8, 30);
      stripes = height / random(5, 15, true);
      y = random(0, 5, true) * (stripes / 2);
      // console.log(height, stripes, direction);
    } else {
      //stripes = bf / map(bf, 20, 100, 2, 10);
      stripes = bf / random(5, 15, true);
      y = random(0, 5, true) * 10;
      // console.log(bf, stripes, direction);
    }

    let color = chroma(scale[random(0, 3, true)])
      .luminance(0.1)
      .saturate(1).set('lch.h', `*${random(10, 30, false)}`)
      .hex();

    let lightness =
      random(0, 1, true) === 1 ? random(0, 0.1) : random(0.7, 0.9);
    let temp = chroma.temperature(random(2000, 3500, true));
    let scheme = chroma(color).luminance(lightness).hex();
    let blend = chroma.blend(temp, scheme, "multiply").desaturate(3).hex();

    let pattern = svg.pattern(stripes, stripes, function (add) {
        if (direction === 1) {
          add.rect(stripes, stripes / 2).fill(blend);
        } else {
          add.rect(stripes / 2, stripes).fill(blend);
        }
      })
      //.attr({ patternContentUnits: "objectBoundingBox" });
    svg.rect(bf, height).x(i).y(y).fill(color);
    svg.rect(bf, height).x(i).y(y).fill(pattern);


    offset = bf;
  }
  console.log("-------");
}
generate();
