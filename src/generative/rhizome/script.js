import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import { random, map } from "@georgedoescode/generative-utils";
import quickNoise from "quick-perlin-noise-js";
import { roundCorners } from "svg-round-corners";

// import { createNoise2D } from "simplex-noise";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

const svg = SVG(".canvas");
paper.setup(document.getElementById("shadow"));

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
const perlin = quickNoise.create(() => random(0, 1));
// const size = 0.75;
// const grid = 9;
// const nodeSize = (width * size) / grid - 2;
// const offset = width * ((1 - size) / 2);

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group().attr("id", "debug");

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let gridLayer = svg.group().attr("id", "grid");
  let networkLayer = svg.group().attr("id", "network");
  let rhizomeLayer = svg.group().attr("id", "rhizome");
  let dotsLayer = svg.group().attr("id", "dots");

  // Features
  let grid = random(7, 11, true);
  let size = random([0.75, 0.666, 0.875]);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let variation = {
    nodeSize: (width * size) / grid - 2,
    grid: grid,
    nodeType: random(["burst", "circle", "petals", "none"]),
  };

  // Palette
  let palette = new Poline({
    anchorColors: [
      [random(0, 120), 0.4, 0.9],
      [random(90, 300), 0.5, 0.8],
      [random(270, 400), random(0, 0.6), 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 4,
  }).colorsCSS;

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  // svg
  //   .rect(width * size, height * size)
  //   .attr({ x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) })
  //   .fill("none")
  //   .stroke({ color: "#343756", width: 0.5 });

  // for (let i = 0; i < grid + 1; i++) {
  //   gridLayer
  //     .line(
  //       offset,
  //       offset + i * ((height * size) / grid),
  //       offset + width * size,
  //       offset + i * ((height * size) / grid)
  //     )
  //     .stroke({ color: "#a2a5c7", width: 0.5 });
  //   gridLayer
  //     .line(
  //       offset + i * ((width * size) / grid),
  //       offset,
  //       offset + i * ((width * size) / grid),
  //       offset + height * size
  //     )
  //     .stroke({ color: "#a2a5c7", width: 0.5 });
  // }

  // Random walker
  // let start = { x: random(0, grid, true), y: random(0, grid, true) };
  // for (let walk = 0; walk < 20; walk++) {
  //   svg.circle(variation.nodeSize).attr({
  //     cx: offset + start.x * ((width * size) / grid),
  //     cy: offset + start.y * ((height * size) / grid),
  //   });
  //   start.x += random(-2, 2, true);
  //   start.y += random(-2, 2, true);
  // }

  // Randots
  let dots = [];
  let center = { x: grid / 2, y: grid / 2 };
  for (let walk = 0; walk < 20; walk++) {
    let dot = { x: random(1, grid - 1, true), y: random(1, grid - 1, true) };
    dots.push({ ...dot, toCenter: distance(dot, center) });
  }

  // 1) ordering all the points in the point cloud based on their distance from the center of the point cloud.
  dots.sort((a, b) => {
    return a.toCenter > b.toCenter;
  });

  let uniqueDots = unique(
    dots.map((d) => d),
    (a, b) => (a.x === b.x) & (a.y === b.y)
  );

  uniqueDots.forEach((dot) => {
    let r = variation.nodeSize / 2;
    let color = random(palette);
    let cx = offset.x + dot.x * ((width * size) / grid);
    let cy = offset.y + dot.y * ((height * size) / grid);

    switch (variation.nodeType) {
      case "burst":
        dotsLayer
          .circle(random(r, variation.nodeSize))
          .attr({
            cx,
            cy,
          })
          .fill(random(palette));

        for (var a = 0; a < Math.PI; a += Math.PI / 10) {
          let x = r * Math.cos(a);
          let y = r * Math.sin(a);
          let x2 = -r * Math.cos(a);
          let y2 = -r * Math.sin(a);

          dotsLayer.line(x + cx, y + cy, x2 + cx, y2 + cy).stroke({
            width: 1,
            color: color,
          });
        }
        break;

      case "circle":
        dotsLayer
          .circle(r * 0.625)
          .attr({
            cx,
            cy,
          })
          .fill(color);
        for (
          let concentrics = random(-5, 0, true);
          concentrics < 5;
          concentrics++
        ) {
          dotsLayer
            .circle(variation.nodeSize - 4 * concentrics)
            .attr({
              cx,
              cy,
            })
            .fill("none")
            .stroke({
              width: 1,
              color: chroma(color).luminance(0.7).hex(),
            });
        }

        break;

      case "petals":
        for (var a = Math.PI / 4; a < Math.PI * 2; a += Math.PI / 2) {
          let x = r * 0.75 * Math.cos(a);
          let y = r * 0.75 * Math.sin(a);

          dotsLayer
            .circle(r * 0.9)
            .attr({ cx: x + cx, cy: y + cy })
            .fill(color);
        }
        dotsLayer
          .circle(r * 0.45)
          .attr({ cx: cx, cy: cy })
          .fill("none")
          .stroke({
            width: 1,
            color: chroma(color).set("hsl.s", 0.9).luminance(0.05).hex(),
          });
        break;

      default:
        break;
    }
  });

  // 2) It then selects the point closest to the center of the point cloud (the first item in the ordered list of points) and adds this to the network.
  let loop = 0;
  let network = [dots.shift()];
  let networkPaths = [];

  // 3) The algorithm then gradually goes through the list, taking the next ordered point, and drawing a line from this point to the closest node already added to the network. Once a node is added to the network, it is removed from the ordered list from step one, and moved to a second list—nodes already in the network.
  while (dots.length > 0) {
    let start = dots.shift();

    network.sort((a, b) => {
      return distance(start, a) > distance(start, b);
    });

    let end = network[0];

    let x1 = offset.x + start.x * ((width * size) / grid);
    let y1 = offset.y + start.y * ((height * size) / grid);
    let x2 = offset.x + end.x * ((width * size) / grid);
    let y2 = offset.y + end.y * ((height * size) / grid);

    networkLayer.line(x1, y1, x2, y2).stroke({
      width: 1,
      color: chroma.average(palette).luminance(0.1).hex(),
    });

    networkPaths.push(
      new paper.Path({
        segments: [
          [x1, y1],
          [x2, y2],
        ],
      })
    );

    network.push(start);

    // Safety first
    loop++;
  }
  console.log("loops: ", loop);

  // Tunnels
  if (variation.nodeType !== "petals") {
    for (let t = 0; t < 3; t++) {
      let from = random(uniqueDots);
      let to = random(uniqueDots);

      let path = [[from.x, from.y]];

      // Detours
      for (let d = 0; d < random(2, 5, true); d++) {
        path.push([random(1, grid - 1, true), random(1, grid - 1, true)]);
      }

      path.push([to.x, to.y]);

      let pathSegments = path.map(
        (point) =>
          new paper.Point(
            offset.x + point[0] * ((width * size) / grid),
            offset.y + point[1] * ((height * size) / grid)
          )
      );

      let pathData = new paper.Path(pathSegments).pathData;

      let roundedPathData = roundCorners(pathData, (height * size) / grid).path;

      rhizomeLayer
        .path(roundedPathData)
        .fill("none")
        .stroke({
          width: 1,
          color: random(palette),
        });
    }
  }

  // Bring foreground layers to front

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

// https://easings.net/#easeOutQuint
function easeOutQuint(x) {
  return 1 - Math.pow(1 - x, 5);
}

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

// https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
function unique(a, fn) {
  if (a.length === 0 || a.length === 1) {
    return a;
  }
  if (!fn) {
    return a;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (fn(a[i], a[j])) {
        a.splice(i, 1);
      }
    }
  }
  return a;
}
