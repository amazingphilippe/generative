import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  createVoronoiTessellation,
  random,
  map,
} from "@georgedoescode/generative-utils";

import { roundCorners } from "svg-round-corners";

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

paper.setup(document.getElementById("shadow"));

// const palette = ["#f2af29", "#533e2d", "#058c42", "#9ee493"];
const palette = [
  "#f1f7ed",
  "#243e36",
  "#7ca982",
  "#e0eec6",
  "#c2a83e",
  "#D5573B",
];
// const palette = ["#8C1C13", "#FFD400", "#34623F", "#2C497F"]
const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  let density = random(2000, 4000, true);

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let meanderLayer = svg.group().attr("id", "meander");
  let dotLayer = svg.group().attr("id", "dot");

  console.log("Density: ", density);
  let tessellation = createVoronoiTessellation({
    width: width,
    height: height,
    points: [...Array(density)].map(() => {
      return {
        x: random(0, width, true),
        y: random(0, height, true),
      };
    }),
    relaxIterations: 2,
  });

  // Find the average distance to the closest point for every point.
  let averageDistance = 0;
  tessellation.cells.forEach((c1, i) => {
    let closest = 9999;
    tessellation.cells.forEach((c2, j) => {
      if (i != j) {
        let d = distance(c1, c2);
        if (d < closest) {
          closest = d;
        }
      }
    });

    averageDistance += closest;
  });

  averageDistance = (averageDistance / density) * 1.3;

  tessellation.cells.sort((a, b) => a.centroid.x - b.centroid.x);
  tessellation.cells.sort((a, b) => a.centroid.y - b.centroid.y);

  let stuck = false;
  let count = 0;
  let root = tessellation.cells.shift();
  let polyline = [root];

  //Layers
  let lines = meanderLayer;
  let ends = dotLayer;

  while (!stuck) {
    let candidates = [];
    tessellation.cells.forEach((c, i) => {
      let d = distance(c, root);
      if (d < averageDistance) {
        candidates.push(c);
      }
    });

    if (candidates.length == 0 || count > 7000) {
      if (tessellation.cells.length > 2) {
        let nearX = Math.min(width - root.centroid.x, root.centroid.x);
        let nearY = Math.min(height - root.centroid.y, root.centroid.y);
        let nearest = Math.min(nearX, nearY);
        let endRadius = random(6, Math.min(nearest, 6));
        ends
          .circle(endRadius)
          .x(root.centroid.x - endRadius / 2)
          .y(root.centroid.y - endRadius / 2)
          .fill(random(palette));

        let polylinePath = new paper.Path(
          polyline.flatMap((c) => [[c.centroid.x, c.centroid.y]])
        );

        let color = chroma(random(palette)).brighten(random(-2, 1)).hex();
        lines
          // .path(polylinePath.pathData)
          .path(roundCorners(polylinePath.pathData, 10).path)
          .fill("none")
          .stroke({
            color: color,
            width: map(chroma(color).luminance(), 0, 1, 3, 6),
            linecap: "round",
            linejoin: "round",
          });

        // Find new root
        root = tessellation.cells.shift();
        polyline = [root];
        continue;
      }

      stuck = true;
      console.log(`Stuck! After ${count} iterations`);
    }

    candidates.sort((a, b) => a.centroid.y - b.centroid.y);

    // Shift the lowest Y from candidates
    let add = candidates.shift();

    // Remove chosen candidates from remaining points
    let remove = tessellation.cells.findIndex((item) => item == add);
    tessellation.cells.splice(remove, 1);

    if (add) {
      // lines.line(root.centroid.x, root.centroid.y, add.centroid.x, add.centroid.y, ).fill("none").stroke({ color: "#423", width: 3, linecap: "round" });
      polyline.push(add);
    }

    root = add;
    //console.log(root);

    count++;
  }
}
generate();

function distance(a, b) {
  return Math.sqrt(
    (b.centroid.x - a.centroid.x) * (b.centroid.x - a.centroid.x) +
      (b.centroid.y - a.centroid.y) * (b.centroid.y - a.centroid.y)
  );
}
