import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
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
const palette = ["#223D40", "#31593B", "#3F7343", "#E9D1C4", "#F0E389"];

//-----------------------------------------

paper.setup(document.getElementById("shadow"));

function generate() {
  svg.clear();
  paper.project.clear();

  svg
    //.path("M0 0H300V400H0Z")
    .polyline([0, 0, 300, 0, 300, 400, 0, 400, 0, 0])
    .x(0)
    .y(0)
    .fill(
      chroma.average([random(palette), chroma.random()], "rgb", [10, 1]).hex()
    )
    .attr("data-depth", 0);

  for (var i = 0; i < 7; i++) {
    svg.each(function (j, children) {
      let stop = random(0, 2) < (i + 1) / 7;
      if (this.attr("data-depth") < i || stop) {
        return;
      }

      //let poly = path.toPoly();
      let quad = this.array();
      let a = { x: quad[0][0], y: quad[0][1] };
      let b = { x: quad[1][0], y: quad[1][1] };
      let c = { x: quad[2][0], y: quad[2][1] };
      let d = { x: quad[3][0], y: quad[3][1] };

      let ab = new paper.Path({
        segments: [
          [a.x, a.y],
          [b.x, b.y],
        ],
      });
      let bc = new paper.Path({
        segments: [
          [b.x, b.y],
          [c.x, c.y],
        ],
      });
      ab.strokeColor = "orange";
      bc.strokeColor = "red";

      let dc = new paper.Path({
        segments: [
          [d.x, d.y],
          [c.x, c.y],
        ],
      });
      let ad = new paper.Path({
        segments: [
          [a.x, a.y],
          [d.x, d.y],
        ],
      });
      dc.strokeColor = "green";
      ad.strokeColor = "teal";

      let coin = random(0, 1) > ab.length / bc.length;
      let r = random(0, 1);
      let e, f;
      if (coin) {
        e = bc.getLocationAt(bc.length / 2).point;
        f = ad.getLocationAt(ad.length / 2 + random(-3, 5)).point;
      } else {
        e = ab.getLocationAt(ab.length / 2).point;
        f = dc.getLocationAt(dc.length / 2 + random(-3, 5)).point;
      }

      //console.log(e, f);

      /*
      A-----B
      |     |
      F-----E
      |     |
      D-----C
or
      A--E--B
      |  |  |
      |  |  |
      D--F--C
      */

      //Paper js handles the boolean operation from this as path data and the newly created line.
      let line = new paper.Path.Line(
        new paper.Point(e.x, e.y),
        new paper.Point(f.x, f.y)
      );
      //line.strokeColor = "black";

      if (line.intersects(ab)) {
        // AEFD and EBCF
        svg
          .polyline([a.x, a.y, e.x, e.y, f.x, f.y, d.x, d.y, a.x, a.y])
          .fill(
            chroma
              .average([random(palette), chroma.random()], "rgb", [10, 1])
              .hex()
          )
          .attr("data-depth", i + 1)
          .stroke({ width: 1, color: chroma.random().luminance(0.02) });
        svg
          .polyline([e.x, e.y, b.x, b.y, c.x, c.y, f.x, f.y, e.x, e.y])
          .fill(
            chroma
              .average([random(palette), chroma.random()], "rgb", [10, 1])
              .hex()
          )
          .attr("data-depth", i + 1)
          .stroke({ width: 1, color: chroma.random().luminance(0.02) });
      } else if (line.intersects(bc)) {
        // ABEF and FECD
        svg
          .polyline([a.x, a.y, b.x, b.y, e.x, e.y, f.x, f.y, a.x, a.y])
          .fill(
            chroma
              .average([random(palette), chroma.random()], "rgb", [10, 1])
              .hex()
          )
          .attr("data-depth", i + 1)
          .stroke({ width: 1, color: chroma.random().luminance(0.02) });
        svg
          .polyline([f.x, f.y, e.x, e.y, c.x, c.y, d.x, d.y, f.x, f.y])
          .fill(
            chroma
              .average([random(palette), chroma.random()], "rgb", [10, 1])
              .hex()
          )
          .attr("data-depth", i + 1)
          .stroke({ width: 1, color: chroma.random().luminance(0.02) });
      }
    });
  }
}
generate();
