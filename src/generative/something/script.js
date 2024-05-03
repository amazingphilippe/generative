import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "@georgedoescode/generative-utils";

import chroma from "chroma-js";


import { setTemplates, sentence } from 'https://cdn.skypack.dev/txtgen';


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

const palette = ["000"];
const { width, height } = svg.viewbox();

const templates = [
  'sometimes {{a_noun}} becomes {{ an_adjective }} {{noun}} when the {{ nouns }} are {{ adjective }}',
  '{{ a_noun }} grows when {{ a_noun }} lets it become {{ adjective }}'
]

//-----------------------------------------

function generate() {
  svg.clear();
  setTemplates(templates)
  console.log(sentence());
}
generate();
