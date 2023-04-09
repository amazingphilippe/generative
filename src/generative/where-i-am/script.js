import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import { Poline, positionFunctions } from "https://unpkg.com/poline?module";

import paper from "https://cdn.skypack.dev/paper";
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

const palette = ["000"];
const { width, height } = svg.viewbox();

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

async function generate() {
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
  });

  let lon = random(-120, 140, true);
  let lat = random(30, 55, true);
  let size = 3;

  let internet = await ipLonLat();
  if (
    internet.error ||
    internet.longitude === null ||
    internet.latitude === null
  ) {
    console.log(internet);
  } else {
    console.log(internet.region);
    lon = internet.longitude;
    lat = internet.latitude;
    size = 1;
  }

  let nodes = await getNodes(lon, lat, size);
  console.log(nodes.elements.length, lat, lon);
  let maxNodes = nodes.elements.slice(-500);

  let points = maxNodes.map(
    (n) =>
      new paper.Point(
        map(n.lon, lon, lon + size, 0, width),
        map(n.lat, lat, lat + size, 0, height)
      )
  );

  if (nodes.elements.length >= 4) {
    points.forEach((nodePoint, i) => {
      // debug
      svg
        .circle(map(i, 0, maxNodes.length, 3, 13))
        .attr({
          cx: nodePoint.x,
          cy: nodePoint.y,
        })
        .fill(random(palette.colorsCSS))
        // .stroke({ width: 1, color: random(palette.colorsCSS) })
        .css({
          "mix-blend-mode": "multiply",
          opacity: map(i, 0, maxNodes.length, 0.7, 1),
        });

      if (random(0, 1) > 0.8) {
        let linkNode = points.find((otherNode) => {
          return distance(nodePoint, otherNode) < 60;
        });

        svg
          .line(nodePoint.x, nodePoint.y, linkNode.x, linkNode.y)
          .stroke({ width: 0.5, color: random(palette.colorsCSS) });
      }

      // let a = random(0, Math.PI * 2);
      // svg
      //   .line(
      //     x + Math.sin(a) * 50,
      //     y + Math.cos(a) * 50,
      //     x - Math.sin(a) * 50,
      //     y - Math.cos(a) * 50
      //   )
      //   .stroke({ width: 0.5, color: random(palette.colorsCSS) })
      //   .css({
      //     "mix-blend-mode": "multiply",
      //   });
    });

    for (
      let i = 0;
      i < random(1, Number.parseInt(points.length / 30) + 5);
      i++
    ) {
      let shuffledPoints = points.sort(() => Math.random() - 0.5);

      let from = shuffledPoints[0];
      let through = shuffledPoints[1];
      let to = shuffledPoints[2];

      let arc = new paper.Path.Arc(from, through, to);
      svg
        .path(arc.pathData)
        .fill("none")
        .stroke({ width: 1, color: random(palette.colorsCSS) })
        .css({
          "mix-blend-mode": "multiply",
        });

      for (let j = 0; j < Math.max(0, random(-2, 5, true)); j++) {
        let offset = random(0, arc.length * 0.4);
        let size = 5;
        let heading = arc.getNormalAt(offset + j * size).multiply(size);
        let center = arc.getPointAt(offset + j * size);
        let polygon = new paper.Path.RegularPolygon(
          center,
          3,
          random(2, size)
        ).rotate(heading.angle, center.add(new paper.Point(0, -0.5)));
        debug
          .line(center.x, center.y, center.x + heading.x, center.y + heading.y)
          .stroke({ width: 0.5, color: "cyan" });
        svg.path(polygon.pathData).fill(random(palette.colorsCSS));
      }

      svg
        .circle(17)
        .attr({
          cx: through.x,
          cy: through.y,
        })
        .fill("none")
        .stroke({ width: 1, color: random(palette.colorsCSS) })
        .css({
          "mix-blend-mode": "multiply",
        });

      let walk = [shuffledPoints[3]];

      let maxWalk = random(3, 5, true);
      points.forEach((otherPoint) => {
        if (
          !walk.some((point) => point === otherPoint) &&
          walk[0].isClose(otherPoint, 100) &&
          walk.length < maxWalk
        ) {
          debug.text(walk[0].angle.toFixed(2)).attr({
            x: walk[0].x,
            y: walk[0].y + 5,
            "text-anchor": "middle",
            class: "debug-text",
          });
          // console.log(walk[0].getDirectedAngle(otherPoint));
          walk.unshift(otherPoint);
        }
      });

      svg
        .path(spline(walk, 10))
        .fill("none")
        .stroke({
          width: 1,
          color: "white",
          dasharray: "5",
        })
        .css({
          // "mix-blend-mode": "screen",
          // opacity: ,
        })
        .back();
    }

    svg
      .text(internet.region)
      .attr({
        x: width - 5,
        y: height - 5,
        "text-anchor": "end",
        class: "debug-text",
      })
      .css({
        fill: random(palette.colorsCSS),
        "text-transform": "uppercase",
        "font-size": "6px",
        "font-weight": "400",
        "letter-spacing": "2px",
        "font-stretch": "125%",
      });
  } else {
    svg.rect(width, height, 0, 0).fill("#BCCCE0");
    svg
      .text("Perdus")
      .attr({
        x: width - 5,
        y: height - 5,
        "text-anchor": "end",
        class: "debug-text",
      })
      .css({
        fill: "#E0E6EE",
        "text-transform": "uppercase",
        "font-size": "6px",
        "font-weight": "400",
        "letter-spacing": "2px",
        "font-stretch": "125%",
      });
    // console.log(nodes.elements);
  }

  svg
    .rect(width, height, 0, 0)
    .fill(
      chroma(random(palette.colorsCSS)).set("lch.c", 15).set("lch.l", 90).hex()
    )
    .back();

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

async function getNodes(lon, lat, size) {
  let response = await fetch(
    // `https://api.openstreetmap.org/api/0.6/permissions`
    `https://overpass-api.de/api/interpreter?data=[bbox][out:json];node[place=hamlet];node[place=village];node[place=town];out;&bbox=${lon},${lat},${
      lon + size
    },${lat + size}`
    // `https://overpass-api.de/api/interpreter?data=[bbox][out:json][maxsize:5485760];node[barrier=gate];out;&bbox=${lon},${lat},${
    //   lon + size
    // },${lat + size}`
  );
  // console.log(response.json().elements);
  // return response.json().elements;
  return response.json();
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

async function ipLonLat() {
  let ip =
    random(0, 255, true) +
    "." +
    random(0, 255, true) +
    "." +
    random(0, 255, true) +
    "." +
    random(0, 255, true);

  let location = await fetch(`https://ipapi.co/${ip}/json/`);

  return location.json();
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function nodeToPoint(node, lat, lon, size) {
  return new paper.Point(
    map(node.lon, lon, lon + size, 0, width),
    map(node.lat, lat, lat + size, 0, height)
  );
}

/**
 * cool seeds!
 * 48 29
 * 34 108
 */
