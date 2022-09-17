import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import paper from "https://cdn.skypack.dev/paper";

import chroma from "https://cdn.skypack.dev/chroma-js";

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

const seedPalette = ["#EA9010", "#90BE6D", "#37371F"];
const { width, height } = svg.viewbox();

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  svg.clear();
  //svg.rect(width, height).attr({x: 0, y: 0}).fill("#DEDEE0").css({opacity: 0.25})

  for (var j = 3; j < 14; j++) {
    let points = [];
    let origin = { x: random(0, width), y: random(0, height) };
    let palette = chroma.scale([random(seedPalette), "#2B061E"]).colors(6);

    for (var i = 0; i < j ; i++) {
      let k = random(0.5,2);
      let r = random(1,5)
      let max = Math.PI * r;
      // svg.circle(2).attr({ cx: origin.x, cy: origin.y }).fill(palette[3]);
      // svg.circle(2).attr({ cx: origin.x, cy: origin.y }).fill("blue");

      console.log(max, max / 30);

      for (var a = 0; a < max; a += max / (j * 10)) {
        // let x = (Math.pow(Math.E, k * a) * Math.cos(a));
        // let y = (Math.pow(Math.E, k * a) * Math.sin(a));
        let x = i * a * Math.cos(a);
        let y = i * a * Math.sin(a);
        // let x = r * Math.sqrt(a) * Math.sin(a);
        // let y = r * Math.sqrt(a) * Math.sin(a);
        // console.log(origin);
        points.push([x + origin.x, y + origin.y]);
      }

      svg
        .polyline(points)
        .stroke({ width: 1, color: random(palette) })
        .fill("none")
        .css({"mix-blend-mode": "multiply"})
        //.transform({ rotate: max * (180/Math.PI), origin: [origin.x, origin.y] });


      let ox = points[points.length - 1][0];
      let oy = points[points.length - 1][1];
      // svg.circle(4).attr({ cx: ox, cy: oy }).fill('blue');
      // let nx = ox * Math.cos(max) + oy * Math.sin(max);
      // let ny = -ox * Math.sin(max) + oy * Math.cos(max);
      origin.x = ox
      origin.y = oy
      // console.log(origin);
      // svg.circle(3).attr({ cx: origin.x, cy: origin.y }).fill('red');

      points = [];
    }
  }


  //points.push(points[0]);
  console.log(chroma("#311E10").saturate(random(-2, 2)));
  // debug(points);
  // svg.polyline(points).stroke({ width: 1, color: "#311E10" }).fill("none");
}
generate();

function debug(points) {
  for (var i = 0; i < points.length; i++) {
    svg
      .circle(2)
      .attr({ cx: points[i][0], cy: points[i][1] })
      .fill(chroma(125, i / points.length, 0.5, "hsl").hex());
  }
}
