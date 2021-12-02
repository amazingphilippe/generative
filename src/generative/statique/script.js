import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
  pointsInPath,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

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
const resolution = 10;
const r = resolution;
const palette = ["#D36F0D", "#0F0E0A"];

function generate() {
  svg.clear();

  for (var i = 0; i < random(1, 3, true); i++) {
    let size = {
      x: random(2, width / r - 10, true),
      y: random(2, height / r - 10, true),
    };
    let move = {
      x: random(1, width / r - 5 - size.x, true),
      y: random(1, height / r - 5 - size.y, true),
    };
    svg
      .rect(size.x * r, size.y * r)
      .move(move.x * r, move.y * r)
      .fill(palette[random(0, palette.length - 1, true)]);
  }

  for (var i = 0; i < random(2, 5, true); i++) {
    //let start = { x: random(1, (width / r) - 1, true), y: random(1, (height / r) - 1, true) };
    let length = random(5, 8, true);

    let x, y;
    do {
      x = random(-5, 5, true);
      y = random(-5, 5, true);
    } while (x * x + y * y < 5);
    let move = { x: x + 5, y: y + 5 };

    if (random(0, 1) > 0.5) {
      svg
        .line(0, 0, 0, length * r)
        .move(move.x * r, move.y * r)
        .stroke({
          width: 5,
          color: palette[random(0, palette.length - 1, true)],
        });
    } else {
      svg
        .line(0, 0, length * r, 0)
        .move(move.x * r, move.y * r)
        .stroke({
          width: 5,
          color: palette[random(0, palette.length - 1, true)],
        });
    }
  }
}
generate();
