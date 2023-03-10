import { SVG, Point } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  createVoronoiTessellation,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import paper from "https://cdn.skypack.dev/paper";

import chroma from "https://cdn.skypack.dev/chroma-js";

import { Vector } from "https://cdn.skypack.dev/p5js-vector-standalone";

import { Poline, positionFunctions } from "https://unpkg.com/poline?module";

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

let debug = false;
document.addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    debug = true;
    generate();
  }
});

const leafPalette = ["#2D4739", "#2A3C35", "#445C5C"];
const fruitPalette = chroma.scale(["#EE964B", "#F95738"]).mode("lch").colors(6);
// const fruitPalette = chroma.scale(['#6A3937','#3B0D11']).mode('lch').colors(6)
let palette = ["#F5F749", "#0C0F0A", "#dedee0"];
const sunPalette = chroma.scale(["#fdfeba", "#fdee6a"]).mode("lch").colors(4);

const { width, height } = svg.viewbox();

const min_dist = 15;
const max_dist = 100;

let origin;

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

let scale = random(10, 20, true);

function generate() {
  svg.clear();

  origin = { x: random(100, width - 100), y: height - 20 };

  palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  });

  for (var j = random(0, -10); j < height; j += random(2, 24, true)) {
    if (random(j, height) < height) {
      let noise = random(-map(j, 0, 500, 0, 5), map(j, 0, 500, 0, 5));
      svg
        .line(-5, j + random(-noise * 40, noise * 40), width + 5, j + noise)
        .fill("none")
        .stroke({
          width: 80,
          linecap: "round",
          color: chroma(palette.colorsCSS[6])
            .brighten(random(j, height) > height / 2 ? 1 : random(2, 2.5))
            .hex(),
        });
    }
  }

  svg
    .polygon([
      [0, random(500, 550)],
      [width, random(500, 550)],
      [width, height],
      [0, height],
    ])
    .fill(chroma(palette.colorsCSS[6]).brighten(5).hex());

  // shadow
  svg.line(origin.x, origin.y, random(-300, -100), height).stroke({
    width: 12,
    color: chroma(palette.colorsCSS[4]).saturate(-2).brighten(1.5).hex(),
    linecap: "square",
  });
  scale = random(10, 20, true);
  for (var j = 0; j < 1; j++) {
    console.log("tree ", j);
    let tree = new Tree();

    tree.show();
    for (var i = 0; i < 100; i++) {
      if (tree.leaves == 0) {
        continue;
      }
      tree.grow();
    }

    tree.show();
  }
}
generate();

function Tree() {
  this.leaves = [];
  this.branches = [];

  // Leaves from voronoi tessellation
  // const tessellation = createVoronoiTessellation({
  //   width: width,
  //   height: height,
  //   points: [...Array(scale)].map((i) => {
  //     return {
  //       x: random(100, width - 100),
  //       y: random(0, height - 100),
  //     };
  //   }),
  //   relaxIterations: 1,
  // });

  let treeWidth = random(20, width / 3);

  for (var i = 0; i < 10; i++) {
    let shape = new paper.Path({
      segments: [
        [random(30, 100), height * random(0.6, 0.75)],
        [treeWidth, random(20, 300)],
        [width - treeWidth, random(20, 300)],
        [width - random(30, 100), height * random(0.6, 0.75)],
      ],
    });

    // console.log(chaikin(shape, 0.2, 4));

    chaikin(shape, 0.2, 4).segments.forEach((c) => {
      this.leaves.push(new Leaf(c.point.x, c.point.y));
    });
  }

  // Root of Tree
  let pos = new Vector(origin.x, origin.y);
  let dir = new Vector(0, -1);
  let root = new Branch(null, pos, dir);

  this.branches.push(root);

  let current = root;

  let found = false;
  let tries = 0;

  while (!found) {
    console.log("loop");
    for (let i = 0; i < this.leaves.length; i++) {
      let d = distance(current.pos, this.leaves[i].pos);
      if (d < max_dist) {
        // console.log("found", d);
        found = true;
      }
    }
    if (!found) {
      // console.log("not found", current.pos, current.parent);
      let branch = current.next();
      //console.log(current.pos, branch.pos);
      current = branch;
      this.branches.push(current);
    }
    tries++;
  }

  this.grow = function () {
    //console.log("growing");
    for (var i = 0; i < this.leaves.length; i++) {
      let leaf = this.leaves[i];
      let closestBranch = null;
      let record = max_dist;
      for (var j = 0; j < this.branches.length; j++) {
        let branch = this.branches[j];
        let d = distance(leaf.pos, branch.pos);
        if (d < min_dist) {
          // console.log("reached");
          leaf.reached = true;
          leaf.draw(branch);
          closestBranch = null;
          break;
        } else if (d < record) {
          closestBranch = branch;
          record = d;
        }
      }

      if (closestBranch != null) {
        let newDir = Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    for (var i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }
    //console.log("leaves: ", this.leaves.length);

    for (var i = this.branches.length - 1; i >= 0; i--) {
      let branch = this.branches[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branches.push(branch.next());
        branch.reset();
      }
    }
  };

  this.show = function () {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }
    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }
  };
}

function Leaf(x, y) {
  this.pos = new Vector(x, y);
  this.reached = false;
  this.type = random(0, 5, true);

  this.show = function () {
    debug && svg.circle(2).attr({ cx: this.pos.x, cy: this.pos.y }).fill("red");
  };

  this.draw = function (branch) {
    let size = map(scale, 20, 60, 2, 2);
    let gravity = Vector.add(branch.dir, new Vector(0, random(5, 9, true)));
    let heading = gravity.heading() * (180 / Math.PI);

    debug &&
      svg
        .circle(size * 2)
        .attr({ cx: branch.pos.x, cy: branch.pos.y + size })
        .fill("blue");
    // .transform({
    //   rotate: heading,
    //   origin: [branch.pos.x, branch.pos.y + size],
    // });

    let bunch = new paper.Path.Circle({
      center: [branch.pos.x, branch.pos.y + random(0, 5)],
      radius: 10,
    });

    bunch.flatten(0.5);

    if (random(0, branch.depth) > 40) {
      bunch.segments.forEach((item, i) => {
        let a = new paper.Point(branch.pos.x, branch.pos.y);
        let b = new paper.Point(
          item.point.x + random(-1, 1),
          item.point.y + random(-1, 1)
        );
        let handle = new paper.Point(Math.cos(heading), Math.sin(heading));
        let curve = new paper.Curve(a, handle, handle, b);
        let path = new paper.Path([curve.segment1, curve.segment2]);
        svg
          .path(path.pathData)
          .fill("none")
          .stroke({ width: 1, color: random(palette.colorsCSS) });
      });
    }
  };
}

function Branch(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = random(5, 10);
  this.depth = parent != null ? parent.depth + 1 : 0;

  this.reset = function () {
    this.dir = this.origDir.copy();
    this.count = 0;
  };

  this.next = function () {
    let nextDir = Vector.mult(this.dir, this.len);
    let nextPos = Vector.add(this.pos, nextDir);
    let chaosPos = Vector.add(
      nextPos,
      new Vector(random(-1, 1, true), random(-4, -3, true))
    );
    //console.log(this.pos, this.dir, nextPos);
    let nextBranch = new Branch(this, chaosPos, this.dir.copy());
    return nextBranch;
  };

  this.show = function () {
    // console.log("branch show", this);
    if (parent != null) {
      //console.log(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      svg
        .line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
        .stroke({
          width: Math.max(1, 12 - this.depth * 0.3),
          color: palette.colorsCSS[1],
          linecap: this.depth === 1 ? "square" : "round",
        });
    }
  };
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function chaikin(shape, ratio, iteration) {
  if (iteration === 0) {
    return shape;
  }
  let nextShape = new paper.Path({
    segments: [shape.firstSegment, shape.lastSegment],
  });

  shape.curves.forEach((curve, i) => {
    // console.log(curve, curve.next);

    if (curve.next) {
      let offset = shape.getOffsetOf(curve.point2);
      let a = shape.getPointAt(
        offset - distance(curve.point1, curve.point2) * ratio
      );
      let b = shape.getPointAt(
        offset + distance(curve.next.point1, curve.next.point2) * ratio
      );

      // console.log(a, b);
      nextShape.insertSegments(-1, [a, b]);

      if (debug) {
        svg
          .line([
            [a.x, a.y],
            [b.x, b.y],
          ])
          .fill("none")
          .stroke({ color: "teal", width: 1 });
      }
    }
  });

  return iteration > 1
    ? chaikin(nextShape, ratio, iteration - 1, debug)
    : nextShape;
}
