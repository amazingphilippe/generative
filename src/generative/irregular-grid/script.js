import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  map,
  createVoronoiTessellation,
  spline,
  pointsInPath,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import chroma from "https://cdn.skypack.dev/chroma-js";
import paper from "https://cdn.skypack.dev/paper";

import svgCrowbar from 'https://cdn.skypack.dev/svg-crowbar';

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

const { width, height } = svg.viewbox();

//-----------------------------------------

paper.setup(document.getElementById("shadow"));

const recklessness = 30;
const thickness = 3;

const boundingBox = new paper.Rectangle(30, 30, width - 60, height - 60);

function generate() {
  svg.clear();
  //svg.rect(width - 60, height - 60).x(30).y(30).fill('yellow');

  const palette = chroma
    .scale([chroma.random(), chroma.random()])
    .mode("lch")
    .colors(4);

  const tessellation = createVoronoiTessellation({
    width,
    height,
    points: [...Array(30)].map(() => {
      return {
        x: random(30, width - 30),
        y: random(30, height - 30),
      };
    }),
    relaxIterations: 4,
  });

  tessellation.cells.forEach((c) => {
    let seed = new paper.Point({
      x: c.centroid.x,
      y: c.centroid.y,
    });
    let previousPoint = seed;
    let path = new paper.Path({
      strokeColor: "goldenrod",
      strokeWidth: 2,
    });
    path.add(seed);
    let segment = new paper.Path.Line(previousPoint);
    let next = seed;

    //set properties to control path in loop
    let trapped = 0, //When the path is trapped on itself -> let it break free
      angle = 0; //When angle is too shallow, try another direction

    for (var i = 0; i < 30; i++) {
      do {
        next = new paper.Point({
          x: previousPoint.x + random(-recklessness, recklessness),
          y: previousPoint.y + random(-recklessness, recklessness),
        });
        segment = new paper.Path.Line({
          from: previousPoint + 1,
          to: next + 1,
          //strokeColor: "white",
          //strokeWidth: 0.3,
        });

        // console.log(next.getDirectedAngle(path.lastSegment.point.angle));
        // console.log(segment.segments, path.segments);
        // segment.strokeColor = '#4c4c4c';
        let nextAngle = segment.lastSegment.previous.point.subtract(
          segment.lastSegment.point
        );
        if (path.lastSegment.previous) {
          let previousAngle = path.lastSegment.previous.point.subtract(
            path.lastSegment.point
          );
          angle = previousAngle.getDirectedAngle(nextAngle);
        } else {
        }
        trapped++;
        // console.log('rect: ', next.isInside(boundingBox));
        // console.log('angle: ', (angle < 120 && angle > -120), angle);
        // console.log('intersect: ', !segment.intersects(path));
        // console.log('trapped: ', trapped < 100, trapped);
        // console.log('total: ', (next.isInside(boundingBox) && (angle < 120 && angle > -120) && !segment.intersects(path)) && trapped < 100);
      } while (
        !(
          next.isInside(boundingBox) &&
          angle < 15 &&
          angle > -15 &&
          !segment.intersects(path)
        ) &&
        trapped < 500
      );
      path.add(next);
      path.smooth("geometric");
      previousPoint = next;
      segment.removeSegments();
    }

    // console.log('segment: ', segment.segments[0].point.x, segment.segments[0].point.y, segment.segments[1].point.x, segment.segments[1].point.y);
    // if (path.segments.length > 1) {
    // 	console.log('last path: ', path.segments[path.segments.length - 2].path.segments[0].point.x, path.segments[path.segments.length - 2].path.segments[0].point.y, path.segments[path.segments.length - 1].path.segments[1].point.x, path.segments[path.segments.length - 1].path.segments[1].point.y);
    // }
    // console.log(!segment.intersects(path));

    let color = palette[random(0, 3, true)];

    svg
      .path(path.pathData)
      .stroke({
        color: chroma(color).brighten(0.3).hex(),
        width: thickness,
        linecap: "round",
      })
      .fill("none");

    //svg.circle(thickness).x(next.x - (thickness / 2)).y(next.y - (thickness / 2)).fill(chroma(color).darken(0.6).hex());
  });

  // console.log(path);
}
generate();
