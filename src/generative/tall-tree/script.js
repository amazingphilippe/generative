import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import { random, map } from "@georgedoescode/generative-utils";

import chroma from "chroma-js";

import { Poline, positionFunctions } from "poline";

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
let iterations = 0;
let a;
const startLen = 80;

//-----------------------------------------

function generate() {
  svg.clear();

  a = random(0.1, 0.6);

  palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  });
  // console.log(palette.colorsCSS);
  //
  // Layers
  let bgLayer = svg.group().attr("id", "bg");
  let snowLayer = svg.group().attr("id", "snow");
  let treeLayer = svg.group().attr("id", "tree");

  // sky
  // svg.rect(width, height).fill(chroma(palette.colorsCSS[6]).brighten(2).hex());

  // snow

  for (var j = random(0, -10); j < height; j += random(2, 24, true)) {
    if (random(j, height) < height) {
      let noise = random(-map(j, 0, 500, 0, 5), map(j, 0, 500, 0, 5));
      bgLayer
        .line(-5, j + random(-noise * 40, noise * 40), width + 5, j + noise)
        .fill("none")
        .stroke({
          width: 80,
          linecap: "round",
          color: chroma(palette.colorsCSS[6])
            .brighten(random(j, height) > height / 2 ? 1 : random(2, 2.5))
            .hex(),
        });
    }
  }
  snowLayer
    .polygon([
      [0, random(500, 550)],
      [width, random(500, 550)],
      [width, height],
      [0, height],
    ])
    .fill(chroma(palette.colorsCSS[6]).brighten(5).hex());

  // treee
  let origin = { x: random(100, width - 100), y: height - 20 };
  // shadow
  treeLayer.line(origin.x, origin.y, random(-300, -100), height).stroke({
    width: 8,
    color: chroma(palette.colorsCSS[4]).saturate(-2).brighten(1.5).hex(),
    linecap: "square",
  });

  branch(origin, { x: 0, y: -80 }, 0);
  function branch(origin, len, i) {
    treeLayer
      .line(origin.x, origin.y, origin.x + len.x, origin.y + len.y)
      .stroke({
        width: Math.max(1, Math.abs(len.y) / 10),
        color: chroma(palette.colorsCSS[Math.floor(map(len.y, -80, -10, 0, 3))])
          .set("lch.h", `*${random(0.95, 1.05)}`)
          .hex(),
        linecap: "square",
      });

    let thickness = 16 / (i + 2);

    // console.log(i);

    // allow recursion
    if (len.y < -10) {
      // console.log(len.y);
      branch(
        {
          x: origin.x + len.x,
          y: origin.y + len.y,
        },
        {
          x: random(-10, 10),
          y: len.y * random(0.8, 0.9),
        },
        i + 1
      );
      branch(
        {
          x: origin.x + len.x,
          y: origin.y + len.y,
        },
        {
          x: random(-20, 20),
          y: len.y * random(0.6, 0.8),
        },
        i + 1
      );
    }
  }
}

generate();
