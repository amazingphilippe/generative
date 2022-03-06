import { SVG, Point } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  createVoronoiTessellation,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import paper from "https://cdn.skypack.dev/paper";

import chroma from "https://cdn.skypack.dev/chroma-js";

import { Vector } from "https://cdn.skypack.dev/p5js-vector-standalone";

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

const palette = ["000"];
const { width, height } = svg.viewbox();

const min_dist = 20;
const max_dist = 150;

paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  svg.clear();

  let tree = new Tree();

  tree.show();
  for (var i = 0; i < 1000; i++) {
    tree.grow();
  }
  tree.show();
}
generate();

function Tree() {
  this.leaves = [];
  this.branches = [];

  // Leaves from voronoi tessellation
  const tessellation = createVoronoiTessellation({
    width: width,
    height: height,
    points: [...Array(12)].map((i) => {
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

  this.show = function () {
    //svg.circle(2).attr({ cx: this.pos.x, cy: this.pos.y }).fill("red");
  };

  this.draw = function (branch) {
    let size = random(5,7);
    let points = [];

    for (var a = 0; a < Math.PI * 2; a += Math.PI / 60) {
      let r = size;
      let sec_a = (1/Math.cos(a));
      let folium;
      folium = (r / 2) * ((4 * Math.cos(a)) - (1/Math.cos(a))); //Trisectrix of Maclaurin
      //folium = (3 * r * sec_a * Math.tan(a)) / (1 + Math.pow(Math.tan(a), 3)) //Folium
      let x = r * folium * Math.cos(a);
      let y = r * folium * Math.sin(a);

      if (x > 0 && y < 0) {
        points.push([
          x + branch.pos.x,
          y + branch.pos.y,
        ]);
      }
    }

    points.push(points[0]);
    let heading = branch.dir.heading() * (180 / Math.PI) - 35;

    svg
      .polyline(points)
      .stroke({ width: 1.2, color: "#efeceb" })
      .transform({
        rotate: heading,
        origin: [branch.pos.x, branch.pos.y]
      });
    svg
      .polyline(points)
      .stroke({ width: 0.5, color: "black" })
      .transform({
        rotate: heading,
        origin: [branch.pos.x, branch.pos.y]
      });
  };
}

function Branch(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = random(5, 10);

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
        .stroke({ width: 0.5, color: `#000` });
    }
  };
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
