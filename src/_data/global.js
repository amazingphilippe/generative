const chroma = require("chroma-js");
// const { SVG } = require("@svgdotjs/svg.js");
const paper = require("paper");
const { random } = require("@georgedoescode/generative-utils");

function radial(r, a) {
  return new paper.Point(r * Math.cos(a), r * Math.sin(a));
}

module.exports = {
  random() {
    const segment = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${segment()}-${segment()}-${segment()}`;
  },
  seed() {
    return Math.random();
  },
  accent() {
    let accent = chroma.oklch(0.54, 0.09, Math.random() * 360).hex();
    let darker = chroma(accent).darken(1).hex();
    let lighter = chroma(accent).luminance(0.8).hex();
    return `
    --color-accent: ${accent};
    --color-accent-dark: ${darker};
    --color-accent-shade: ${lighter};
    `;
  },
  clic() {
    paper.setup([40, 40]);
    let paths = [];
    // let svg = SVG(".canvas");

    // let group = svg.group();
    let width = 40;
    let height = 40;

    let scale = width / 200;

    // let color = chroma.lch(60, 50, random(0, 360)).hex();

    //Features
    let pointy = random(0, 1, true);
    let density = random(3, 9, true) / 2;

    //Parameters
    let inside = random(0, 20) * scale;
    let outside = random(80, 100) * scale;
    let bloat = random(-50, 50) * scale;

    // console.log(inside, outside, bloat);

    let center = new paper.Point(width / 2, height / 2);

    for (var a = 0; a < Math.PI * 2; a += Math.PI / density) {
      let lobe = new paper.Path([
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
      ]);

      lobe.closePath();

      paths.push(lobe.pathData);

      if (inside > 0) {
        let fillIn = new paper.Path(
          radial(0, a).add(center),
          radial(inside, a).add(center),
          radial(inside, a + Math.PI / density).add(center),
          radial(0, a).add(center)
        );

        fillIn.closePath();

        paths.push(fillIn.pathData);
      }
    }
    return paths;
  },
};
