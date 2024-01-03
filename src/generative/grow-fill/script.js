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
const shapeData = [
  "M24.6936 2.57789L149.041 48.8627C156.135 51.5032 164.08 48.3904 167.493 41.6337L173.003 30.7227C177.493 21.8322 190.668 23.5378 192.746 33.2786C193.772 38.0898 191.338 42.972 186.879 45.0483L100.773 85.1376C85.104 92.4329 79.6018 111.963 89.1582 126.365L93.7121 133.228C100.548 143.53 96.9585 157.484 86.0001 163.208C78.2027 167.282 73.8048 175.814 75.0114 184.528L75.7204 189.649C78.7662 211.646 50.9528 223.729 36.9533 206.491C28.037 195.512 31.6842 179.089 44.4095 172.917L54.6641 167.942C71.5204 159.766 77.3159 138.613 66.9812 122.987L3.49972 26.9996C-4.11804 12.9762 9.73722 -2.9892 24.6936 2.57789Z",
  "M70.0003 139.5C-23.9997 152 -25.9997 66.5 88.0003 1C71.3335 20.3333 50.1 59.9 98.5 63.5C159 68 164 127 70.0003 139.5Z",
  "M5 0H130L140 146L0 140.5L5 69.5V0Z",
  "M6 100L12.5 20.5L104 72.5L167.5 1L196 56.5L104 163L6 100Z",
  "M315 20.5H227.5L206 233H349L315 20.5Z",
  "M202 250.5H1C1 362.9 135 408.333 202 417V340L40.5 270H202V250.5Z",
  "M389 257.5H278C278 366.7 352 440.333 389 463.5V257.5Z",
];

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
  let grid = random(7, 11, true);
  let size = random([0.875, 0.95]);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let variation = {
    nodeSize: (width * size) / grid - 2,
    grid: grid,
    nodeType: random(["burst", "circle", "petals", "none"]),
  };

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  let shape = new paper.Path();

  /** Voronoi
   *  1. Draw tesselation within bounding rect of any shape
   *  2. Map points to shape
   *  3. Interesected cells to shape
   *  4. Run growFill on interesected cells
   */
  const tessellation = createVoronoiTessellation({
    width: width * size,
    height: height * size,
    points: [...Array(30)].map(() => {
      return {
        x: random(offset.x, width - offset.x),
        y: random(offset.y, width - offset.y),
      };
    }),
    relaxIterations: 1,
  });
  console.log("drawing", tessellation.cells.length, "cells");

  tessellation.cells.forEach((cell) => {
    let points = cell.points.map((p) =>
      new paper.Point(p[0], p[1]).add(new paper.Point(offset.x, offset.y))
    );
    let cellShape = new paper.Path(points);

    growFill(cellShape.pathData).forEach((line) => {
      svg
        .path(line.pathData)
        .fill("none")
        .stroke({ width: 1, color: random(palette) });
    });

    // svg
    //   .path(cellShape.pathData)
    //   .fill("none")
    //   .stroke({ width: 1, color: random(palette) });
  });

  /** Croissant */

  // shape.add(new paper.Point(random(50, 150), random(50, 150)));
  // shape.add(new paper.Point(random(width * 0.45, width * 0.75), 150));

  // shape.add(new paper.Point(width - 50, 50));
  // shape.add(
  //   new paper.Point(
  //     random(width * 0.5, width * 0.75),
  //     random(100, height - 100)
  //   )
  // );
  // shape.add(new paper.Point(width - 50, height - 50));
  // shape.add(new paper.Point(random(width * 0.25, width * 0.5), height - 90));
  // shape.add(new paper.Point(50, height - 50));

  /** Amibes */
  // let padding = 50;
  // shape.add(
  //   new paper.Point(
  //     random(padding, width - padding),
  //     random(padding, height - padding)
  //   )
  // );
  // shape.add(
  //   new paper.Point(
  //     random(padding, width - padding),
  //     random(padding, height - padding)
  //   )
  // );
  // shape.add(
  //   new paper.Point(
  //     random(padding, width - padding),
  //     random(padding, height - padding)
  //   )
  // );
  // shape.add(
  //   new paper.Point(
  //     random(padding, width - padding),
  //     random(padding, height - padding)
  //   )
  // );

  // shape.closePath();

  // Make a grid

  let cellSize = (width * size) / grid;
  let testGrid = [];
  let gridMin = new paper.Point(
    width * ((1 - size) / 2),
    height * ((1 - size) / 2)
  );
  let gridMax = new paper.Point(width * size, height * size).add(gridMin);

  let gridBounds = new paper.Path.Rectangle(
    gridMin,
    new paper.Size(width * size, height * size)
  );
  // gridLayer
  //   .rect(width * size, height * size)
  //   .attr({ x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) })
  //   .fill("none")
  //   .stroke({ color: chroma(bgColor).darken().darken(), width: 0.5 });

  for (let i = 0; i < grid; i++) {
    // gridLayer
    //   .line(
    //     offset.x,
    //     offset.y + i * ((height * size) / grid),
    //     offset.x + width * size,
    //     offset.y + i * ((height * size) / grid)
    //   )
    //   .stroke({ color: chroma(bgColor).darken(), width: 0.5 });
    // gridLayer
    //   .line(
    //     offset.x + i * ((width * size) / grid),
    //     offset.y,
    //     offset.x + i * ((width * size) / grid),
    //     offset.y + height * size
    //   )
    //   .stroke({ color: chroma(bgColor).darken(), width: 0.5 });
    for (let j = 0; j < grid; j++) {
      let gridPoint = new paper.Point(
        offset.y + i * ((height * size) / grid),
        offset.y + j * ((height * size) / grid)
      );
      let gridCellSize = new paper.Size(
        (width * size) / grid,
        (height * size) / grid
      );
      testGrid.push(new paper.Path.Rectangle(gridPoint, gridCellSize));

      // gridLayer
      //   .rect((width * size) / grid, (height * size) / grid)
      //   .attr({
      //     x: offset.y + i * ((height * size) / grid),
      //     y: offset.y + j * ((height * size) / grid),
      //   })
      //   .fill(random(palette));
    }
  }

  // console.log(testGrid);

  // Draw large shapes and check intersections with grid areas

  let occupied = [];
  for (let t = 0; t < 500; t++) {
    let freeCells = testGrid.filter((cell) => cell.data.occupied !== true);
    // let dot = { x: random(1, grid - 1, true), y: random(1, grid - 1, true) };
    if (freeCells.length < 1) {
      continue;
    }
    let cellPosition = random(freeCells).position;
    let x = cellPosition.x;
    let y = cellPosition.y;
    let maxSize = Math.min(
      Math.min(y - gridMin.y, gridMax.y - y),
      Math.min(x - gridMin.x, gridMax.x - x)
    );
    let testSize = Math.min(random(50, Math.max(60, testGrid.length)), 100000);
    let test = new paper.Path.Circle(new paper.Point(x, y), testSize);

    test.flatten(5);
    // test.smooth();

    // for (let d = 0; d < random(0, test.segments.length / 2, true); d++) {
    //   test.removeSegment(random(0, test.segments.length - 1, true));
    // }

    test.segments.map((segment) =>
      segment.point.set(
        segment.point.add(new paper.Point(random(-5, 5), random(-5, 5)))
      )
    );

    if (occupied.length) {
      if (
        occupied.some(
          (cell) => test.intersects(cell) || test.isInside(cell.bounds)
        )
      ) {
        continue;
      }
    }

    // growFill(test.pathData).forEach((line) => {
    //   svg
    //     .path(line.pathData)
    //     .fill("none")
    //     .stroke({ width: 1, color: random(palette) });
    // });

    testGrid.forEach((cell, i) => {
      if (
        test.intersects(cell) ||
        cell.isInside(test.bounds) ||
        test.isInside(cell.bounds)
      ) {
        // gridLayer
        //   .rect(cell.bounds.width, cell.bounds.height)
        //   .attr({
        //     x: cell.bounds.x,
        //     y: cell.bounds.y,
        //   })
        //   .fill(random(palette));
        occupied.push(cell);
        cell.data.occupied = true;
      }
    });
  }

  /** A random line */
  // let openCells = testGrid.filter((cell) => cell.data.occupied !== true);
  // let openPath = new paper.Path();
  // openCells.forEach((cell) => {
  //   openPath.add(
  //     new paper.Point(cell.bounds.x, cell.bounds.y).add(
  //       new paper.Point(random(-5, 5), random(-5, 5))
  //     )
  //   );
  //   openPath.add(
  //     new paper.Point(cell.bounds.x + cell.bounds.width, cell.bounds.y).add(
  //       new paper.Point(random(-5, 5), random(-5, 5))
  //     )
  //   );
  //   openPath.add(
  //     new paper.Point(
  //       cell.bounds.x + cell.bounds.width,
  //       cell.bounds.y + cell.bounds.height
  //     ).add(new paper.Point(random(-5, 5), random(-5, 5)))
  //   );
  // });
  // svg
  //   .path(roundCorners(openPath.pathData, 5).path)
  //   .fill("none")
  //   .stroke({ width: 1, color: random(palette) });

  /** Recursively join open cells (broken) */
  // let fillerShapes = [];

  // let loops = 0;
  // let somethingToJoin = true;
  // while (somethingToJoin && loops < 10) {
  //   somethingToJoin = false;

  //   openCells.forEach((cell, i) => {
  //     openCells.forEach((otherCell, j) => {
  //       if (
  //         cell.intersects(otherCell) &&
  //         !cell.data.joined &&
  //         !otherCell.data.joined
  //       ) {
  //         fillerShapes.push(cell.unite(otherCell));
  //         cell.data.joined = true;
  //         otherCell.data.joined = true;
  //         somethingToJoin = true;
  //       }
  //     });
  //   });

  //   loops++;
  // }

  // console.log(openCells);

  // fillerShapes.forEach((cell) => {
  //   // cell.smooth(0.1);
  //   // growFill(cell.pathData).forEach((line) => {
  //   //   svg
  //   //     .path(line.pathData)
  //   //     .fill("none")
  //   //     .stroke({ width: 1, color: random(palette) });
  //   // });
  //   svg.path(cell.pathData).fill("none").stroke({ width: 1, color: "cyan" });
  // });

  // After x iterations, stop trying

  // For each leftover grid areas, fill with shape.

  // svg
  //   .path(roundCorners(shape.pathData, 60).path)
  //   .fill("none")
  //   .stroke({ width: 1, color: random(palette) });

  // growFill(roundCorners(shape.pathData, 30).path).forEach((line) => {
  //   svg
  //     .path(line.pathData)
  //     .fill("none")
  //     .stroke({ width: 1, color: random(palette) });
  // });

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function growFill(shapeData) {
  let shape = new paper.Path(random(shapeData)).reorient(true, true);
  let shapeLength = shape.length;
  let shapePoints = [];
  let liveLines = [];
  let deadLines = [];

  let density = 50;

  for (let i = 0; i < shapeLength; i += random(2, 5)) {
    let start = shape.getPointAt(i);
    let end = shape.getNormalAt(i).multiply(-5).add(start);

    let liveLine = new paper.Path.Line(start, end);
    let crossings = liveLine.getCrossings(shape);

    if (crossings.length > 0) {
      end = crossings[0].point;
      // console.log("Crosses at ", crossings[0].point);
      deadLines.push(liveLine);
    } else {
      liveLines.push(liveLine);
    }

    // console.log(start, end);
    // svg.line(start.x, start.y, end.x, end.y).stroke({ width: 1, color: color });
  }

  // console.log("alive", liveLines.length, "dead", deadLines.length);

  let loops = 0;
  while (liveLines.length > 0 && loops < 60) {
    let die = [];
    let newLines = [];
    liveLines.forEach((line, i) => {
      let shouldDie = false;
      let start = line.lastSegment.point;
      let end = line
        .getTangentAt(line.length)
        .multiply(5)
        .add(new paper.Point(random(-0.5, 0.5), random(-0.5, 0.5)))
        .add(start);

      let liveLine = new paper.Path.Line(start, end);

      // To find the closest crossing, we track the initial length of the segment.
      let closestCrossing = liveLine.length;

      // Get crossings with hard shape last?
      let crossings = liveLine.getCrossings(shape);

      if (crossings.length > 0) {
        closestCrossing = crossings[0].offset;
        end = crossings[0].point;
        debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("cyan");
        shouldDie = true;
      }

      // Get crossings with other lines. If found, kill line.
      liveLines.forEach((otherLine, j) => {
        if (i === j) {
          return;
        }
        crossings = liveLine.getCrossings(otherLine);
        if (crossings.length > 0) {
          // If the found crossing is closer than the hard shape crossing...
          if (closestCrossing > crossings[0].offset) {
            end = crossings[0].point;
            debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("red");
            shouldDie = true;
          }
        }
      });

      deadLines.forEach((otherLine, j) => {
        crossings = liveLine.getCrossings(otherLine);
        if (crossings.length > 0) {
          // If the found crossing is closer than the hard shape crossing...
          if (closestCrossing > crossings[0].offset) {
            end = crossings[0].point;
            debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("black");
            shouldDie = true;
          }
        }
      });

      // Add segment to live line, now that we know where it should end.
      line.add(end);

      // Sometimes, add a new line
      if (random(0, 1) > 10 / line.segments.length && !shouldDie) {
        let end = line
          .getNormalAt(line.length)
          .multiply(5)
          .add(new paper.Point(random(-0.5, 0.5), random(-0.5, 0.5)))
          .add(start);
        let newLine = new paper.Path.Line(start, end);
        if (shape.contains(start) && shape.contains(end)) {
          newLines.push(newLine);
          // svg
          //   .line(
          //     newLine.lastSegment.previous.point.x,
          //     newLine.lastSegment.previous.point.y,
          //     newLine.lastSegment.point.x,
          //     newLine.lastSegment.point.y
          //   )
          //   .stroke({ width: 1, color: color });
        }
      }

      if (line.segments.length > 30) {
        shouldDie = true;
      }

      // console.log("draw line");
      svg;
      // .line(
      //   line.lastSegment.previous.point.x,
      //   line.lastSegment.previous.point.y,
      //   line.lastSegment.point.x,
      //   line.lastSegment.point.y
      // )
      // .stroke({ width: 1, color: color });

      if (shouldDie) {
        die.push(i);
      }
    });

    // console.log(die, liveLines.length);
    die.sort((a, b) => a - b).reverse();
    die.forEach((death) => {
      deadLines.push(...liveLines.splice(death, 1));
    });
    // liveLines = liveLines.filter((line, i) => !die.includes(i));

    // console.log(die, liveLines.length);
    liveLines.push(...newLines);

    loops++;

    // console.log(
    //   liveLines.length,
    //   "lines",
    //   deadLines.length,
    //   "dead",
    //   deadLines.length + liveLines.length
    // );
  }
  console.log("loops", loops, "alive ", liveLines.length);
  return deadLines;
}
