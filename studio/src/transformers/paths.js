/** Utilities for working with paths
 * GETLAYERS
 * - takes in a paper.js layer
 * - gets paths
 *
 * EXPANDDASHED
 * - takes in a paper.js path
 */

import { toRaw } from 'vue'
import paper from 'paper'

const toolPalette = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
]

export function transformForPlot(artwork, options) {
  let paths = getPaths(artwork)

  // 1. Expand dashed paths
  expandDashed(paths)

  paths = getPaths(artwork)
  // 2. Flatten curves
  expandCurves(paths)
  // 3. Colorize paths
  colorizePaths(paths, options)
}

export function updatePathColors(artwork, options) {
  const paths = getPaths(artwork)
  colorizePaths(paths, options)
}

// INTERNAL UTILS

function getPaths(layer) {
  return layer
    .getItems({ recursive: true, class: paper.Path })
    .filter((p) => p.segments.length > 0)
    .filter((p) => p.parent.visible)
    .filter((p) => p.hasStroke || p.hasFill)
}

function expandDashed(paths) {
  /**
   * Deal with dash-array
   * Start by filtering paths with dasharrays
   * For each, recursively split paths at each dash and gap
   * Discard gap paths
   * path ───── path ─────► isGap?
       └────── split ───── path ...
                  └────── split ...
   */
  let dashArrayPaths = paths.filter((p) => p.dashArray.length > 0)

  dashArrayPaths.forEach((path) => {
    let dash = 0
    let dashArrayLength = path.dashArray.length
    let i = 0
    let len = path.length

    while (dash < len) {
      let currentDashLength = path.dashArray[i % dashArrayLength]
      let isGap = i % 2 === 1
      let split = path.splitAt(currentDashLength)

      if (isGap) {
        path.remove()
      }

      path = split

      // set path to the remainder given by splitAt, so that we can continue expanding
      dash += currentDashLength
      i++
    }
  })
}

function expandCurves(paths) {
  paths.forEach((path, i) => {
    // GCODE needs flat curves.
    // Flatten curves (0.25)
    path.flatten()
    // Remove fill color
    path.fillColor = null
    // Uniform stroke color and width
    path.strokeWidth = 1
    // Make paths visible, they should be visible?
    path.visible = true
    // Clear the dash-array, GCODE can't handle that shit.
    path.dashArray = []
  })
}

function colorizePaths(paths, { layers, viewbox }) {
  let viewBoxBounds = new paper.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(viewbox.width, viewbox.height),
  )

  paths.forEach((path, i) => {
    // Set tool color for path
    let tool = 0
    if (path.parent.name !== null) {
      tool = layers.find((layer) => layer.name === path.parent.name).tool
    }
    console.log('tool:', Number(tool))
    path.strokeColor = toolPalette[tool % toolPalette.length]
    // Deal with bounds
    if (!viewBoxBounds.contains(path.bounds)) {
      // Mark paths that are out of bounds
      path.strokeColor = '#D22'
      // Get path bounds and combine with current project view bounds
      // let pathBounds = new paper.Path.Rectangle(path.bounds)
      // Update viewbox offset for later
      // viewboxOffset.x = Math.min(viewboxOffset.x, pathBounds.bounds.x)
      // viewboxOffset.y = Math.min(viewboxOffset.y, pathBounds.bounds.y)
      // Get current view bounds
      // let currentViewBounds = new paper.Path.Rectangle(viewbox.bounds)
      // Unite with current path bounds
      // let unite = currentViewBounds.unite(pathBounds)
      // Set united bounds as project view size
      // viewboxBounds = unite.bounds
      // console.log(viewboxBounds);
      // Set layer position from project view center
      // paper.project.activeLayer.position.x = viewboxBounds.center.x
      // paper.project.activeLayer.position.y = viewboxBounds.center.y
      // pathBounds.remove()
      // currentViewBounds.remove()
      // unite.remove()
      // pathBounds.strokeColor = "#F82";
      // uniteBounds.strokeColor = "#2D2";
      // currentViewBounds.strokeColor = "#D88";
      // unite.strokeColor = "#F8F";
    }
  })
}
