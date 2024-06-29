import { el, mount } from "redom";

export class Toggle {
  constructor({ id, value, checked, icon }) {
    this.el = el("label.layer-control.toggle", [
      this.label = el("span.sr"),
      this.control = el(`input`, {
        id: `${id}-${value}`,
        type: "checkbox",
        value: value,
        checked: checked,
      }),
      el(`i.ph-bold.ph-${icon.on}.on`),
      el(`i.ph-bold.ph-${icon.off}.off`),
    ])
  }
};