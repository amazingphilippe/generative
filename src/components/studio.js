import paper from "paper";
import { SVG } from "@svgdotjs/svg.js";
import { el, mount } from "redom";
import DragonDrop from "drag-on-drop";
import { Layer } from "./layer"


const JOINER = "\r\n";
const PEN_UP = "M3S18";
const PEN_DOWN = "M3S26";
const PEN_DELAY = 0.5;
const FEED_RATE = 3000;
const fix = (n) => n.toFixed(3); // Fix to X decimals

// For debugging tool changes
let toolPalette = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];

document.getElementById("pen-up").value = PEN_UP;
document.getElementById("pen-down").value = PEN_DOWN;
document.getElementById("feed-rate").value = FEED_RATE;


// Init paper project into the #studio canvas
paper.setup(document.getElementById("studio"));
document.getElementById("studio").style.cursor = "grab";

// Get svg from .canvas
let svg, svgString;

try {

  // Try finding canvas svg.
  svg = SVG(".canvas");
  svgString = svg.node.outerHTML;
  getGCODE();
  getSVG();

  makeLayers();

  // Observe .canvas, so that we can run this every time art is regenerated
  const elementToObserve = document.querySelector(".canvas");
  // create a new instance of `MutationObserver` named `observer`,
  // passing it a callback function
  const observer = new MutationObserver(() => {
    getGCODE();
    getSVG();
    console.log("Regenerated");
  });

  // call `observe()` on that MutationObserver instance,
  // passing it the element to observe, and the options object
  observer.observe(elementToObserve, { subtree: true, childList: true });

} catch (error) {
  console.log(error, "Studio mode. Waiting for file upload");
}

const fileInput = document.getElementById("svg-file")
const reader = new FileReader();

if (fileInput) {
  // Load file if it contains something. Like after a page refresh
  if (fileInput.files[0]) {
    loadFileToCanvas(fileInput.files[0])
  }

  // And also listen to changes
  fileInput.addEventListener('change', (e) => {
    let file = e.target.files[0];

    if (file) {
      loadFileToCanvas(file)
    }
  })
}

function loadFileToCanvas(file) {
  reader.onload = (file) => {
    svg = SVG(file.target.result)
    svgString = file.target.result;

    getGCODE();
    getSVG();

    makeLayers();
  }

  reader.readAsText(file)
}

function getLayers() {
  return paper.project.getItems({
    recursive: true,
    class: paper.Group,
    name: (name) => name !== null,
  });
}

function makeLayers() {
  let layers = getLayers()

  if (layers.length) {
    layers.forEach((layer) => {
      let list = new Layer(layer);
      mount(document.getElementById("layers"), list);
    });

    const dragonDrop = new DragonDrop(document.getElementById("layers"), {
      handle: ".layer-grab",
    });
  } else {
    document.getElementById("layers").parentNode.remove();
  }

  // Hookup the layer buttons
  let layerControls = document.querySelectorAll(".layer-control input");
  // console.log(layerControls);
  layerControls.forEach((control) => {
    console.log("clicked");
    control.addEventListener("change", () => {
      getGCODE({ layerControls: true });
      getSVG();
    });
  });
}




// Hookup output controls
const controls = document.querySelectorAll(".output-control input");

controls.forEach((control) => {
  control.addEventListener("change", () => {
    validateSettings();
    getGCODE();
    getSVG();
  })
})

function validateSettings() {
  // Clamp feed rate to [0,3000]
  let feed = document.getElementById("feed-rate");
  let value = parseInt(feed.value)
  let min = parseInt(feed.min)
  let max = parseInt(feed.max)
  feed.value = Math.min(Math.max(value, min), max);


}


// first pass at GCODE and SVG
function getSVG() {
  // Just export .canvas as-is
  // svgString = svg.node.outerHTML;
  let blob = new Blob([svgString]);
  let anchor = document.getElementById("getSVG");
  let filename = document.getElementById("filename").value;
  anchor.download = `${filename}.svg`;
  anchor.href = window.URL.createObjectURL(blob);
}

function getGCODE(layerControls = false) {
  const checkDuplicates = document.getElementById("check-duplicates").checked;
  // Begin GCODE array. Each item will be joined at the last step
  let gcode = ["G21; mm-mode"];
  // Update svg string from .canvas
  svgString = svg.node.outerHTML;
  // Clear studio canvas and reset size based on svg viewbox
  paper.project.clear();
  let { width, height } = svg.viewbox();

  // Import svg from string, expand shapes and apply transforms
  paper.project.importSVG(svgString, {
    expandShapes: true,
    applyMatrix: true,
  });

  // Create copy of viewbox, so we can keep track of the original size or the canvas
  let viewbox = new paper.Path.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(width, height)
  );
  let viewboxBounds = viewbox.bounds;
  // Remove from canvas, we know the bounds.
  viewbox.remove();
  // Same as below, but allows the studio to be resized.
  // paper.project.view.viewSize = new paper.Size(width, height);

  /**
   * Track offset of original viewbox
   * At the start, we want this to be the 0,0 coordinate from the top-left corner.
   * As we figure out what is overflowing, this point might shift in the negative values.
   * Which we need to calculate work area on the machine
   */
  let viewboxOffset = new paper.Point(0, 0);

  // Get all visible Paths, Shapes, Layers, etc.
  let paths = getPaths(paper);
  let duplicatePaths = [];
  let layerMeta = false;
  let layers = getLayers()
  console.log("layers made?", layerControls);
  if (layers && layerControls) {
    let tool = 0;
    layerMeta = layers.map((layer) => {
      let changeTool = document.getElementById(
        `toggle-layer-pause-${layer.name}`
      ).checked;

      if (changeTool) {
        tool++;
      }

      return {
        name: layer.name,
        ref: layer,
        tool: tool,
        plot: document.getElementById(`toggle-layer-skip-${layer.name}`)
          .checked,
      };
    });
  }
  console.log(layerMeta);

  /**
   * Deal with dash-array
   * Start by filtering paths with dasharrays
   * For each, recursively split paths at each dash and gap
   * Discard gap paths
   * path ───── path ─────► isGap?
       └────── split ───── path ...
                  └────── split ...
   */
  let dashArrayPaths = paths.filter((p) => p.dashArray.length > 0);

  dashArrayPaths.forEach((path) => {
    let dash = 0;
    let dashArrayLength = path.dashArray.length;
    let i = 0;
    let len = path.length;

    while (dash < len) {
      let currentDashLength = path.dashArray[i % dashArrayLength];
      let isGap = i % 2 === 1;
      let split = path.splitAt(currentDashLength);

      if (isGap) {
        path.remove();
      }

      path = split;

      // set path to the remainder given by splitAt, so that we can continue expanding
      dash += currentDashLength;
      i++;
    }
  });

  /** DASH ARRAY DONE */

  // Get all paths again, we've created more by dealing with dash-arrays
  paths = getPaths(paper);

  /**
   * Keep index of duplicate paths
   * This is a perfect example of garbage IN -> garbage OUT
   * Fix up your shit
   */
  if (checkDuplicates) {
    let c = 0;
    // I can get paths as an array of duplicate paths to each path. Needs to loop through each path squared. Yikes.
    let comparePaths = paths
      .map((path, i) => {
        let bounds = path.bounds;
        return paths
          .filter((p, j) => i !== j)
          .filter((p) => p.isInside(bounds))
          .filter((p) => p.compare(path));
      })
      .filter((dup) => dup.length > 0);

    console.log(`compared ${c} paths`);

    // Then probably you want to do MORE filtering to keep one of each duplicate paths.
  }

  // Convert paper.Paths to svg paths.
  // This steps preps the paths, and resizes the viewbox to create a work area for the machine
  paths.forEach((path, i) => {
    // Set tool color for path
    let tool = 0;
    // If this finds a layer within the path's parent, then tool will be set to the layer's setting, otherwise stays 0
    if (layerMeta && path.parent.name !== null) {
      tool = layerMeta.find((layer) => layer.name === path.parent.name).tool;
    }
    // GCODE needs flat curves.
    // Flatten curves (0.25)
    path.flatten();
    // Remove fill color
    path.fillColor = null;
    // Uniform stroke color and width
    path.strokeColor = toolPalette[tool % toolPalette.length];
    path.strokeWidth = 1;
    // Make paths visible, they should be visible?
    path.visible = true;
    // Clear the dash-array, GCODE can't handle that shit.
    path.dashArray = [];

    // Deal with bounds
    if (!path.isInside(viewboxBounds)) {
      // Mark paths that are out of bounds
      path.strokeColor = "#D22";

      // Get path bounds and combine with current project view bounds
      let pathBounds = new paper.Path.Rectangle(path.bounds);

      // Update viewbox offset for later
      viewboxOffset.x = Math.min(viewboxOffset.x, pathBounds.bounds.x);
      viewboxOffset.y = Math.min(viewboxOffset.y, pathBounds.bounds.y);

      // Get current view bounds
      let currentViewBounds = new paper.Path.Rectangle(viewboxBounds);
      // Unite with current path bounds
      let unite = currentViewBounds.unite(pathBounds);

      // Set united bounds as project view size
      viewboxBounds = unite.bounds;
      // console.log(viewboxBounds);

      // Set layer position from project view center
      paper.project.activeLayer.position.x = viewboxBounds.center.x;
      paper.project.activeLayer.position.y = viewboxBounds.center.y;

      pathBounds.remove();
      currentViewBounds.remove();
      unite.remove();

      // pathBounds.strokeColor = "#F82";
      // uniteBounds.strokeColor = "#2D2";
      // currentViewBounds.strokeColor = "#D88";
      // unite.strokeColor = "#F8F";
    }
  });

  // Resize to fit physical support (The size you want to print)
  viewbox = new paper.Path.Rectangle(viewboxBounds);

  let supportWidth = document.getElementById("support-width").value;
  let supportHeight = document.getElementById("support-height").value;
  let supportSize = new paper.Path.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(Number(supportWidth), Number(supportHeight))
  );

  let canvas = paper.project.activeLayer.getItem({ class: paper.Group });
  canvas.addChild(viewbox);
  canvas.fitBounds(supportSize.bounds);

  viewboxBounds = viewbox.bounds;
  viewbox.remove();
  supportSize.remove();

  /** GCODE STARTS. No debug clutter!! */

  // GCODE loop. Again through all paths.
  // Keep stats on skipped paths
  let d = 0,
    z = 0,
    tool = 0;
  // Get rid of hidden layers.
  if (layers && layerMeta) {
    layerMeta.forEach((layer) => {
      if (!layer.plot) {
        let l = paper.project.getItem({
          recursive: true,
          class: paper.Group,
          name: layer.name,
        });

        l.remove();
      }
    });
  }

  // Then get paths one last time
  paths = getPaths(paper);

  // Get expanded width and height, we will need later to invert Y coordinates
  ({ width, height } = viewboxBounds);

  // console.log(paths.map((p) => [p.strokeColor.toCSS(), p.bounds.x]));

  let lastKnownPosition = null;

  // Filter out Zero length segments
  // Filter out Duplicate paths, if you dare.
  paths
    .filter((p, i) => {
      let hasSegments = p.segments.length > 0;
      z += hasSegments ? 0 : 1;
      return hasSegments;
    })
    .filter((p, i) => {
      let hasNoDuplicates = !duplicatePaths.includes(i);
      d += hasNoDuplicates ? 0 : 1;
      return hasNoDuplicates;
    })
    .forEach((path, i) => {
      // Begin routine

      // Check for tool change, Stop if tool needs changing
      if (layerMeta && path.parent.name !== null) {
        let layer = layerMeta.find((layer) => layer.name === path.parent.name);

        if (tool !== layer.tool) {
          gcode.push(PEN_UP);
          gcode.push("G0 Z0; move to z-safe height");
          gcode.push(
            `M0; stop for tool (${layer.tool}) change (${layer.name})`
          );
          tool = layer.tool;
        }
      }

      // Track start and end points.
      let start = path.firstSegment.point;
      let end = path.lastSegment.point;

      if (
        lastKnownPosition !== null &&
        lastKnownPosition.getDistance(start) > 0.1
      ) {
        // Path starts in new location
        // Tool up/off
        gcode.push(PEN_UP);
        gcode.push(`G4 P${PEN_DELAY}; Tool OFF`);
        gcode.push("");

        // Tool is up, get ready to mode to next path
        gcode.push("G0 Z0; move to z-safe height");

        // Start the next routine as close as possible to the current known position.
        if (
          lastKnownPosition !== null &&
          lastKnownPosition.getDistance(end) <
          lastKnownPosition.getDistance(start)
        ) {
          path.reverse();
          start = path.firstSegment.point;
          end = path.lastSegment.point;
        }

        // Rapid move to start of path
        gcode.push(`G0 F1000 X${fix(start.x)} Y${fix(height - start.y)}`);

        // Tool on
        gcode.push(PEN_DOWN);
        gcode.push(`G4 P${PEN_DELAY}; Tool ON`);
        gcode.push("G1 F300 Z-0.1000");
      } else if (lastKnownPosition === null) {
        // First path

        // Rapid move to start of path
        gcode.push(`G0 F1000 X${fix(start.x)} Y${fix(height - start.y)}`);

        // Tool on
        gcode.push(PEN_DOWN);
        gcode.push(`G4 P${PEN_DELAY}; Tool ON (first)`);
        gcode.push("G1 F300 Z-0.1000");
      }

      // Else Continue with next path

      // for each segment of the path
      path.segments.forEach((segment) => {
        gcode.push(
          `G1 F${FEED_RATE} X${fix(segment.point.x)} Y${fix(
            height - segment.point.y
          )} Z-0.1000`
        );
      });

      // return to start segment if path is closed
      if (path.closed) {
        gcode.push(
          `G1 F${FEED_RATE} X${fix(path.segments[0].point.x)} Y${fix(
            height - path.segments[0].point.y
          )} Z-0.1000`
        );
        lastKnownPosition = start;
      } else {
        lastKnownPosition = end;
      }
    });

  console.log(`${z} zero length paths`);
  console.log(`${d} duplicate paths`);

  // Tool up, done!
  gcode.push(PEN_UP);
  gcode.push(`G4 P${PEN_DELAY}; Tool OFF. Job done. `);
  gcode.push("G0 Z0; retracting back to z-safe");

  // Create  blob
  let blob = new Blob([gcode.join(JOINER)]);
  let anchor = document.getElementById("getGCODE");
  let filename = document.getElementById("filename").value;
  anchor.download = `${filename}.gcode`;
  anchor.href = window.URL.createObjectURL(blob);

  console.log("GCODE blob updated");

  /** GCODE ENDS. Debug stuff below */

  // Unclip groups
  let groups = paper.project.getItems({ recursive: true, class: paper.Group });
  groups.map((group) => (group.clipped = false));

  // Show original viewbox on studio canvas
  ({ width, height } = svg.viewbox());
  let debugViewbox = new paper.Path.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(Number(supportWidth), Number(supportHeight))
  );
  debugViewbox.strokeColor = "#2AA";
  debugViewbox.dashArray = [3, 5];

  // Preview the workarea needed
  let debugWorkArea = new paper.Path.Rectangle(viewboxBounds);
  debugWorkArea.strokeColor = "#222";
  debugWorkArea.dashArray = [3, 5];

  // Add size labels
  let workWidthLabel = new paper.PointText(
    new paper.Point(debugWorkArea.bounds.center.x, debugWorkArea.bounds.y - 5)
  );
  workWidthLabel.justification = "center";
  workWidthLabel.fillColor = "#222";
  workWidthLabel.content = debugWorkArea.bounds.width.toFixed(2) + " mm";

  let workHeightLabel = new paper.PointText(
    new paper.Point(debugWorkArea.bounds.x - 5, debugWorkArea.bounds.center.y)
  );
  workHeightLabel.justification = "center";
  workHeightLabel.fillColor = "#222";
  workHeightLabel.rotation = -90;
  workHeightLabel.content = debugWorkArea.bounds.height.toFixed(2) + " mm";

  // Last, position suff in the middle of the sudio canvas
  paper.project.activeLayer.position = paper.project.view.center;
}

let tool = new paper.Tool();

tool.onMouseDrag = function (event) {
  let pan_offset = event.point.subtract(event.downPoint);
  document.getElementById("studio").style.cursor = "grabbing";
  paper.view.center = paper.view.center.subtract(pan_offset);
};

tool.onMouseUp = function () {
  document.getElementById("studio").style.cursor = "grab";
};

/** HELPERS */

function getPaths(paper) {
  return paper.project
    .getItems({ recursive: true, class: paper.Path })
    .filter((p) => p.segments.length > 0)
    .filter((p) => p.parent.visible)
    .filter((p) => p.hasStroke || p.hasFill);
}
