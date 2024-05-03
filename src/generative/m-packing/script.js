import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js
import "https://cdn.skypack.dev/@svgdotjs/svg.topath.js";
import "https://cdn.skypack.dev/@svgdotjs/svg.topoly.js";

import {
  random,
  map,
} from "@georgedoescode/generative-utils";

import paper from "paper";

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

paper.setup(document.getElementById("shadow"));

const palette = ["#8A817C", "#BCB8B1", "#463F3A"];
let s, group;

function generate(flag = true) {
  svg.clear();
  paper.project.clear();
  s = 0;
  group = new paper.CompoundPath({ children: [] });

  if (flag) {
    step();
  } else {
    for (var i = 0; i < 20; i++) {
      draw();
    }
  }
}
function step(flag) {
  s++;
  if (s > 20) {
    return;
  }
  draw();
  requestAnimationFrame(step);
}
function draw() {
  let h = 40;
  let w = 40;
  let thisRect = new paper.Path.Rectangle({
    point: [random(0, width - 1 - h * 1.5, true), height - 1 - h * 1.5],
    size: [w, h],
  });
  //console.log(thisRect.getIntersections(group));
  while (thisRect.getIntersections(group).length) {
    thisRect.position.y -= h + 0.01;
  }
  group.addChild(thisRect);
  svg
    .path("M0 0V100H20V50L30 100H50L60 50V100H80V0H60L40 75L20 0H0Z")
    .fill(random(palette))
    .size(w, h)
    .move(thisRect.position.x, thisRect.position.y)
    .transform({
      rotate: random(0, 3, true) * 90,
    });
}
generate();
