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

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

let palette, padding;
// const palette = ["#8C1C13", "#2C497F", "#FFD400", "#2C497F", "#34623F"];
const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();

  palette = new Poline({
    anchorColors: [
      [random(0, 300), 0.9, 0.9],
      [random(0, 360), 1, 0.8],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 4,
  }).colorsCSS;

  padding = random(0, 1, true) * 5;

  svg
    .rect(width, height)
    .fill(chroma(palette[3]).set("lch.c", 15).set("lch.l", 10).hex());

  let areas = svg.group();

  areas
    .rect(width - 40, height - 40)
    .attr({ x: 20, y: 20 })
    .fill("none");

  for (let i = 0; i < 4; i++) {
    areas.each(function (i, children) {
      const coin = random(0, 1) > this.attr("width") / this.attr("height");
      const stop = random(0, 1) > 0.5;
      if (coin && !stop) {
        let half = this.attr("height") / 2;
        this.attr("height", half);
        console.log();
        areas
          .rect(this.attr("width"), half)
          .x(this.attr("x"))
          .y(this.attr("y") + half)
          .fill("none");
      } else if (!stop) {
        let half = this.attr("width") / 2;
        this.attr("width", half);
        areas
          .rect(half, this.attr("height"))
          .x(this.attr("x") + half)
          .y(this.attr("y"))
          .fill("none");
      }
    });
  }
  areas.each(function (i, children) {
    fill(
      this.attr("width"),
      this.attr("height"),
      this.attr("x"),
      this.attr("y")
    );
  });
}
generate();

function fill(width, height, x, y) {
  // For a width and a height, fill the rect with this custom function.
  let origin = `${random(0, width, true)}px ${random(0, height, true)}px`;
  let size = 15;

  shuffle(palette);

  // Outline boxes. Debug?
  svg
    .rect(width, height)
    .attr({
      x: x,
      y: y,
    })
    .fill("none")
    .stroke({
      width: 0.25,
      color: chroma(palette[0]).set("lch.c", 80).set("lch.l", 80).hex(),
    })
    .css({
      transform: `rotate(${random(-1, 1)}deg)`,
      "transform-origin": origin,
      "mix-blend-mode": "screen",
    });

  // Ratio of the area. What for?

  let tall = width / height < 1;

  // For 1 to 3 iteration, draw a bunch of lines.

  for (let p = 0; p < random(1, 3); p++) {
    let group = svg.group();
    let groupW = width;
    let groupH = height;

    let iAxis = Math.floor(groupW / 2);
    let jAxis = Math.floor(groupH / (size + padding));

    let odd = p % 2 > 0;

    for (let i = 0; i < iAxis; i++) {
      for (let j = 0; j < jAxis; j++) {
        let offset = random(padding * -1, 0);
        let xPos = map(i, 0, iAxis - 1, x + padding, x + groupW - padding);
        let yPos =
          map(j, 0, jAxis - 1, y + padding, y + groupH - padding - size) -
          offset * 0.5;

        group
          .rect(0.5, size + offset)
          .attr({
            x: xPos,
            y: yPos,
          })
          .fill(
            chroma(p === -1 ? random(palette) : palette[p])
              .set("lch.c", 50)
              .set("lch.l", map(p, 0, 3, 40, 90))
              .hex()
          );

        group.css({
          transform: `rotate(${(p - 1) * 0.5}deg)`,
          "transform-origin": origin,
          "mix-blend-mode": "screen",
        });
      }
    }
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
