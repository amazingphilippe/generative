import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import chroma from "https://cdn.skypack.dev/chroma-js";

import { Poline, positionFunctions } from "https://unpkg.com/poline?module";

const svg = SVG(".canvas");

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});
let debug = false

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    debug = false;
    generate();
  }
});


document.addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    debug = true;
    generate();
  }
});

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();

  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  });

  svg
    .rect(width, height)
    .fill(
      chroma(palette.colorsCSS[1]).set("lch.c", 15).set("lch.l", 100).hex()
    );

  let baseX = random([3, 5, 9, 13]);
  let baseY = random([2, 7, 11, 17]);

  // console.log(baseX, baseY);

  let size = {
    min: random(13, 25),
    max: random(33, 41),
    count: random(1, baseY, true),
  };

  // console.log(size.count, map(size.count, 1, 32, 80, 3));

  let padding = (size.count + 5) * 2;

  let orientation = {
    x:
      random(0, 1, true) > 0
        ? [padding, width - padding]
        : [width - padding, padding],
    y:
      random(0, 1, true) > 0
        ? [padding, height - padding]
        : [height - padding, padding],
  };
  // console.log(orientation);

  for (var i = 0; i < Math.round(map(size.count, 1, 17, 80, 3)); i++) {
    let x = map(halton(baseX, i), 0, 1, orientation.x[0], orientation.x[1]);
    let y = map(halton(baseY, i), 0, 1, orientation.y[0], orientation.y[1]);


    debug && svg.text(i).attr({ x: x, y: y + 5, "text-anchor": "middle", class: "debug-text" })

    for (var j = size.count; j < size.count + 9; j++) {
      svg
        .circle(j * 4)
        .attr({ cx: x, cy: y })
        .fill("none")
        .stroke({
          width: 1,
          color: random(palette.colorsCSS),
          // dasharray: 2 * Math.PI * j * 2 * (random(0, 3, true) / 3),
        });
    }

    svg
      .circle(random(0, 1) > 0.95 ? (size.count + 9) * 4 : 0)
      .attr({ cx: x, cy: y })
      .fill(random(palette.colorsCSS))
      .css("mix-blend-mode", "color-burn");
    svg
      .circle(random(0, 1) > 0.95 ? Math.max(4 * (size.count - 1) + 1, 13) : 0)
      .attr({ cx: x, cy: y })
      .css("mix-blend-mode", "multiply")
      .fill(random(palette.colorsCSS));
  }
}
generate();

function halton(base, index) {
  let f = 1;
  let r = 0;

  while (index > 0) {
    f = f / base;
    r = r + f * (index % base);
    index = Math.floor(index / base);
  }

  return r;
}
