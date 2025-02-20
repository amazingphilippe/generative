import paper from 'paper'
import { toRaw } from 'vue'

const JOINER = '\n'
const PEN_DELAY = 0.5
const FEED_RATE = 3000
const fix = (n) => n.toFixed(3) // Fix to X decimals

export function pathsToGCODE(layers, settings) {
  // Paths has
  // - No zero length paths
  // - No hidden paths
  // console.log('settings', settings)
  // Variabls to help generate "efficient" GCODE
  let currentTool = layers[0]?.tool
  // console.log('layers', layers)
  let lastKnownPosition = null
  let gcode = ['G21; mm-mode']
  let travel = []

  layers.forEach((layer) => {
    if (layer.tool !== currentTool) {
      gcode.push(settings.penUp)
      gcode.push('G0 Z0; move to z-safe height')
      gcode.push(`M0; stop for tool (${layer.tool}) change (${layer.name})`)
      currentTool = layer.tool
    }
    // Filter out zero paths with 0 segments
    // Filter out anything but items of className Path
    // console.log(layer)
    let paths = layer.data.children.filter((item) => item.className === 'Path')
    let pathsWithSegments = paths.filter((path) => path.segments.length > 0)
    pathsWithSegments.forEach((path, i) => {
      // console.log('path', i, path)
      // Track start and end points.
      let start = path.firstSegment.point
      let end = path.lastSegment.point

      if (lastKnownPosition !== null && lastKnownPosition.getDistance(start) > 0.1) {
        // Path starts in new location
        // Tool up/off
        gcode.push(settings.penUp)
        gcode.push(`G4 P${PEN_DELAY}; Tool OFF`)
        gcode.push('')

        // Tool is up, get ready to mode to next path
        gcode.push('G0 Z0; move to z-safe height')

        // Start the next routine as close as possible to the current known position.
        if (
          lastKnownPosition !== null &&
          lastKnownPosition.getDistance(end) < lastKnownPosition.getDistance(start)
        ) {
          path.reverse()
          start = path.firstSegment.point
          end = path.lastSegment.point
        }

        // Rapid move to start of path
        gcode.push(`G0 F1000 X${fix(start.x)} Y${fix(settings.height - start.y)}`)
        travel.push(
          new paper.Path.Line(
            new paper.Point(toRaw(lastKnownPosition)),
            new paper.Point(toRaw(start)),
          ),
        )
        // Tool on
        gcode.push(settings.penDown)
        gcode.push(`G4 P${PEN_DELAY}; Tool ON`)
        gcode.push('G1 F300 Z-0.1000')
      } else if (lastKnownPosition === null) {
        // First path

        // Rapid move to start of path
        gcode.push(`G0 F1000 X${fix(start.x)} Y${fix(settings.height - start.y)}`)
        travel.push(
          new paper.Path.Line(
            new paper.Point(toRaw(lastKnownPosition)),
            new paper.Point(toRaw(start)),
          ),
        )

        // Tool on
        gcode.push(settings.penDown)
        gcode.push(`G4 P${PEN_DELAY}; Tool ON (first)`)
        gcode.push('G1 F300 Z-0.1000')
      }

      // for each segment of the path
      path.segments.forEach((segment) => {
        gcode.push(
          `G1 F${FEED_RATE} X${fix(segment.point.x)} Y${fix(
            settings.height - segment.point.y,
          )} Z-0.1000`,
        )
      })

      // return to start segment if path is closed
      if (path.closed) {
        gcode.push(
          `G1 F${FEED_RATE} X${fix(path.segments[0].point.x)} Y${fix(
            settings.height - path.segments[0].point.y,
          )} Z-0.1000`,
        )
        lastKnownPosition = start
      } else {
        lastKnownPosition = end
      }

      // Tool up, done!
      gcode.push(settings.penUp)
      gcode.push(`G4 P${PEN_DELAY}; Tool OFF. Job done. `)
      gcode.push('G0 Z0; retracting back to z-safe')
    })
  })

  //console.log([gcode.join(JOINER)])

  return { gcode: gcode.join(JOINER), travel }
}

function drawLoop(segments, settings) {}

function moveTo(point) {}
