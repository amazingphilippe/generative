import { SVG } from "@svgdotjs/svg.js";
import { random } from "@georgedoescode/generative-utils"
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

const { width, height } = svg.viewbox();
const palette = ["#362310"];


//-----------------------------------------
function generate() {
  svg.clear();
  let color = "#B7CE63";

  for (var i = 0; i < 80; i++) {
    svg.polyline([[i * 10, 0], [i * 10, height], [(i * 10) + 10, random(10, height - 10, true)]]).fill(color);
    color = chroma(color).set('lch.h', `*${random(-2, 2)}`).hex();
    console.log(color);
  }
}
generate();
