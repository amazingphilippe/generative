import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "@georgedoescode/generative-utils";

import fractalNoise from "fractal-noise";
import { makeNoise2D } from "open-simplex-noise";

import chroma from "chroma-js";

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

const palette = ["b39c4d", "768948", "607744", "34623f", "1e2f23"];
const bg = '242325';

const { width, height } = svg.viewbox();
const rez = 10;

let cols, rows;

cols = 1 + width / rez;
rows = 1 + height / rez;

//-----------------------------------------

function generate() {
  svg.clear();
  let noise = fractalNoise.makeRectangle(
    cols,
    rows,
    makeNoise2D(random(0, 350, true)),
    { frequency: 0.06, octaves: 16 }
  );
  let field = [];
  //console.log(noise);

  for (var i = 0; i < cols; i++) {
    let k = [];
    for (var j = 0; j < rows; j++) {
      k.push(noise[i][j]);
    }
    field.push(k);
  }

  // for (var i = 0; i < cols; i++) {
  //   for (var j = 0; j < rows; j++) {
  //     svg
  //       .rect(rez + 1,rez + 1)
  //       .attr({ x: i * rez, y: j * rez })
  //       .fill(chroma.hsl(353, 0.28, map(field[i][j], -1, 1, 0.30, 0.40)).hex());
  //   }
  // }
  for (var i = 0; i < cols - 1; i++) {
    for (var j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;
      var a = { x: x + rez * 0.5, y: y };
      var b = { x: x + rez, y: y + rez * 0.5 };
      var c = { x: x + rez * 0.5, y: y + rez };
      var d = { x: x, y: y + rez * 0.5 };
      let state = getState(
        Math.ceil(field[i][j]),
        Math.ceil(field[i + 1][j]),
        Math.ceil(field[i + 1][j + 1]),
        Math.ceil(field[i][j + 1])
      );
      switch (state) {
        case 1:
        case 14:
          line(c, d);
          break;
        case 2:
        case 13:
          line(b, c);
          break;
        case 3:
        case 12:
          line(b, d);
          break;
        case 4:
        case 11:
          line(b, a);
          break;
        case 5:
          line(a, d);
          line(b, c);
          break;
        case 6:
        case 9:
          line(a, c);
          break;
        case 7:
        case 8:
          line(a, d);
          break;
        case 10:
          line(c, d);
          line(a, b);
          break;
        default:
      }
    }
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function line(p1, p2) {
  svg
    .line(p1.x, p1.y, p2.x, p2.y)
    .stroke({
      width: random(70, 90, true),
      color: chroma.mix(bg, chroma(random(palette)), 0.2, 'lab').saturate(random(0.2, 2)),
    }).transform({
      rotate: random(-10, 10)
    });
  svg
    .line(p1.x, p1.y, p2.x, p2.y)
    .stroke({
      width: random(50, 70, true),
      color: chroma.mix(bg, chroma(random(palette)), 0.4, 'lab').saturate(random(0.2, 2.5)),
    }).transform({
      rotate: random(-10, 10)
    });
  svg
    .line(p1.x, p1.y, p2.x, p2.y)
    .stroke({
      width: random(30, 50, true),
      color: chroma.mix(bg, chroma(random(palette)), 0.6, 'lab').saturate(random(0.2, 3)),
    }).transform({
      rotate: random(-10, 10)
    });
  svg
    .line(p1.x, p1.y, p2.x, p2.y)
    .stroke({
      width: random(10, 30, true),
      color: chroma.mix(bg, chroma(random(palette)), 0.8, 'lab').saturate(random(0.2, 3)),
    }).transform({
      rotate: random(-10, 10)
    });
}

function pole() {
  let pole = random(0, 1) > 0.5 ? "+" : "-";
  return pole;
}
generate();
