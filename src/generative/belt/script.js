import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "https://cdn.skypack.dev/paper";

// Some utils
import {
  random,
  map,
  spline,
  createVoronoiTessellation,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";
import { roundCorners } from "https://cdn.skypack.dev/svg-round-corners";
import hullJs from "https://cdn.jsdelivr.net/npm/hull.js@1.0.4/+esm";
import concaveman from "https://cdn.jsdelivr.net/npm/concaveman@1.2.1/+esm";

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

paper.setup(document.getElementById("shadow"));

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  let tone = random(0, 360);

  let palette = new Poline({
    anchorColors: [
      [tone, 0.5, 0.2],
      [tone + random(0, 15), 0.5, 0.6],
      [tone + random(0, 120), 0.5, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  // Begin awesomeness

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let gridLayer = svg.group().attr("id", "grid");
  // let networkLayer = svg.group().attr("id", "network");
  // let rhizomeLayer = svg.group().attr("id", "rhizome");
  // let dotsLayer = svg.group().attr("id", "dots");

  // Features
  let grid = 5;
  let size = random([0.875, 0.95]);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let variation = {
    nodeSize: ((width * size) / grid) * 0.6666,
    grid: grid,
    nodeType: random(["burst", "circle", "petals", "none"]),
    beltWidth: 1,
  };

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  for (let i = 0; i < grid + 1; i++) {
    gridLayer
      .line(
        offset.x,
        offset.y + i * ((height * size) / grid),
        offset.x + width * size,
        offset.y + i * ((height * size) / grid)
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
    gridLayer
      .line(
        offset.x + i * ((width * size) / grid),
        offset.y,
        offset.x + i * ((width * size) / grid),
        offset.y + height * size
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
  }

  // Randots
  let dots = [];
  let center = { x: grid / 2, y: grid / 2 };
  for (let walk = 0; walk < 8; walk++) {
    let x = random(1, grid - 1, true);
    let y = random(1, grid - 1, true);
    let dot = {
      col: x,
      row: y,
      x: offset.x + x * ((width * size) / grid),
      y: offset.y + y * ((height * size) / grid),
      radius: variation.nodeSize * random([0.25, 0.33, 0.5]),
    };
    dots.push({ ...dot, toCenter: distance(dot, center) });
  }

  // 1) ordering all the points in the point cloud based on their distance from the center of the point cloud.
  // dots.sort((a, b) => {
  //   return a.toCenter > b.toCenter;
  // });

  let uniqueDotsObject = dots.reduce((accumulator, current) => {
    let key = `${current.row}${current.col}`;

    if (!accumulator[key]) {
      accumulator[key] = current;
    }

    return accumulator;
  }, {});

  let uniqueDots = Object.values(uniqueDotsObject);

  uniqueDots.forEach((dot) => {
    // let r = variation.nodeSize;
    let color = random(palette);

    svg
      .circle(dot.radius * 2 - variation.beltWidth)
      .attr({ cx: dot.x, cy: dot.y })
      .fill(chroma(bgColor).darken(4).hex());
  });

  // let delaunay = Delaunator.from(
  // uniqueDots.map((dot) => [
  //   offset.x + dot.x * ((width * size) / grid),
  //   offset.y + dot.y * ((width * size) / grid),
  // ])
  // );
  // console.log();

  // let hull = hullJs(uniqueDots, 20, [".x", ".y"]);
  let hull = concaveman(
    uniqueDots.map((dot) => [dot.x, dot.y]),
    1,
    20
  );

  hull.pop();
  console.log(hull, uniqueDots);
  let hullLength = hull.length;

  hull.forEach((point, i) => {
    let p1 = new paper.Point(hull[(i - 1 + hullLength) % hullLength]); // previous
    let p2 = new paper.Point(point); // current
    let p3 = new paper.Point(hull[(i + 1) % hullLength]); // next

    // Access dot data when the point matches the dot by x and y
    let previousDotIndex = uniqueDots.findIndex(
      (dot) => dot.x === p1.x && dot.y === p1.y
    );
    let previousDot = uniqueDots[previousDotIndex];

    let dotIndex = uniqueDots.findIndex(
      (dot) => dot.x === p2.x && dot.y === p2.y
    );
    let dot = uniqueDots[dotIndex];

    let nextDotIndex = uniqueDots.findIndex(
      (dot) => dot.x === p3.x && dot.y === p3.y
    );
    let nextDot = uniqueDots[nextDotIndex];

    // console.log(p1, p2, p3);

    // let p1 = new paper.Point(
    //   offset.x + previous.x * ((width * size) / grid),
    //   offset.y + previous.y * ((height * size) / grid)
    // );
    // let p2 = new paper.Point(
    //   offset.x + current.x * ((width * size) / grid),
    //   offset.y + current.y * ((height * size) / grid)
    // );

    // let p3 = new paper.Point(
    //   offset.x + next.x * ((width * size) / grid),
    //   offset.y + next.y * ((height * size) / grid)
    // );

    let pointIn = new paper.Path.Line(p2, p1).getPointAt(dot.radius);
    let pointOut = new paper.Path.Line(p2, p3).getPointAt(dot.radius);

    let lineIn = new paper.Path.Line(pointIn, p2);
    let lineOut = new paper.Path.Line(p2, pointOut);

    let lineThrough = new paper.Path.Line(p1, p3);

    // debug
    //   .path(new paper.Path.Line(p2, p3).pathData)
    //   .fill("none")
    //   .stroke({
    //     width: 0.5,
    //     color: chroma(bgColor).darken(6),
    //   });

    // let chargeLine = new paper.Path.Line(lineThrough.position, p2);
    let chargeRadius = lineThrough.getNormalAt(0).normalize(dot.radius);

    let chargeTangents = externalTangents(
      new paper.Path.Circle(p1, previousDot.radius),
      new paper.Path.Circle(p3, nextDot.radius)
    );

    let outside = chargeTangents[0];
    let inside = chargeTangents[1];
    inside.reverse();

    let chargePolygon = outside.join(inside);

    let chargeLine = new paper.Path([
      // chargePolygon.position,
      // p2,
      p2.add(chargeRadius),
      p2.subtract(chargeRadius),
    ]);

    let d1 = distance(p2.add(chargeRadius), chargePolygon.position);
    let d2 = distance(p2.subtract(chargeRadius), chargePolygon.position);

    console.log(
      "outside? ",
      d1 < d2,
      "inside? ",
      (!chargePolygon.contains(p2.add(chargeRadius)) && d1 > d2) ||
        (likeNumbers(d1, d2) &&
          chargePolygon.contains(p2.subtract(chargeRadius))),
      "inline? ",
      likeNumbers(d1, d2)
    );

    // let chargePolygon = new paper.Path(p1, p2, p3);
    chargePolygon.closed = true;
    debug
      .circle(5)
      .attr({ cx: p2.add(chargeRadius).x, cy: p2.add(chargeRadius).y })
      .fill("white")
      .stroke({ color: "black", width: 0.5 });
    debug
      .circle(5)
      .attr({
        cx: p2.subtract(chargeRadius).x,
        cy: p2.subtract(chargeRadius).y,
      })
      .fill("black")
      .stroke({ color: "black", width: 0.5 });

    // let normal = lineThrough
    //   .getNormalAt(0)
    //   // .multiply(-1)
    //   .normalize(dot.radius);
    // lineThrough.translate(normal);

    // let charge = chargeLine.intersects(lineThrough);
    let charge =
      (!chargePolygon.contains(p2.add(chargeRadius)) && d1 > d2) ||
      (likeNumbers(d1, d2) &&
        chargePolygon.contains(p2.subtract(chargeRadius)));

    // svg
    //   .path(lineIn.pathData)
    //   .fill("none")
    //   .stroke({ width: 0.5, color: bgColor });
    // svg
    //   .path(lineOut.pathData)
    //   .fill("none")
    //   .stroke({ width: 0.5, color: bgColor });

    debug
      .path(chargePolygon.pathData)
      .fill("none")
      .stroke({
        width: 0.5,
        dasharray: 3,
        color: charge ? "red" : chroma(bgColor).darken(6),
      });
    // debug.path(chargeLine.pathData).fill("none").stroke({
    //   width: 0.5,
    //   color: "cyan",
    // });
    // debug
    //   .circle(3)
    //   .attr({ cx: chargeLine.getPointAt(0).x, cy: chargeLine.getPointAt(0).y })
    //   .fill(charge ? "red" : chroma(bgColor).darken(2).hex());

    // debug
    //   .path(new paper.Path.Line(p1, p3).pathData)
    //   .fill("none")
    //   .stroke({
    //     width: 0.5,
    //     color: chroma(bgColor).darken(6),
    //   });

    // debug
    //   .path(new paper.Path.Line(p2, p3).pathData)
    //   .fill("none")
    //   .stroke({
    //     width: 1,
    //     color: chroma(bgColor).darken(3),
    //   });

    console.log(dotIndex, charge);

    uniqueDots[dotIndex].charge = charge;
    uniqueDots[dotIndex].through = charge
      ? p2.add(chargeRadius)
      : p2.subtract(chargeRadius);
    uniqueDots[dotIndex].index = i;
    // svg
    //   .path(lineThrough.pathData)
    //   .fill("none")
    //   .stroke({ width: 0.5, dasharray: 3, color: chroma(bgColor).darken(6) });

    // let o1 = new paper.Path.Circle(p1, variation.nodeSize / 2);
    // let o2 = new paper.Path.Circle(p2, variation.nodeSize / 2);

    // externalTangents(o1, o2, 1);
    // internalTangents(o1, o2, i % 2);
  });

  // uniqueDots.sort((a, b) => a.index > b.index);
  // console.log(
  //   uniqueDots.filter((dot) => dot.index).sort((a, b) => a.index > b.index)
  // );

  let belt = uniqueDots
    .filter((dot) => dot.hasOwnProperty("index"))
    .sort((a, b) => a.index - b.index);

  let beltPath = new paper.Path();
  belt.forEach((dot, i) => {
    let previous = belt[(i - 1 + belt.length) % belt.length]; // previous
    let current = dot; // current
    let next = belt[(i + 1) % belt.length]; // next

    let previousCircle = new paper.Path.Circle(
      new paper.Point([previous.x, previous.y]),
      previous.radius
    );
    let currentCircle = new paper.Path.Circle(
      new paper.Point([current.x, current.y]),
      current.radius
    );
    let nextCircle = new paper.Path.Circle(
      new paper.Point([next.x, next.y]),
      next.radius
    );

    console.log(next.charge, current.charge, current.charge ? 1 : 0);

    // let previousT = externalTangents(previousCircle, currentCircle);
    // let nextT = externalTangents(currentCircle, nextCircle);

    // let t = externalTangents(currentCircle, nextCircle);

    // let intersects = previousT[1].intersects(t[1]);
    // let intersectsWithNext = nextT[1].intersects(t[1]);

    // let intersects = intersectsWithPrevious + intersectsWithNext;

    // svg
    //   .path(t[1].pathData)
    //   .stroke({ width: 1, color: intersects ? "red" : "black" });

    let t;

    if (next.charge === current.charge) {
      t = externalTangents(currentCircle, nextCircle)[current.charge ? 0 : 1];
      // svg
      //   .path(t.pathData)
      //   .stroke({ width: variation.beltWidth, color: "black" });
      // externalTangents(currentCircle, nextCircle, current.charge ? 0 : 1);
    } else {
      t = internalTangents(currentCircle, nextCircle)[current.charge ? 0 : 1];

      // svg
      //   .path(t.pathData)
      //   .stroke({ width: variation.beltWidth, color: "black" });
    }

    let from;
    if (previous.charge === current.charge) {
      from = externalTangents(currentCircle, previousCircle)[
        current.charge ? 1 : 0
      ].lastSegment.point;
    } else {
      from = internalTangents(currentCircle, previousCircle)[
        current.charge ? 1 : 0
      ].lastSegment.point;
    }
    let lineWrap = new paper.Path.Line(
      from,
      // current.through,
      t.lastSegment.point
    );

    let wrapNormal = new paper.Path.Line(
      lineWrap.position,
      lineWrap.position.add(
        lineWrap
          .getNormalAt(lineWrap.length / 2)
          .multiply(current.radius * 2 * (current.charge ? 1 : -1))
      )
    );
    let through = currentCircle.getIntersections(wrapNormal)[0].point;

    let beltWrap = new paper.Path.Arc(from, through, t.lastSegment.point);
    debug.path(wrapNormal.pathData).stroke({ color: "lime", width: "1" });
    beltPath.add(...beltWrap.segments);
    beltPath.add(...t.segments);

    // svg
    //   .path(beltWrap.pathData)
    //   .fill("none")
    //   .stroke({ width: variation.beltWidth, color: "black" });
  });
  svg
    .path(beltPath.pathData)
    .fill(chroma(bgColor).set("lch.c", 80).hex())
    .stroke({ width: 0, color: chroma(bgColor).darken(2) })
    .css({ "mix-blend-mode": "multiply" });

  // let o1 = new paper.Path.Circle(
  //   new paper.Point(75, width * random(0.2, 0.8)),
  //   random([20, 30, 50, 90])
  // );
  // let o2 = new paper.Path.Circle(
  //   new paper.Point(width - 75, width * random(0.2, 0.8)),
  //   random([20, 30, 50, 90])
  // );

  // externalTangents(...[o1, o2].sort((a, b) => a.bounds.width > b.bounds.width));
  // externalTangents(o1, o2);
  // internalTangents(o1, o2);
  // console.log();

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function externalTangents(o1, o2) {
  // debug.path(o1.pathData).fill("none").stroke({ width: 1, color: "black" });
  // debug.path(o2.pathData).fill("none").stroke({ width: 1, color: "black" });

  let tangents;

  if (o2.bounds.width.toFixed(2) === o1.bounds.width.toFixed(2)) {
    // If circles have the same radius

    // let centerline be a line between the 2 circle center points
    let centerLine = new paper.Path.Line(o1.position, o2.position);

    // let normal be a line perpendicular to the start of the centerline, of length equal to circle radius
    let normal = centerLine.getNormalAt(0).normalize(o2.bounds.width / 2);

    tangents = [1, -1].map((i) =>
      new paper.Path.Line(o2.position, o1.position).translate(
        normal.multiply(i)
      )
    );
  } else {
    // If circles have different radius
    // Find bigger circle
    let sorted = [o1, o2].sort((a, b) => b.bounds.width - a.bounds.width);
    let big = sorted[0];
    let small = sorted[1];

    // Let center line go fom small to big
    let centerLine = new paper.Path.Line(small.position, big.position);

    // let o3 be of radius big - small, at big position
    let o3 = new paper.Path.Circle(
      big.position,
      big.bounds.width / 2 - small.bounds.width / 2
    );

    // let angle be the 2d rotation of the centerline
    let angle = Math.atan2(
      centerLine.lastSegment.point.y - centerLine.firstSegment.point.y,
      centerLine.lastSegment.point.x - centerLine.firstSegment.point.x
    );
    // let angleDeg be the angle in degrees
    let angleDeg = (angle * 180) / Math.PI;

    // let o4 be a circle passing through both ends of the centerline, align its start with the centerline
    let o4 = new paper.Path.Circle(centerLine.position, centerLine.length / 2);
    o4.rotate(angleDeg);

    // Get intersections with o2
    let intersections = o4.getIntersections(o3);

    // make both internal tangents.
    tangents = intersections.map((i, index) => {
      let direction = index === 0 ? 1 : -1;

      let line = new paper.Path.Line(small.position, i.point);
      let normal = line
        .getNormalAt(0)
        .normalize((small.bounds.width / 2) * direction);

      let tangent = new paper.Path.Line(small.position, i.point).translate(
        normal
      );
      // flip tangent to match direction of belt
      if (o2.bounds.width > o1.bounds.width) {
        tangent.reverse();
      }
      return tangent;
    });

    // Flip array to match input circles.
    if (o2.bounds.width < o1.bounds.width) {
      tangents.reverse();
    }
  }

  return tangents;
}

function internalTangents(o1, o2) {
  // let 03 be a circle of radius o1 + o2
  let o3 = new paper.Path.Circle(
    o1.position,
    o1.bounds.width / 2 + o2.bounds.width / 2
  );

  // let centerline be a line between o1, ad o2 centers.
  let centerLine = new paper.Path.Line(o1.position, o2.position);

  // let angle be the 2d rotation of the centerline
  let angle = Math.atan2(
    centerLine.lastSegment.point.y - centerLine.firstSegment.point.y,
    centerLine.lastSegment.point.x - centerLine.firstSegment.point.x
  );
  // let angleDeg be the angle in degrees
  let angleDeg = (angle * 180) / Math.PI;

  // let o4 be a circle passing through both ends of the centerline, align its start with the centerline
  let o4 = new paper.Path.Circle(centerLine.position, centerLine.length / 2);
  o4.rotate(angleDeg);

  // get intersections between o4 and o3. The should be 2.
  let intersections = o4.getIntersections(o3);

  // return both internal tangents.
  return intersections.map((i, index) => {
    let direction = index === 0 ? 1 : -1;
    let line = new paper.Path.Line(o2.position, i.point);
    let normal = line
      .getNormalAt(0)
      .normalize((o2.bounds.width / 2) * direction);

    return new paper.Path.Line(o2.position, i.point).translate(normal);
  });
}

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

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

function areParallelPoints(v1, v2) {
  let dot = v1.normalize().dot(v2.normalize());
  let epsilon = 1e-10;

  console.log(
    v1.normalize(),
    v2.normalize(),
    dot - 1,
    Math.abs(dot - 1) < epsilon
  );

  return Math.abs(dot) > 1 - epsilon;
}

function likeNumbers(a, b) {
  return Math.round(a * 100) === Math.round(b * 100);
}
