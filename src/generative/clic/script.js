import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

// So powerful
import paper from "https://cdn.skypack.dev/paper";

import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

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

let palette;
const { width, height } = svg.viewbox();
paper.setup(document.getElementById("shadow"));

//-----------------------------------------

function generate() {
  svg.clear();

  let group = svg.group();

  let scale = width / 200;

  let color = chroma.lch(60, 50, random(0, 360)).hex();

  //Features
  let pointy = random(0, 1, true);
  let density = random(3, 9, true) / 2;

  //Parameters
  let inside = random(0, 20) * scale;
  let outside = random(80, 100) * scale;
  let bloat = random(-50, 50) * scale;

  console.log(inside, outside, bloat);

  let center = new paper.Point(width / 2, height / 2);

  for (var a = 0; a < Math.PI * 2; a += Math.PI / density) {
    let r = 180;

    let lobe = new paper.Path(
      // radial(0, a),
      [
        new paper.Segment(
          radial(inside, a).add(center),
          null,
          radial(-bloat, a).rotate(-90)
        ),
        new paper.Segment(
          radial(outside, a + Math.PI / density / 2).add(center),
          radial(bloat, a + Math.PI / density / 2)
            .rotate(90)
            .multiply(pointy),
          radial(bloat, a + Math.PI / density / 2)
            .rotate(-90)
            .multiply(pointy)
        ),
        new paper.Segment(
          radial(inside, a + Math.PI / density).add(center),
          radial(-bloat, a + Math.PI / density).rotate(90)
        ),
      ]
      // radial(0, a)
    );

    // lobe.simplify();

    let fillIn = new paper.Path(
      radial(0, a).add(center),
      radial(inside, a).add(center),
      // radial(outside, a + Math.PI / density / 2),
      radial(inside, a + Math.PI / density).add(center),
      radial(0, a).add(center)
    );

    // lobe.simplify();
    lobe.closePath();
    fillIn.closePath();

    group
      .path(lobe.pathData)
      .fill(color)
      .stroke({ width: 1 * scale, color: color, linejoin: "bevel" });
    inside > 0 &&
      group
        .path(fillIn.pathData)
        .fill(color)
        .stroke({ width: 1 * scale, color: color, linejoin: "bevel" });
  }

  group.animate().rotate(180, width / 2, height / 2);
}
generate();

function radial(r, a) {
  return new paper.Point(r * Math.cos(a), r * Math.sin(a));
}
