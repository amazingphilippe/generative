import { SVG } from "@svgdotjs/svg.js";
// import "https://cdn.jsdelivr.net/npm/@svgdotjs/svg.filter.js@3.0.8/dist/svg.filter.min.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import {
  random,
  map,
  spline,
} from "@georgedoescode/generative-utils";
import quickNoise from "quick-perlin-noise-js";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

const svg = SVG(".canvas");

let debug, mask;
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
paper.setup(document.getElementById("shadow"));
let palette;
const perlin = quickNoise.create(() => random(0, 1));

let feature;
let diagrammeLayer, endsLayer;

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  // mask = svg.group().attr({ width: "100%", height: "100%", x: "0%", y: "0%" });
  // mask.rect(width, height).fill("black");

  let bgLayer = svg.group().attr("id", "background");
  let maskLayer = svg.group().attr("id", "masking");
  let quadLayer = svg.group().attr("id", "quad")
  diagrammeLayer = svg.group().attr("id", "diagramme");
  endsLayer = svg.group().attr("id", "line-dots");

  feature = {
    maxIteration: random(20, 40, true),
    direction: random(-0.4, 0.2),
    curvatureType: random(1, 4, true),
    scaleType: random(1, 3, true),
    shape: random(["line", "rect"]),
    ends: random(["dot", "none"]),
  };
  console.log(feature);

  palette = new Poline({
    anchorColors: [
      [random(0, 360), 0.8, 0.1],
      [random(0, 360), 0.3, 0.8],
      [random(0, 360), 0.3, 0.8],
    ],
    positionFunctionX: positionFunctions.linearPosition,
    positionFunctionY: positionFunctions.cubicPosition,
    positionFunctionZ: positionFunctions.linearPosition,
    numPoints: 8,
  });
  // console.log(palette.colorsCSS);

  // Begin awesomeness

  let bg = random(palette.colorsCSS);
  bgLayer
    .rect(width, height)
    .fill(feature.shape === "rect" ? "var(--color-bg)" : bg);

  let padding = 20;

  // for (let padding = 9; padding <= 90; padding += 9) {
  let quad = {
    a: new paper.Point(random(0, padding), random(0, padding)),
    b: new paper.Point(random(width - padding, width), random(0, padding)),
    c: new paper.Point(
      random(width - padding, width),
      random(height - 20, height)
    ),
    d: new paper.Point(random(0, padding), random(height - 20, height)),
  };

  debug.circle(4).attr({ cx: quad.a.x, cy: quad.a.y });
  debug.circle(4).attr({ cx: quad.b.x, cy: quad.b.y });
  debug.circle(4).attr({ cx: quad.c.x, cy: quad.c.y });
  debug.circle(4).attr({ cx: quad.d.x, cy: quad.d.y });

  quadLayer
    .path(new paper.Path([quad.a, quad.b, quad.c, quad.d, quad.a]).pathData)
    .fill(
      feature.shape === "rect" && (feature.scaleType === 1 || 3)
        ? chroma(bg).brighten(0.3).hex()
        : "none"
    )
    .stroke({
      width: feature.shape === "line" ? 2 : 0,
      color: chroma(bg).brighten(0.3).hex(),
    });

  mask = new paper.Path([quad.a, quad.b, quad.c, quad.d, quad.a]);
  // mask
  //   .path(new paper.Path([quad.a, quad.b, quad.c, quad.d, quad.a]).pathData)
  //   .fill("white");

  generator(quad.a, quad.b.subtract(quad.a), 0);
  generator(quad.b, quad.c.subtract(quad.b), 0);
  generator(quad.c, quad.d.subtract(quad.c), 0);
  generator(quad.d, quad.a.subtract(quad.d), 0);

  for (let i = 0; i < feature.maxIteration; i++) {
    document.querySelectorAll(`.loop-${i}`).forEach((line) => {
      let x1 = Number.parseFloat(line.getAttribute("x1"));
      let x2 = Number.parseFloat(line.getAttribute("x2"));
      let y1 = Number.parseFloat(line.getAttribute("y1"));
      let y2 = Number.parseFloat(line.getAttribute("y2"));
      let a = new paper.Point(x1, y1);
      let b = new paper.Point(x2, y2);
      // console.log(a, b);

      generator(a, b.subtract(a), i + 1);
      line.remove();
    });
  }
  // }

  // let clip = svg.clip().attr({ viewbox: `0 0 ${width} ${height}` });
  // clip.path(mask.pathData);
  // mask.front();
  // svg.maskWith(mask);

  if (feature.shape === "rect") {
    let clip = new paper.Path.Rectangle(
      new paper.Point(-1, -1),
      new paper.Point(width + 1, height + 1)
    );
    clip = clip.subtract(mask);
    maskLayer.path(clip.pathData).fill("var(--color-bg)");
    debug.path(mask.pathData).fill("none").stroke({ width: 1, color: "cyan" });
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function generator(start, end, iteration) {
  // let end = new paper.Point(Math.sin(angle) * len, Math.cos(angle) * len);
  // svg
  //   .line(start.x, start.y, start.x + end.x * 0.05, start.y + end.y * 0.05)
  //   .fill("none")
  //   .stroke({
  //     width: 2,
  //     color:
  //       palette.colorsCSS[
  //         Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
  //       ],
  //   });

  let baseline = new paper.Path.Line(start, start.add(end));
  let normal = baseline.getNormalAt(0).multiply(feature.maxIteration / 3);
  let tangent = baseline.getTangentAt(0).multiply(feature.maxIteration / 3);

  let scale;

  switch (feature.scaleType) {
    case 1:
      scale = baseline.length > 2 ? map(iteration, 0, 15, 0.9, 0.8) : 1;
      break;
    case 2:
      scale = 1;
      break;
    case 3:
      scale = baseline.length > 2 ? 0.9 : 1;
      break;
    default:
      scale = 0.9;
      break;
  }

  let curvature;
  switch (feature.curvatureType) {
    case 1:
      curvature = perlin(Math.cos(iteration), 0, 0) + random(-1, 1, true);
      break;
    case 2:
      // curvature = 0;
      // This is the whacky one. Curvature is super high at the begining and tapers off when reaching max iteration
      curvature = random(
        (feature.maxIteration - 5) / (iteration + 1),
        (feature.maxIteration - 5) / (iteration + 1)
      );
      break;
    case 3:
      curvature = random(
        Math.min(0, map(iteration, 0, feature.maxIteration - 5, -0.5, 0)),
        Math.max(0, map(iteration, 0, feature.maxIteration - 5, 0.5, 0))
      );
      break;
    case 4:
      curvature = map(
        iteration,
        0,
        feature.maxIteration,
        0.1,
        feature.direction
      );
      break;
    default:
      curvature = 0;
      break;
  }

  if (iteration === feature.maxIteration) {
    curvature = 0;
  }

  // let curvature =
  // random(0, 1, true) === 0 ? random(1, 4, true) : random(-1, 0, true);

  // svg
  //   .line(
  //     start.x + end.x * 0.01,
  //     start.y + end.y * 0.01,
  //     start.x + end.x * 0.01 - a.multiply(curvature).x,
  //     start.y + end.y * 0.01 - a.multiply(curvature).y
  //   )
  //   .fill("none")
  //   .stroke({
  //     width: 2,
  //     color:
  //       palette.colorsCSS[
  //         Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
  //       ],
  //   });

  // svg
  //   .line(
  //     start.x + end.x * 0.99,
  //     start.y + end.y * 0.99,
  //     start.x + end.x * 0.99 - a.x,
  //     start.y + end.y * 0.99 - a.y
  //   )
  //   .fill("none")
  //   .stroke({
  //     width: 2,
  //     color:
  //       palette.colorsCSS[
  //         Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
  //       ],
  //   });

  // svg
  //   .line(
  //     start.x + end.x * 0.99,
  //     start.y + end.y * 0.99,
  //     start.x + end.x,
  //     start.y + end.y
  //   )
  //   .fill("none")
  //   .stroke({
  //     width: 2,
  //     color:
  //       palette.colorsCSS[
  //         Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
  //       ],
  //   });

  let fillShape = new paper.Path([
    start.add(end.multiply(1 - scale)),
    start.add(end.multiply(1 - scale)).subtract(normal.multiply(1 + curvature)),
    start.add(end.multiply(scale)).subtract(normal.multiply(1 - curvature)),
    start.add(end.multiply(scale)),
  ]);
  // console.log(fillShape);
  // let segments = [
  //   start.add(end.multiply(0.1)),
  //   start.add(end.multiply(0.1)).subtract(a.multiply(curvature)),
  //   start.add(end.multiply(0.9)).subtract(a),
  //   start.add(end.multiply(0.9)),
  // ];
  let color =
    palette.colorsCSS[
    Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
    ];

  switch (feature.shape) {
    case "line":
      color =
        palette.colorsCSS[
        Math.min(palette.colorsCSS.length - 1, random(0, iteration * 2, true))
        ];
      diagrammeLayer
        .line(
          start.x - normal.multiply(1 + curvature).x,
          start.y - normal.multiply(1 + curvature).y,
          start.x + end.x - normal.multiply(1 - curvature).x,
          start.y + end.y - normal.multiply(1 - curvature).y
        )
        .fill("none")
        .stroke({
          width: 2,
          color: color,
        });
      switch (feature.ends) {
        case "dot":
          endsLayer
            .circle(4)
            .attr({
              cx: start.x - normal.multiply(1 + curvature).x,
              cy: start.y - normal.multiply(1 + curvature).y,
            })
            .fill(color);
          endsLayer
            .circle(4)
            .attr({
              cx: start.x + end.x - normal.multiply(1 - curvature).x,
              cy: start.y + end.y - normal.multiply(1 - curvature).y,
            })
            .fill(color);
          break;
        case "none":
          break;

        default:
          break;
      }

      break;
    case "rect":
      diagrammeLayer
        .path(fillShape.pathData)
        .fill(color)
        .stroke({
          width: 0,
          color: color,
        })
        // .filterWith(function (add) {
        //   let blur = add.offset(0, 0).in(add.$sourceAlpha).gaussianBlur(30);
        //   add.blend(add.$source, blur);
        // });
        .css({
          filter: `drop-shadow(0 0 ${feature.scaleType === 2 || feature.curvatureType === 2 ? "30px" : 0
            } ${color})`,
        });
      mask = mask.unite(fillShape);
      // mask.path(fillShape.pathData).fill("white");
      break;

    default:
      break;
  }

  diagrammeLayer
    .line(
      start.x + end.x * (1 - scale) - normal.multiply(1 + curvature).x,
      start.y + end.y * (1 - scale) - normal.multiply(1 + curvature).y,
      start.x + end.x * scale - normal.multiply(1 - curvature).x,
      start.y + end.y * scale - normal.multiply(1 - curvature).y
    )
    .fill("none")
    .attr("class", `loop-${iteration}`);
}
