import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

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

const palette = ["000"];
const { width, height } = svg.viewbox();

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  //svg.clear();
  //svg.rect(width, height).attr({x: 0, y: 0}).fill("#DEDEE0").css({opacity: 0.25})
  let size = random(5, 10);
  let points = [];
  let type = random(0, 1);

  for (var a = 1; a < Math.PI * 2; a += Math.PI / 60) {
    let r = size;
    let sec_a = 1 / Math.cos(a);
    let folium;
    //folium = (3 * a * Math.sin(a) * Math.cos(a)) / (Math.pow(Math.sin(a), 3) + Math.pow(Math.cos(a), 3));
    //folium = 6 * a * Math.cos(a / 3);
    //folium = (5 / 2) * (4 * Math.cos(a) - (1/Math.cos(a)));
    //folium = r * (Math.sin(3*a) / Math.sin(2*a));
    if (type > 0.5) {
      folium = (r / 2) * (4 * Math.cos(a) - 1 / Math.cos(a)); //Trisectrix of Maclaurin
    } else {
      folium = (3 * r * sec_a * Math.tan(a)) / (1 + Math.pow(Math.tan(a), 3)); //Folium
    }
    let x = r * folium * Math.cos(a);
    let y = r * folium * Math.sin(a);

    if (x > 0 && y > 0) {
      points.push([x + width / 2, y + width / 2]);
    }
  }

  //points.push(points[0]);
  console.log(points);
  console.log(chroma("#311E10").saturate(random(-2, 2)));
  //debug(points)
  svg
    .polyline(points)
    .stroke({ width: 1, color: "#DEDEE0" })
    .fill(chroma("#311E10").saturate(random(-1, 1)).hex())
    .transform({ rotate: random(0, 360), origin: [width / 2, height / 2] });
  //svg.circle(3).attr({cx: width / 2, cy: height / 2}).fill("red");

  // let halfA = new paper.Path.Circle(new paper.Point(width/2 - size, height/2), (height/2) * 0.667);
  // let halfB = new paper.Path.Circle(new paper.Point(width/2 + size, height/2), (height/2) * 0.667);
  //
  //
  // let leaf = halfA.intersect(halfB);
  //
  // let pointyBits = random(0.5, 4);
  // leaf.flatten(pointyBits)
  //
  // svg.path(leaf.pathData).fill("#000").stroke({"width": 3, "color": "#fff"})
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
