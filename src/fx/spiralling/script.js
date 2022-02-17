//https://github.com/svgdotjs/svg.js/blob/master/LICENSE.txt
//import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";

//http://paperjs.org/license/
import paper from "https://cdn.skypack.dev/paper";

//https://github.com/georgedoescode/generative-utils/blob/master/LICENSE
import {
  map,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

//https://github.com/gka/chroma.js/blob/main/LICENSE
import chroma from "https://cdn.skypack.dev/chroma-js";

//https://github.com/manticorp/quick-noise.js
import quickNoise from "https://cdn.skypack.dev/quick-perlin-noise-js";

//const svg = SVG(".canvas");

//const palette = ["#f2f6d0","#d0e1d4","#d9d2b6","#e4be9e"]; // 71697A 17301C
const palette = ["#819595", "#B1B6A6", "#d0e1d4", "#34623F", "#e4be9e"];
// const { width, height } = svg.viewbox();

paper.setup(document.getElementById("fx"));
const { width, height } = paper.view.size;
console.log(fxhash);

//-----------------------------------------

function generate() {
  // svg.clear();
  let bgColor = new paper.Path.Rectangle({
      point: [0, 0],
      size: [width, height],
      fillColor: '#E2E3DD'
  });

  let seed = quickNoise.create(() => fxrand());

  let phaseRand = fxrand();

  for (var i = 1; i < 180; i++) {
    let step = map(i, 1, 180, width / 400, 180 * (width / 400));
    let chaos = fxrand();
    let chaos2 = fxrand();

    let colorA = palette[Math.floor(map(chaos, 0, 1, 0, palette.length))];
    let colorB = palette[Math.floor(map(chaos2, 0, 1, 0, palette.length))];

    let previousPoint = false;
    let start = map(chaos, 0, 1, 0, Math.PI * 2);
    let fade = map(chaos, 0, 1, 0, start);

    let increment = map(i, 1, 180, 0.2, 0.05);

    // The idea for this loop derives from Dan Shiffman's Perlin noise loops coding challenge
    // https://thecodingtrain.com/CodingChallenges/136.1-polar-perlin-noise-loops.html
    for (let a = start; a < Math.PI * 2 + start; a += increment) {
      let chaos3 = fxrand();
      let phase, r;
      if (phaseRand > 0.9) {
        phase = Math.max(i, 90); // loop 3
        let noise = seed(Math.cos(a) + start, Math.sin(a) + start, phase);
        r = map(noise, -1, 1, step, Math.min(step, width / 4));
      } else if (phaseRand > 0.7) {
        phase = map(chaos3, 0, 1, 0, i); // loop 1
        let noise = seed(Math.cos(a) + start, Math.sin(a) + start, phase);
        r = map(noise, -1, 1, step, width / 4);
      } else {
        phase = map(chaos3, 0, 1, 90, Math.min(90, i)); // loop 2
        let noise = seed(Math.cos(a) + start, Math.sin(a) + start, phase);
        r = map(noise, -1, 1, step, width / 4);
      }

      let x = r * Math.cos(a) + width / 2;
      let y = r * Math.sin(a) + height / 2;

      if (previousPoint) {
        // svg
        //   .line(previousPoint.x, previousPoint.y, x, y)
        //   .css("mix-blend-mode", "multiply")
        //   .stroke({
        //     color: chroma.mix(colorA, colorB, a % fade, "lab"),
        //     width: 1,
        //   });
        //.stroke({ color: colorA, width: 1});
        let path = new paper.Path.Line({
          from: [previousPoint.x, previousPoint.y],
          to: [x, y],
          strokeColor: chroma.mix(colorA, colorB, a % fade, "lab").hex(),
          strokeWidth: width / 400,
        });
        path.blendMode = "multiply";
      }

      previousPoint = { x, y };
    }
  }
  fxpreview();
}
generate();

function getNoiseValue(cell, grid) {
  return grid;
}
