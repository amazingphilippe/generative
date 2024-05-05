import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  createNoiseGrid,
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
const palette = ["B7B7B7"];

//-----------------------------------------

function generate() {
  svg.clear();

  let t = `${Date.now()}`;

  const grid = createNoiseGrid({
    width,
    height,
    resolution: 25,
    xInc: 0.0125,
    yInc: 0.0125,
    seed: Number(`${Date.now()}`.slice(0, 9)),
  });

  const long = createNoiseGrid({
    width,
    height,
    resolution: 25,
    xInc: 0.0125,
    yInc: 0.0125,
    seed: Number(`${Date.now()}`.slice(0, 5)),
  });

  const short = createNoiseGrid({
    width,
    height,
    resolution: 25,
    xInc: 0.0125,
    yInc: 0.0125,
    seed: Number(`${Date.now()}`.slice(5, 8)),
  });

  grid.cells.forEach((item, i) => {
    let rotation = map(item.noiseValue, -1, 1, 0, 360);

    console.log(`${Date.now()}`.slice(0, 3));
    svg
      .line(item.x - 101, item.y, item.x + 101, item.y)
      .stroke({
        width: 32,
        color: chroma("cyan")
          .set("lch.h", `${Date.now()}`.slice(2, 5))
          .set("lch.c", `${pole()}${random(0, 15, true)}`)
          .set("lch.l", '-30'),
      })
      .transform({
        origin: "center center",
        rotate: rotation + 0.2,
      });
    svg
      .line(item.x - 100, item.y, item.x + 100, item.y)
      .stroke({
        width: 30,
        color: chroma("cyan")
          .set("lch.h", `${Date.now()}`.slice(2, 5))
          .set("lch.c", `${pole()}${random(0, 15, true)}`),
      })
      .transform({
        origin: "center center",
        rotate: rotation + 0.2,
      });
  });
  // short.cells.forEach((item, i) => {
  //   let l = random(5, 10, true);
  //   svg
  //     .line(item.x - l, item.y, item.x + l, item.y)
  //     .stroke({
  //       width: 10,
  //       color: chroma("#A1A499").set("lch.c", `${pole()}${random(0, 5, true)}`),
  //     })
  //     .transform({
  //       origin: "center center",
  //       rotate: map(item.noiseValue, -1, 1, 0, 360),
  //     });
  // });

  // long.cells.forEach((item, i) => {
  //   svg
  //     .line(item.x - 15, item.y, item.x + 15, item.y)
  //     .stroke({
  //       width: Number(`${Date.now()}`.slice(-5, -4)) + 1,
  //       color: chroma(random(palette)).set(
  //         "lch.h",
  //         `${pole()}${random(0, 15, true)}`
  //       ),
  //     })
  //     .transform({
  //       origin: "center center",
  //       translateX: map(item.noiseValue, -1, 1, 0, 30),
  //       translateY: random(0, 50, true),
  //       rotate: map(item.noiseValue, -1, 1, 0, 30),
  //     });
  // });
}

function pole() {
  let pole = random(0, 1) > 0.5 ? "+" : "-";
  return pole;
}
generate();
