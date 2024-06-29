import { el } from "redom";
import { Toggle } from "./toggle"

export class Layer {
  constructor(layer) {
    this.el = el("li", [
      el("span.layer-grab", layer.name),
      this.controls = [
        new Toggle({
          id: "toggle-layer-pause",
          value: layer.name,
          icon: { on: "pencil-simple", off: "arrow-down" }
        }),
        new Toggle({
          id: "toggle-layer-skip",
          value: layer.name,
          checked: true,
          icon: { on: "eye", off: "eye-slash" }
        })
      ]
    ])
  }
};