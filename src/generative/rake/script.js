import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  spline,
} from "@georgedoescode/generative-utils";

import chroma from "chroma-js";

import { Vector } from "p5js-vector-standalone";

import paper from "paper";

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

const seedPalette = ["#8C1C13", "#FFD400", "#34623F", "#2C497F"];
const { width, height } = svg.viewbox();
const HFPI = Math.PI / 2;

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  svg.clear();
  let palette = chroma.scale([random(seedPalette), "#DFE2CF"]).colors(6);
  let orientation = new Vector(random(-1, 1), random(-1, 1)).setMag(50);
  let points = [];
  for (var i = 0; i < 4; i++) {
    points.push(new Vector(random(50, width - 50), random(50, height - 50)));
  }
  let poly = new paper.Path(spline(points));
  poly.flatten(0);

  let brush = [];

  for (var i = 0; i < poly.segments.length; i++) {
    let parent = i > 0 ? brush[i - 1] : null;
    let pos = new Vector(poly.segments[i].point.x, poly.segments[i].point.y);
    let offset = poly.getOffsetOf(pos);

    let dir = poly.getNormalAt(offset);
    // svg
    //   .line(
    //     pos.x - dir.x * 20,
    //     pos.y - dir.y * 20,
    //     pos.x + dir.x * 20,
    //     pos.y + dir.y * 20
    //   )
    //   .stroke({ color: random(palette), width: 0.5 });
    brush.push(new Segment(parent, pos, dir));
    // svg.circle(2).attr({ cx: pos.x, cy: pos.y });
    // svg.line(pos.x, pos.y, pos.x + dir.x, pos.y + dir.y).stroke({color: random(palette), width: 1});
  }

  console.log(Vector, brush);

  // svg.circle(4).attr({ cx: brush[0].pos.x, cy: brush[0].pos.y });
  for (var i = -40; i <= 40; i += 1) {
    let polyline = brush.map((segment) => [
      segment.pos.x + segment.dir.x * i + random(-1, 1),
      segment.pos.y + segment.dir.y * i + random(-1, 1),
    ]);
    svg
      .polyline(polyline)
      .fill("none")
      // .css({ "mix-blend-mode": "multiply" })
      .stroke({ color: random(palette), width: 2 });
  }
}
generate();

function Segment(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
}

function getBezierPoint(p, t) {
  return (
    p[0].copy().mult(Math.pow(-t, 3) + Math.pow(3 * t, 2) - 3 * t + 1) +
    p[1].copy().mult(Math.pow(3 * t, 3) - Math.pow(6 * t, 2) - 3 * t) +
    p[2].copy().mult(Math.pow(-t, 3) + Math.pow(3 * t, 2)) +
    p[3].copy().mult(Math.pow(t, 3))
  );
}
