import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "https://cdn.skypack.dev/paper";

// Some utils
import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

// Color libraries
import { Poline, positionFunctions } from "https://unpkg.com/poline?module";
import chroma from "https://cdn.skypack.dev/chroma-js";

const svg = SVG(".canvas");

let debug;
let wtf = false;

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    wtf = !wtf;
    wtf ? debug.show() : debug.hide();
  }
});

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  // Begin awesomeness

  let increment = 0.2;
  let thickness = random(4, 15);
  let origin = { x: width / 2, y: height / 2 };
  let r = 150;
  let turns = r / (thickness * 0.4);
  let color = random(palette);
  let spiralPoints = [];
  for (var a = r; a > r - Math.PI * turns; a -= increment) {
    let x =
      Math.min(map(a, r, r - Math.PI * turns, r + Math.PI * 4, 0), r) *
      Math.cos(a);
    let y =
      Math.min(map(a, r, r - Math.PI * turns, r + Math.PI * 4, 0), r) *
      Math.sin(a);
    let x2 =
      Math.min(
        map(a + increment, r, r - Math.PI * turns, r + Math.PI * 4, 0),
        r
      ) * Math.cos(a + increment);
    let y2 =
      Math.min(
        map(a + increment, r, r - Math.PI * turns, r + Math.PI * 4, 0),
        r
      ) * Math.sin(a + increment);
    // let x = r * Math.sqrt(a) * Math.sin(a);
    // let y = r * Math.sqrt(a) * Math.sin(a);
    // console.log(origin);
    spiralPoints.push([x + origin.x, y + origin.y]);
    // svg
    //   .line(x + origin.x, y + origin.y, x2 + origin.x, y2 + origin.y)
    //   .fill("none")
    //   .stroke({ width: 5, color: color });
  }

  svg
    .polyline(spiralPoints)
    .fill("none")
    .stroke({ width: thickness, color: color });

  debug
    .circle(r * 2)
    .attr({ cx: origin.x, cy: origin.y })
    .fill("none")
    .stroke({ width: 0.5, color: "cyan" });

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();
