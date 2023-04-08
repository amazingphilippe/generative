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
  if (nodes.elements.length >= 4) {
    nodes.elements.slice(-500).forEach((node, i) => {
      let x = map(node.lon, lon, lon + size, 0, width);
      let y = map(node.lat, lat, lat + size, 0, height);
      let nodePoint = new paper.Point(x, y);
      // debug
      svg
        .circle(map(i, 0, nodes.elements.slice(-500).length, 3, 13))
        .attr({
          cx: nodePoint.x,
          cy: nodePoint.y,
        })
        .fill(random(palette.colorsCSS))
        // .stroke({ width: 1, color: random(palette.colorsCSS) })
        .css({
          "mix-blend-mode": "multiply",
          opacity: map(i, 0, nodes.elements.slice(-500).length, 0.7, 1),
        });

      if (random(0, 1) > 0.99) {
        let d = 9999;
        nodes.elements.slice(-500).forEach((otherNode) => {
          let otherNodePoint = new paper.Point(
            map(otherNode.lon, lon, lon + size, 0, width),
            map(otherNode.lat, lat, lat + size, 0, height)
          );
          d = distance(nodePoint, otherNodePoint);

          if (d < 30) {
            svg
              .line(
                nodePoint.x,
                nodePoint.y,
                otherNodePoint.x,
                otherNodePoint.y
              )
              .stroke({ width: 0.5, color: random(palette.colorsCSS) });
          }
        });
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

    for (let i = 0; i < 20; i++) {
      let points = nodes.elements.slice(-500).sort(() => Math.random() - 0.5);

      let from = new paper.Point(
        map(points[0].lon, lon, lon + size, 0, width),
        map(points[0].lat, lat, lat + size, 0, height)
      );
      let through = new paper.Point(
        map(points[1].lon, lon, lon + size, 0, width),
        map(points[1].lat, lat, lat + size, 0, height)
      );
      let to = new paper.Point(
        map(points[2].lon, lon, lon + size, 0, width),
        map(points[2].lat, lat, lat + size, 0, height)
      );
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

      let walk = [
        new paper.Point(
          map(points[2].lon, lon, lon + size, 0, width),
          map(points[2].lat, lat, lat + size, 0, height)
        ),
      ];

      let maxWalk = random(3, 5, true);
      points.forEach((other) => {
        let otherPoint = new paper.Point(
          map(other.lon, lon, lon + size, 0, width),
          map(other.lat, lat, lat + size, 0, height)
        );
        if (
          !walk.some((point) => point === otherPoint) &&
          walk[0].isClose(otherPoint, 100) &&
          walk.length < maxWalk
        ) {
          walk.unshift(otherPoint);
        }
      });

      svg
        .path(spline(walk, 10))
        .fill("none")
        .stroke({
          width: 1,
          color: random(palette.colorsCSS),
          dasharray: "5",
        })
        .css({
          "mix-blend-mode": "screen",
          // opacity: ,
        })
        .back();
    }
  } else {
    svg.rect(width, height, 0, 0).fill("#BCCCE0");
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
    `https://overpass-api.de/api/interpreter?data=[bbox][out:json];node[place=hamlet];node[place=village];out;&bbox=${lon},${lat},${
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

function sortByDistance(location, arrayOfPoints) {
  arrayOfPoints.sort(function (a, b) {
    a.distance = distance(location, a);
    b.distance = distance(location, b);

    return a.distance - b.distance;
  });

  return arrayOfPoints;
}

/**
 * cool seeds!
 * 48 29
 * 34 108
 */
