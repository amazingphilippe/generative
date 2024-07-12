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
    ).attr("data-depth", 0);

  for (var i = 0; i < 4; i++) {
    svg.each(function (j, children) {
      const stop = random(0, 1) > 0.5
      if (this.attr("data-depth") < i) {
        return;
      }



      //let poly = path.toPoly();
      let quad = this.array();
      let a = { x: quad[0][0], y: quad[0][1] };
      let b = { x: quad[1][0], y: quad[1][1] };
      let c = { x: quad[2][0], y: quad[2][1] };
      let d = { x: quad[3][0], y: quad[3][1] };


      let abc = new paper.Path({
        segments: [[a.x, a.y], [b.x, b.y], [c.x, c.y]]
      });

      let cda = new paper.Path({
        segments: [[c.x, c.y], [d.x, d.y], [a.x, a.y]]
      });
      abc.strokeColor = "cyan";

      cda.strokeColor = "red";

      let r = random(0, 1)
      let e = abc.getLocationAt(abc.length * r).point;
      let f = cda.getLocationAt(cda.length * r).point;

      console.log(e, f);

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

      let ab = new paper.Path.Line(
        new paper.Point(a.x, a.y),
        new paper.Point(b.x, b.y)
      );


      let bc = new paper.Path.Line(
        new paper.Point(c.x, c.y),
        new paper.Point(b.x, b.y)
      );

      if (line.intersects(ab)) {
        // AEFD and EBCF
        svg.polyline([a.x, a.y, e.x, e.y, f.x, f.y, d.x, d.y, a.x, a.y]).fill(chroma.average([random(palette), chroma.random()], "rgb", [10, 1]).hex()).attr("data-depth", i + 1).stroke({ width: 1, color: chroma.random().luminance(0.02) });
        svg.polyline([e.x, e.y, b.x, b.y, c.x, c.y, f.x, f.y, e.x, e.y]).fill(chroma.average([random(palette), chroma.random()], "rgb", [10, 1]).hex()).attr("data-depth", i + 1).stroke({ width: 1, color: chroma.random().luminance(0.02) });
      } else if (line.intersects(bc)) {
        // ABEF and FECD
        svg.polyline([a.x, a.y, b.x, b.y, e.x, e.y, f.x, f.y, a.x, a.y]).fill(chroma.average([random(palette), chroma.random()], "rgb", [10, 1]).hex()).attr("data-depth", i + 1).stroke({ width: 1, color: chroma.random().luminance(0.02) });
        svg.polyline([f.x, f.y, e.x, e.y, c.x, c.y, d.x, d.y, f.x, f.y]).fill(chroma.average([random(palette), chroma.random()], "rgb", [10, 1]).hex()).attr("data-depth", i + 1).stroke({ width: 1, color: chroma.random().luminance(0.02) });
      }
    });
  }
}
generate();
