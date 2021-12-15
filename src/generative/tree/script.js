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
  if (e.code === "Space") {
    generate();
  }
});

const { width, height } = svg.viewbox();
const palette = ["#223D40", "#31593B", "#3F7343"];

const max = 100;
const art = document.querySelector(".art");
art.style.setProperty("--total", max);

const params = new URLSearchParams(window.location.search);
let seedParam = Number(params.get("seed")) || -1;

//-----------------------------------------

function generate() {
  svg.clear();
  let seed;
  if (seedParam > 100 || seedParam < 0) {
    seed = random(0, max, true);
  } else {
    seed = seedParam;
  }
  art.style.setProperty("--item", seed);

  const radius = map(seed, 0, 100, 140, 360);
  const rusticity = map(seed, 0, 100, 100, 150);
  const age = map(seed, 0, 100, 5, 13);
  const tallness = map(seed, 0, 100, 400, 600);

  let tree = [];

  for (var i = 0; i < age; i++) {
    let spacing = tallness / age;
    console.log(tallness, spacing);

    let a = {
      x: (width - radius) / 2,
      y: height - tallness + spacing * i,
    };
    let b = {
      x: width / 2,
      y: height - tallness - rusticity + spacing * i,
    };
    let c = {
      x: (width - radius) / 2 + radius,
      y: height - tallness + spacing * i,
    };

    tree.push([a, b, c]);
  }

  tree.map((b, i) => {
    svg
      .polyline([
        tree[i][0].x,
        tree[i][0].y,
        tree[i][1].x,
        tree[i][1].y,
        tree[i][2].x,
        tree[i][2].y,
      ])
      .fill("none")
      .stroke({ color: random(palette), width: 5, lineCap: "square" });
  });

  svg
    .line(width / 2, height - tallness - rusticity, width / 2, height)
    .fill("none")
    .stroke({ color: random(palette), width: 5, lineCap: "square" });

  seedParam = -1;
}
generate();
