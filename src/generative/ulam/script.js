import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import chroma from "https://cdn.skypack.dev/chroma-js";

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

const palette = ["#8C1C13", "#FFD400", "#34623F", "#2C497F"];
const { width, height } = svg.viewbox();

const stepSize = 3;
const cols = width / stepSize;
const rows = height / stepSize;
const totalSteps = cols * rows;

//-----------------------------------------

function generate() {
  svg.clear();

  let x, y, px, py;
  let turn = 1;
  let step = 1;
  let state = 0;

  x = width / 2;
  y = width / 2;

  let ulamPoints = [];
  let randomPoints = [];

  for (var i = 1; i < totalSteps; i++) {
    // If prime draw circle
    if (isPrime(i)) {
      //svg.circle(5).attr({ cx: x, cy: y }).fill("#fff").stroke({ width: 1, color: "#000" });
      ulamPoints.push({ x, y });
    }

    // Prime number theorem: https://www.thoughtco.com/probability-of-randomly-choosing-prime-number-3126592
    if (random(0, 1) < 1 / Math.log(i)) {
      //svg.circle(3).attr({ cx: x, cy: y }).fill("#f00");
      randomPoints.push({ x, y });
    }

    //svg.line(x, y, px, py).stroke({ width: 1, color: "#aaa" });
    px = x;
    py = y;

    // Move according to state
    switch (state) {
      case 0:
        x += stepSize;
        break;
      case 1:
        y -= stepSize;
        break;
      case 2:
        x -= stepSize;
        break;
      case 3:
        y += stepSize;
        break;
    }

    // Change state
    if (i % step == 0) {
      state = (state + 1) % 4;
      turn++;
      if (turn % 2 == 0) {
        step++;
      }
    }
  }

  console.log(ulamPoints, randomPoints);
  svg
    .path(spline(ulamPoints,80))
    .fill("none")
    .css("mix-blend-mode", "multiply")
    .stroke({
      width: 1,
      color: chroma(random(palette)).saturate(random(-2, 2)),
    });
  svg
    .path(spline(randomPoints,80))
    .fill("none")
    .css("mix-blend-mode", "multiply")
    .stroke({
      width: 1,
      color: chroma(random(palette)).saturate(random(-2, 2)),
    });

  for (var i = 0; i < Math.min(ulamPoints.length, randomPoints.length); i++) {
    // svg
    //   .line(
    //     ulamPoints[i].x,
    //     ulamPoints[i].y,
    //     randomPoints[i].x,
    //     randomPoints[i].y
    //   )
    //   .css("mix-blend-mode", "multiply")
    //   .stroke({ width: 1, color: chroma(random(palette)).saturate(random(-2, 2)) });
  }
}
generate();

// Function to test if number is prime
function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= Math.sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}
