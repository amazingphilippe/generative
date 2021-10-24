import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
  pointsInPath
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

const svg = SVG(".canvas");

const btn = document.querySelector("button")
btn.addEventListener("click", () => {
  generate();
})
document.addEventListener('keyup', (e) => {
  if (e.code === "Space") {
    generate();
  }
});


const {width, height} = svg.viewbox();

const numStripes = 8;

const stripeWidth = width / numStripes;

function generate() {
  svg.clear();
  const colors = ["eec643","141414","eef0f2","0d21a1","011638"];

  for (let i = 0; i < width; i += stripeWidth) {
    const diceRoll = Math.floor(Math.random() * colors.length);
    const color = colors[diceRoll];

    svg.rect(stripeWidth, height).x(i).y(0).fill(`#${color}`).stroke("#fff")
  }

}
generate();
