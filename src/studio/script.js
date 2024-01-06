import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";

import paper from "https://cdn.skypack.dev/paper";

const svg = SVG(".canvas");

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  let input = document.getElementById("svg-input").value;
  console.log(input);
  svg.svg(input, true);
}
generate();
