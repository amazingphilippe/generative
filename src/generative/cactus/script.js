import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import { random } from "@georgedoescode/generative-utils";
import concaveman from "concaveman";
import { roundCorners } from "svg-round-corners";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

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

  let tone = random(10, 130);

  let palettePoline = new Poline({
    anchorColors: [
      [tone, 0.9, 0.4],
      [tone + random(0, 15), 0.5, 0.6],
      [tone + random(0, 120), 0.5, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  let cmyk = ["cyan", "yellow", "magenta", "black"];

  // Begin awesomeness

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let gridLayer = svg.group().attr("id", "grid");
  let nodeLayer = svg.group().attr("id", "nodes");
  let polysLayer = svg.group().attr("id", "polys");

  // Features
  let grid = random(30, 70);
  let gridY = grid;
  let size = random(0.85, 0.9);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let variation = {
    nodeSize: ((width * size) / grid) * 0.9,
    grid: grid,
    nodeType: random(["burst", "circle", "petals", "none"]),
    palette: random([
      cmyk,
      palettePoline,
      palettePoline,
      palettePoline,
      palettePoline,
    ]),
  };

  let palette = variation.palette;
  let fusion = palette.includes("magenta") ? "multiply" : "normal";

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  for (let i = 0; i < gridY + 1; i++) {
    // gridLayer
    //   .line(
    //     offset.x,
    //     offset.y + i * ((height * size) / gridY),
    //     offset.x + width * size,
    //     offset.y + i * ((height * size) / gridY)
    //   )
    //   .stroke({ color: "#a2a5c7", width: 0.5 });
    // gridLayer
    //   .line(
    //     offset.x + i * ((width * size) / grid),
    //     offset.y,
    //     offset.x + i * ((width * size) / grid),
    //     offset.y + height * size
    //   )
    //   .stroke({ color: "#a2a5c7", width: 0.5 });
  }

  // Randots
  let targetDots = grid * gridY;
  let dots = [];
  let center = { x: grid / 2, y: grid / 2 };
  let walks = 0;

  while (dots.length < targetDots && walks < 50) {
    let maxAttemps = 100;
    let color = random(palette);
    for (let walk = 0; walk < 80; walk++) {
      let x, y;
      if (center.x <= 0) {
        x = center.x + random(0, 1, true);
      } else if (center.x >= grid) {
        x = center.x + random(-1, 0, true);
      } else {
        x = center.x + random(-1, 1, true);
      }

      if (center.y <= 0) {
        y = center.y + random(0, 1, true);
      } else if (center.y >= gridY) {
        y = center.y + random(-1, 0, true);
      } else {
        y = center.y + random(-1, 1, true);
      }

      let dot = {
        col: x,
        row: y,
        x: offset.x + x * ((width * size) / grid),
        y: offset.y + y * ((height * size) / gridY),
        radius: variation.nodeSize / 2,
        color: chroma(color).hex(),
        walk: walks,
      };
      // If the new dot is distinct from other dots
      if (
        !dots.some((d) => {
          return d.row === dot.row && d.col === dot.col;
        })
      ) {
        dots.push({ ...dot, toCenter: distance(dot, center) });
        center = { x: x, y: y };
      } else if (maxAttemps > 0) {
        walk--;
        maxAttemps--;
      } else {
        console.log("Got stuck, finding new start point");
        let newStart = findNewStartPoint(dots);
        if (newStart) {
          center = { x: newStart.col, y: newStart.row };
          console.log("Found new start point");
        } else {
          center = { x: grid / 2, y: gridY / 2 }; // Fallback to center if no available spots
          console.log("No available spots, returning to center");
        }
        break;
      }
    }
    console.log(`Progress: ${dots.length}/${targetDots} dots created`);
    walks++;
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

  let dotsByWalk = uniqueDots.reduce((groups, dot) => {
    if (!groups[dot.walk]) {
      groups[dot.walk] = [];
    }

    groups[dot.walk].push(dot);

    return groups;
  }, {});

  //Hatch Walks

  let density = random(2, 6);
  let mode = random(["ESS", "ZAG"]);

  Object.values(dotsByWalk).forEach((walk) => {
    let hull = concaveman(
      walk.map((dot) => [dot.x, dot.y]),
      Infinity,
      20
    );

    let pathData = new paper.Path({ segments: hull, closed: true }).pathData;
    let roundedPathData = roundCorners(pathData, (height * size) / grid).path;
    // polysLayer
    //   .path(pathData)
    //   .fill(random(palette))
    //   .fill("none")
    //   .stroke({ width: 1, color: chroma(random(palette)).darken(0.9) });
    polysLayer
      .path(hatchFill(hull, { density, mode }))
      .fill("none")
      .stroke({ width: 1, color: random(palette) })
      .css("mix-blend-mode", fusion);
  });

  // Helper function to check if a dot has available space around it
  function hasAvailableSpace(dot, dots) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        let newX = dot.col + dx;
        let newY = dot.row + dy;

        // Check bounds
        if (newX < 0 || newX >= grid || newY < 0 || newY >= gridY) continue;

        // If we find an empty spot, this dot has available space
        if (!dots.some((d) => d.col === newX && d.row === newY)) {
          return true;
        }
      }
    }
    return false;
  }

  // Find a random dot with available space
  function findNewStartPoint(dots) {
    let availableDots = dots.filter((dot) => hasAvailableSpace(dot, dots));
    if (availableDots.length === 0) return null;
    return availableDots[Math.floor(Math.random() * availableDots.length)];
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

function hatchFill(points, options = {}) {
  const density = options.density || 6;
  const mode = options.mode || "ESS";

  // Ensure we have at least 3 points for a valid polygon
  if (points.length < 3) return [];

  // Convert points to Paper.js points
  const paperPoints = points.map((pt) => new paper.Point(pt[0], pt[1]));

  // Create a Paper.js path for the polygon
  const polygon = new paper.Path(paperPoints);
  polygon.closed = true;
  //polygon.reduce();

  // Get the bounds of the polygon
  const bounds = polygon.bounds;

  // Select a random edge to determine fill direction
  const edgeIndex = Math.floor(Math.random() * points.length);
  const p1 = new paper.Point(points[edgeIndex]);
  const p2 = new paper.Point(points[(edgeIndex + 1) % points.length]);

  console.log("seed edge points: ", p1, p2);

  // Calculate direction vector for the fill lines
  let fillVector = p2.subtract(p1).normalize();

  // Calculate the center of the polygon bounds
  const center = new paper.Point(bounds.center);

  // Calculate vector from edge midpoint to center
  const edgeMidpoint = p1.add(p2).multiply(0.5);
  const towardCenter = center.subtract(edgeMidpoint);

  // Calculate normal vector (perpendicular to fillVector)
  let normalVector = new paper.Point(-fillVector.y, fillVector.x);

  // Check if normal vector is pointing away from center
  if (normalVector.dot(towardCenter) < 0) {
    // If dot product is negative, flip the fill vector
    normalVector = normalVector.multiply(-1);
  }

  // Start with a point on the selected edge
  const debugPoint = p1.clone(); // Starting point for visualization

  // Draw the fill direction vector (parallel to edge)
  const fillEndPoint = debugPoint.add(fillVector.multiply(30)); // Scale for visibility
  debug
    .line(debugPoint.x, debugPoint.y, fillEndPoint.x, fillEndPoint.y)
    .stroke({ color: "red", width: 0.5 }); // Red for fill direction

  // Draw the normal vector (perpendicular to edge)
  const normalEndPoint = debugPoint.add(normalVector.multiply(30)); // Scale for visibility
  debug
    .line(debugPoint.x, debugPoint.y, normalEndPoint.x, normalEndPoint.y)
    .stroke({ color: "cyan", width: 0.5 }); // Cyan for normal direction

  // Add small dots at the ends for clarity
  debug.circle(4).center(fillEndPoint.x, fillEndPoint.y).fill("red");

  debug.circle(4).center(normalEndPoint.x, normalEndPoint.y).fill("cyan");

  debug.circle(6).center(debugPoint.x, debugPoint.y).fill("yellow");

  // Get projections of polygon vertices on the normal vector
  let maxProjection = -Infinity;
  let maxPoint;
  const referencePoint = p1.clone();

  for (const point of paperPoints) {
    // Calculate vector from reference point to this point
    const relativeVector = point.subtract(referencePoint);
    // Project this vector onto the normal
    const proj = relativeVector.dot(normalVector);
    if (proj > maxProjection) {
      maxProjection = proj;
      maxPoint = point;
    }
    const lineLength = 20; // Adjust as needed
    const lineStart = point.subtract(fillVector.multiply(lineLength / 2));
    const lineEnd = point.add(fillVector.multiply(lineLength / 2));

    // Draw the tangent line
    debug
      .line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y)
      .stroke({ color: "gray", width: 0.5, dasharray: "3,2" });

    // Add a small dot at the point
    debug
      .circle(3)
      .center(point.x, point.y)
      .fill(proj === maxProjection ? "orange" : "gray");
  }
  debug.circle(8).center(maxPoint.x, maxPoint.y).fill("orange");
  debug.plain("max").attr({ x: maxPoint.x + 10, y: maxPoint.y });

  // Calculate number of lines needed
  const fullDist = maxPoint.getDistance(p1);
  const numLines = Math.ceil(fullDist / density);

  console.log(fullDist, numLines);

  // Calculate line length to ensure it crosses the entire polygon
  const diagonal = Math.sqrt(
    Math.pow(bounds.width, 2) + Math.pow(bounds.height, 2)
  );
  const lineLength = diagonal * 1.2; // Add extra length to ensure full coverage

  // Create path segments for the fill lines
  const pathSegments = new paper.Path();
  for (let i = 0; i <= numLines; i++) {
    const t = i * density;

    // Calculate a point that's t units along the normal vector from our reference point
    const lineCenter = p1.add(normalVector.multiply(t));

    // Create line endpoints going in the fill direction
    const lineStart = lineCenter.subtract(fillVector.multiply(lineLength));
    const lineEnd = lineCenter.add(fillVector.multiply(lineLength));

    // Create a Paper.js line
    const line = new paper.Path.Line(lineStart, lineEnd);
    debug
      .line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y)
      .stroke({ color: "gray", width: 0.5 });

    // Get intersections with the polygon
    const intersections = line.getIntersections(polygon);

    // Sort intersections by position along the line
    intersections.sort((a, b) => {
      return (
        a.point.subtract(lineStart).length - b.point.subtract(lineStart).length
      );
    });

    // Create line segments between pairs of intersections
    for (let j = 0; j < intersections.length; j += 2) {
      if (j + 1 < intersections.length) {
        const p1 = intersections[j].point;
        const p2 = intersections[j + 1].point;

        if (i % 2 == 0 && mode === "ESS") {
          pathSegments.add(p1);
          pathSegments.add(p2);
        } else {
          pathSegments.add(p2);
          pathSegments.add(p1);
        }
      }
    }

    // Clean up temporary Paper.js objects
    line.remove();
  }

  // Clean up the polygon
  polygon.remove();

  console.log(pathSegments.pathData);

  return pathSegments.pathData;
}
