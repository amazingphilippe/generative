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

const palette = ['#8A817C', '#BCB8B1', '#463F3A'];
let s, group;

function generate(flag = true) {
  svg.clear();
  paper.project.clear();
  s = 0;
  group = new paper.CompoundPath({ children: [] });

  if (flag) {
    step();
  } else {
    for (var i = 0; i < 404; i++) {
      draw();
    }
  }
}
function step(flag) {
  s++;
  if (s > 404) {
    return;
  }
  draw();
  requestAnimationFrame(step);
}
function draw() {
  let h = 10;
  let w = random(10, 15, true);
  let thisRect = new paper.Path.Rectangle({
    point: [random(0, width - 1 - h * 1.5, true), height - 1 - h * 1.5],
    size: [w, h],
  });
  //console.log(thisRect.getIntersections(group));
  while (thisRect.getIntersections(group).length) {
    thisRect.position.y -= h + 1;
  }
  group.addChild(thisRect);
  svg
    .rect(w, h)
    .move(thisRect.position.x, thisRect.position.y)
    .fill(random(palette))
    .stroke({
      color: random(palette),
      width: 1.1,
    });
}
generate();
