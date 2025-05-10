import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import {
  random,
  map,
  createVoronoiTessellation,
} from "@georgedoescode/generative-utils";
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
  let streetsLayer = svg.group().attr("id", "streets");
  let networkLayer = svg.group().attr("id", "network");
  let stationsLayer = svg.group().attr("id", "stations");
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

  const tessellation = createVoronoiTessellation({
    width: grid,
    height: grid,
    points: [...Array(10)].map(() => {
      return {
        x: random(0, grid, true),
        y: random(0, grid, true),
      };
    }),
    relaxIterations: 0,
  });

  tessellation.points.forEach((p) => {
    debug
      .circle(5)
      .attr({
        cx: map(p.x, 0, grid, offset.x, width - offset.x),
        cy: map(p.y, 0, grid, offset.y, height - offset.y),
      })
      .fill("black");
  });
  tessellation.cells.forEach((c) => {
    debug
      .circle(5)
      .attr({
        cx: map(c.centroid.x, 0, grid, offset.x, width - offset.x),
        cy: map(c.centroid.y, 0, grid, offset.y, height - offset.y),
      })
      .fill("red");

    let mappedPoints = c.points.map((p) => [
      map(p[0], 0, grid, offset.x, width - offset.x),
      map(p[1], 0, grid, offset.y, height - offset.y),
    ]);
    debug
      .polyline(mappedPoints)
      .fill("none")
      .stroke({ width: 1, color: "red" });
  });

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

  for (let i = 0; i < grid + 1; i++) {
    debug
      .line(
        offset.x,
        offset.y + i * ((height * size) / grid),
        offset.x + width * size,
        offset.y + i * ((height * size) / grid)
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
    debug
      .line(
        offset.x + i * ((width * size) / grid),
        offset.y,
        offset.x + i * ((width * size) / grid),
        offset.y + height * size
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
  }

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

    // Lines
    networkLayer.line(x1, y1, x2, y2).stroke({
      width: 3,
      color: chroma(random(palette)).saturate(0.9).luminance(0.5),
    });
    // "Stops"
    stationsLayer
      .circle(5)
      .attr({
        cx: x1,
        cy: y1,
      })
      .fill(chroma.average(palette).luminance(0.9).saturate(0.1).hex())
      .stroke({
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
          color: chroma(random(palette)).saturate(0.7),
        });
    }
  }

  // Cell grids
  /**
    1. Start with one edge per cell
    2. Find normal and tangent vectors
    3. Get bounding box of polygon
    4. Draw grid lines to fill the bounding box
    5. Clip lines to the polygon by intersecting grid line with polygon.
  */

  tessellation.cells.forEach((c) => {
    /**
      1. Start with one edge per cell
      2. Find normal and tangent vectors
      3. Get bounding box of polygon
      4. Draw grid lines to fill the bounding box
      5. Clip lines to the polygon by intersecting grid line with polygon.
    */

    // Make sure we use consistent coordinate mapping everywhere
    const mappedPoints = c.points.map((p) => [
      map(p[0], 0, grid, offset.x, width - offset.x),
      map(p[1], 0, grid, offset.y, height - offset.y),
    ]);

    // Pick a random edge index
    // Pick a random edge
    const edgeIndex = Math.floor(Math.random() * mappedPoints.length);
    const startPoint = mappedPoints[edgeIndex];
    const endPoint = mappedPoints[(edgeIndex + 1) % mappedPoints.length];

    // Create edge vector
    const edge = new paper.Path.Line({
      from: new paper.Point(startPoint[0], startPoint[1]),
      to: new paper.Point(endPoint[0], endPoint[1]),
    });

    let normal = edge.getNormalAt(0);
    let tangent = edge.getTangentAt(0);

    // Create polygon from mapped points
    const polygonPoints = mappedPoints.map((p) => new paper.Point(p[0], p[1]));
    const polygon = new paper.Path({
      segments: polygonPoints,
      closed: true,
    });
    let polygonBoundingRect = polygon.bounds;

    // While parallel line is within polygon bounds
    // If the poisition of the last line starts at polygon edge
    // Draw another parallel line form the last position
    // Make it long enough to fill the polygon
    // Then clip it to the polygon by intersecting it. If no results, stop.

    // Get the centroid in canvas coordinates
    const centroid = new paper.Point(
      map(c.centroid.x, 0, grid, offset.x, width - offset.x),
      map(c.centroid.y, 0, grid, offset.y, height - offset.y)
    );

    // Get the midpoint of the edge
    const edgeMidpoint = new paper.Point(
      (startPoint[0] + endPoint[0]) / 2,
      (startPoint[1] + endPoint[1]) / 2
    );

    // Vector from edge midpoint to centroid
    const toCentroid = centroid.subtract(edgeMidpoint);
    // Dot product test to see if normal points toward centroid
    const dotProduct = normal.x * toCentroid.x + normal.y * toCentroid.y;
    // If dot product is negative, normal points away from centroid
    if (dotProduct < 0) {
      // Reverse the normal
      normal = normal.multiply(-1);
    }
    // Draw lines with increasing offset
    let streetDensity = random(3, 6, true);
    let hasTangentIntersections = true;
    let tangentLoops = 1;
    let color = chroma(random(palette)).saturate(-0.3).luminance(0.4).hex();

    // parallels (Tangents)
    while (hasTangentIntersections && tangentLoops < 100) {
      // Calculate offset for this line
      const offset = tangentLoops * streetDensity; // Increased spacing for clarity
      const offsetVector = normal.multiply(offset);

      // Create a very long line parallel to the edge
      const lineMidpoint = edgeMidpoint.add(offsetVector);
      const maxDim = Math.max(width, height) * 2;

      // Create points far enough in both directions
      const lineStart = lineMidpoint.add(tangent.multiply(-maxDim));
      const lineEnd = lineMidpoint.add(tangent.multiply(maxDim));

      // Create the test line
      const testLine = new paper.Path.Line(lineStart, lineEnd);

      // Important! Add the line to the project to ensure intersections work
      testLine.strokeColor = "yellow";
      testLine.strokeWidth = 1;

      // Draw the full test line (for debugging)
      debug
        .line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y)
        .stroke({ color: "gray", width: 0.5, opacity: 0.3 });

      // Force Paper.js to calculate geometry
      paper.view.update();

      // Get intersections
      // console.log("polygon", polygon);
      const intersections = polygon.getIntersections(testLine);
      // console.log(`Line ${tangentLoops} has ${intersections.length} intersections`);

      // Draw intersections as circles for debugging
      intersections.forEach((intersection) => {
        debug
          .circle(3)
          .attr({ cx: intersection.point.x, cy: intersection.point.y })
          .fill("yellow");
      });

      // If we have at least 2 intersections, draw the clipped line
      if (intersections.length >= 2) {
        // Sort intersections by position along the line
        intersections.sort((a, b) => a.offset - b.offset);

        // Get first and last intersection points
        const start = intersections[0].point;
        const end = intersections[intersections.length - 1].point;

        // Draw the clipped line
        streetsLayer
          .line(start.x, start.y, end.x, end.y)
          .stroke({ color: color, width: 0.5 });
      } else {
        hasTangentIntersections = false;
      }
      tangentLoops++;

      // Clean up the test line
      testLine.remove();
    }

    streetDensity = random(8, 16, true);
    let direction = 1;
    let normalLoops = 1;
    // parallels (Tangents)
    // First do forward direction, then backward
    while (normalLoops < 100) {
      // Calculate offset along the edge
      const offset = normalLoops * streetDensity * direction;

      // Move along the edge (using tangent vector)
      const pointOnEdge = new paper.Point(startPoint[0], startPoint[1]).add(
        tangent.multiply(offset)
      );

      // Create a very long line perpendicular to the edge
      const maxDim = Math.max(width, height) * 2;

      // Create the test line
      const lineStart = pointOnEdge.add(normal.multiply(-maxDim / 4));
      const lineEnd = pointOnEdge.add(normal.multiply(maxDim));
      const testLine = new paper.Path.Line(lineStart, lineEnd);

      // Debug visualization
      debug.line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y).stroke({
        color: direction > 0 ? "purple" : "blue",
        width: 0.5,
        opacity: 0.3,
      });

      // Force Paper.js to calculate geometry
      paper.view.update();

      // Get intersections
      const intersections = polygon.getIntersections(testLine);

      // If we have at least 2 intersections, draw the clipped line
      if (intersections.length >= 2) {
        // Sort intersections by position along the line
        intersections.sort((a, b) => a.offset - b.offset);

        // Get first and last intersection points
        const start = intersections[0].point;
        const end = intersections[intersections.length - 1].point;

        // Draw the clipped line
        streetsLayer
          .line(start.x, start.y, end.x, end.y)
          .stroke({ color: color, width: 0.5 });

        // Continue in current direction
        normalLoops++;
      } else {
        // No more intersections in current direction

        if (direction === 1) {
          // Switch to backward direction
          direction = -1;
          normalLoops = 1; // Reset loop counter for backward direction
        } else {
          // We've tried both directions, exit the loop
          break;
        }
      }

      // Clean up the test line
      testLine.remove();
    }
    streetsLayer
      .path(polygon.pathData)
      .fill("none")
      .stroke({
        color: chroma.average(palette).luminance(0.3).hex(),
        width: 1,
      });
  });

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
