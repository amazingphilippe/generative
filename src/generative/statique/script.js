import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  createVoronoiTessellation,
  random,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

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

const width = 200;
const height = 200;

const padding = 20;
const r = padding;

const palette = ["#D36F0D", "#0F1E0A"];

function generate() {
  svg.clear();

  const tessellation = createVoronoiTessellation({
    width: width - r * 2,
    height: height - r * 2,
    points: [...Array(9)].map(() => {
      return {
        x: random(r, width - r, true),
        y: random(r, height - r, true),
      };
    }),
    relaxIterations: 2,
  });

  const g = svg.group().transform({ translateX: r, translateY: r });

  const triangle = tessellation.cells.splice(
    random(tessellation),
    random(0, 1, true)
  );
  const lines = tessellation.cells.splice(0, 6);

  console.log(triangle);

  tessellation.cells.forEach((c) => {
    let size = {
      x: random(c.innerCircleRadius, c.innerCircleRadius * 4, true),
      y: random(c.innerCircleRadius, c.innerCircleRadius * 4, true),
    };

    g.rect(size.x, size.y)
      //.circle(random(c.innerCircleRadius / 2, c.innerCircleRadius))
      .x(c.centroid.x - size.x / 2)
      .y(c.centroid.y - size.y / 2)
      .fill(random(palette));
  });

  lines.forEach((c) => {
    let direction;

    if (random(0, 1) > 0.5) {
      direction = {
        dx: 0,
        dy: random(c.innerCircleRadius * 2, c.innerCircleRadius * 3, true),
      };
    } else {
      direction = {
        dy: 0,
        dx: random(c.innerCircleRadius * 2, c.innerCircleRadius * 2.5, true),
      };
    }

    g.line(0, 0, direction.dx, direction.dy)
      .move(c.centroid.x, c.centroid.y)
      .stroke({
        width: 5,
        color: random(palette),
      });
  });

  triangle.forEach((c) => {
    let size = random(c.innerCircleRadius, c.innerCircleRadius * 4, true);

    g.path(`M0 0 V${size} H${size} Z`)
      .transform({translateX: c.centroid.x - size / 2, translateY: c.centroid.y - size / 2})
      .fill(random(palette));
  });
}
generate();
