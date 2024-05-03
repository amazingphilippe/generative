import { SVG, Point } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  createVoronoiTessellation,
} from "@georgedoescode/generative-utils";

import paper from "paper";

import chroma from "chroma-js";

import { Vector } from "p5js-vector-standalone";

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

const leafPalette = ["#2D4739", "#2A3C35", "#445C5C"]
const fruitPalette = chroma.scale(['#EE964B', '#F95738']).mode('lch').colors(6)
// const fruitPalette = chroma.scale(['#6A3937','#3B0D11']).mode('lch').colors(6)
const palette = ["#F5F749", "#0C0F0A", "#dedee0"];
const sunPalette = chroma.scale(['#fdfeba', '#fdee6a']).mode('lch').colors(4);

const { width, height } = svg.viewbox();

const min_dist = 20;
const max_dist = 150;

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

let scale = random(10, 20, true);

function generate() {
  svg.clear();

  scale = random(10, 20, true);
  let tree = new Tree();

  tree.show();
  for (var i = 0; i < 100; i++) {
    if (tree.leaves == 0) {
      continue;
    }
    tree.grow();
  }

  tree.show();

  // If tree is short. It's a feature!
  if (tree.branches.length < 30) {
    sun();
  }
}
generate();

function Tree() {
  this.leaves = [];
  this.branches = [];

  // Leaves from voronoi tessellation
  const tessellation = createVoronoiTessellation({
    width: width,
    height: height,
    points: [...Array(scale)].map((i) => {
      return {
        x: random(100, width - 100),
        y: random(0, height - 100),
      };
    }),
    relaxIterations: 1,
  });

  tessellation.cells.forEach((c) => {
    this.leaves.push(new Leaf(c.centroid.x, c.centroid.y));
  });

  // Root of Tree
  let pos = new Vector(width - 50, height);
  let dir = new Vector(-1, -1);
  let root = new Branch(null, pos, dir);

  this.branches.push(root);

  let current = root;

  let found = false;
  let tries = 0;

  while (!found) {
    console.log("loop");
    for (let i = 0; i < this.leaves.length; i++) {
      let d = distance(current.pos, this.leaves[i].pos);
      if (d < 200) {
        //console.log("found");
        found = true;
      }
    }
    if (!found) {
      //console.log("not found", current.pos, current.parent);
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
          //console.log("reached");
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
    //svg.circle(2).attr({ cx: this.pos.x, cy: this.pos.y }).fill("red");
  };

  this.draw = function (branch) {
    //console.log(branch.depth);
    if (branch.depth > 30 && this.type - branch.count < 5) {
      // FRUIT
      let size = map(scale, 20, 60, 16, 8);
      let gravity = Vector.add(branch.dir, new Vector(0, random(5, 9, true)));
      let heading = gravity.heading() * (180 / Math.PI);

      let fruitThing = new paper.Path.Circle(new paper.Point(branch.pos.x, branch.pos.y + size), size);
      fruitThing.flatten();

      let fruitPoints = [];

      for (var i = 0; i < fruitThing.segments.length; i++) {
        fruitPoints[i] = [fruitThing.segments[i].point.x, fruitThing.segments[i].point.y]
      }

      fill(fruitPoints, 250, { color: fruitPalette, width: 0.5 }, chroma(random(fruitPalette)).brighten(2).hex(), (g) => {
        g.transform({
          rotate: heading,
          origin: [branch.pos.x, branch.pos.y + size],
        });
      });

      // svg
      //   .circle(size * 2)
      //   .attr({ cx: branch.pos.x, cy: branch.pos.y + size })
      //   .fill(chroma(random(fruit)).saturate(random(-1, 1)).hex())
      //   .transform({
      //     rotate: heading,
      //     origin: [branch.pos.x, branch.pos.y + size],
      //   });
      //stem
      svg
        .line(
          branch.pos.x,
          branch.pos.y,
          branch.pos.x + gravity.x,
          branch.pos.y + gravity.y
        )
        .stroke({ width: 0.5, color: palette[1] });
    } else {
      {
        //if (random(0, ) > branch.depth) {
        // LEAF
        let size = map(scale, 20, 60, 6, 4);
        let points = [];

        for (var a = 0; a < Math.PI * 2; a += Math.PI / 60) {
          let r = size;
          let sec_a = 1 / Math.cos(a);
          let folium;
          if (scale > 14) {
            folium =
              (3 * r * sec_a * Math.tan(a)) / (1 + Math.pow(Math.tan(a), 3)); // Folium
          } else {
            folium = (r / 2) * (4 * Math.cos(a) - 1 / Math.cos(a)); //Trisectrix of Maclaurin
          }
          let x = r * folium * Math.cos(a);
          let y = r * folium * Math.sin(a);

          if (x > 0 && y > 0) {
            points.push([x + branch.pos.x, y + branch.pos.y]);
          }
        }
        let gravity = Vector.add(branch.dir, new Vector(0, random(5, 7, true)));
        let heading, stemOffset;
        if (scale > 14) {
          heading = gravity.heading() * (180 / Math.PI) - 45;
          stemOffset = 45;
        } else {
          heading = gravity.heading() * (180 / Math.PI) - random(-35, 35);
          stemOffset = 12;
        }

        // svg
        //   .polyline(points)
        //   .stroke({ width: 1.2, color: "#efeceb" })
        //   .transform({
        //     rotate: heading,
        //     origin: [branch.pos.x, branch.pos.y],
        //   });
        // svg
        //   .polyline(points)
        //   .fill(palette[1])
        //   .transform({
        //     rotate: heading,
        //     origin: [branch.pos.x, branch.pos.y],
        //   });

        fill(points, 250, { color: leafPalette, width: 0.5 }, leafPalette[2], (g) => {
          g.transform({
            rotate: heading,
            origin: [branch.pos.x, branch.pos.y],
          });
        });

        //stem
        // svg
        //   .line(
        //     branch.pos.x,
        //     branch.pos.y,
        //     branch.pos.x + size * 2,
        //     branch.pos.y
        //   )
        //   .transform({
        //     rotate: heading + stemOffset,
        //     origin: [branch.pos.x, branch.pos.y],
        //   })
        //   .stroke({ width: 0.5, color: palette[2] });
      }
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
      new Vector(random(-2, 2, true), random(-4, 0, true))
    );
    //console.log(this.pos, this.dir, nextPos);
    let nextBranch = new Branch(this, chaosPos, this.dir.copy());
    return nextBranch;
  };

  this.show = function () {
    //console.log("branch show", this);
    if (parent != null) {
      //console.log(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      svg
        .line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
        .stroke({ width: 0.5, color: palette[1] });
    }
  };
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function fill(points, iterations, stroke, fill = false, callback = false) {
  let group = svg.group();

  if (fill) {
    group.polyline(points).fill(fill).stroke({ color: fill, width: 2 });
  }

  for (var i = 0; i < iterations; i++) {
    let a = random(points);
    let b = random(points);
    if (typeof stroke.color == "object") {
      group.line(a[0], a[1], b[0], b[1]).fill("none").stroke({ ...stroke, color: random(stroke.color) });
    } else {
      group.line(a[0], a[1], b[0], b[1]).fill("none").stroke(stroke);
    }

  }

  if (callback) {
    callback(group);
  }
}

function sun() {
  let points = [];
  let midCircle = [];
  for (var a = 0; a < Math.PI * 2; a += Math.PI / 60) {
    let r = 180;

    let x = r * Math.cos(a);
    let y = r * Math.sin(a);

    points.push([x + width / 2, y + height / 2]);

    x = random(-r, r);
    y = random(-r, r);

    let shine = { x: -120, y: -120 };

    let shineD = Math.sqrt(
      (x - shine.x) * (x - shine.x) + (y - shine.y) * (y - shine.y)
    );

    let d = Math.sqrt(x * x + y * y);

    if (d < r && shineD > r) {
      midCircle.push([x + width / 2, y + height / 2]);
    }
  }

  let group = svg.group()

  // points.push(points[0]);
  // let baseColor = chroma(random(palette)).brighten(2).hex();
  group.polyline(points).stroke({ color: sunPalette[2], width: 5 }).fill(sunPalette[0]);

  for (var i = 0; i < 500; i++) {
    let a = random(points);
    let b = random(midCircle);
    let c = random(points);
    let d = random(points);
    // group
    //   .line(a[0], a[1], b[0], b[1])
    //   .stroke({ color: sun[3], width: 1 })
    //   .css({ "mix-blend-mode": "multiply" })
    //   .fill("none");
    //
    // group
    //   .line(a[0], a[1], c[0], c[1])
    //   .stroke({ color: sunPalette[2], width: 1 })
    //   .css({ "mix-blend-mode": "multiply" })
    //   .fill("none");

    group
      .line(d[0], d[1], c[0], c[1])
      .stroke({ color: sunPalette[3], width: 1 })
      // .css({ "mix-blend-mode": "multiply" })
      .fill("none");

    group
      .polyline([a[0], a[1], b[0], b[1], c[0], c[1]])
      .stroke({ color: sunPalette[2], width: 1 })
      // .css({ "mix-blend-mode": "multiply" })
      .fill("none");

  }

  group.back()
}
