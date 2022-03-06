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
  if (e.code === "Space") {
    generate();
  }
});

const palette = ["000"];
const { width, height } = svg.viewbox();

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  svg.clear();
  let size = random(5, 10);
  let points = [];

  for (var a = 1; a < Math.PI * 2; a += Math.PI / 60) {
    let r = size;
    let sec_a = (1/Math.cos(a));
    let folium;
    //folium = (3 * a * Math.sin(a) * Math.cos(a)) / (Math.pow(Math.sin(a), 3) + Math.pow(Math.cos(a), 3));
    //folium = 6 * a * Math.cos(a / 3);
    //folium = (5 / 2) * (4 * Math.cos(a) - (1/Math.cos(a)));
    //folium = r * (Math.sin(3*a) / Math.sin(2*a));
    folium = (r / 2) * ((4 * Math.cos(a)) - (1/Math.cos(a))); //Trisectrix of Maclaurin
    //folium = (3 * r * sec_a * Math.tan(a)) / (1 + Math.pow(Math.tan(a), 3)) //Folium
    let x = r * folium * Math.cos(a);
    let y = r * folium * Math.sin(a);

    if (x > 0 ) {
      points.push([
        x + width / 2,
        y + width / 2
      ]);
    }

  }

  //points.push(points[0]);
  console.log(points);

  //debug(points)
  svg.polyline(points).stroke({ width: 1, color: "black" }).fill("none");
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
    svg.circle(2).attr({cx: points[i][0], cy: points[i][1]}).fill(chroma(125, i/points.length, 0.5, 'hsl').hex());
  }
}
