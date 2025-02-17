import { ref, toRaw } from 'vue'
import paper from 'paper'

const project = ref(null)
// Keep track of specific layers
const uiLayer = ref(null)
const artLayer = ref(null)

export function usePaperProject() {
  const initializeProject = (canvas) => {
    if (!project.value) {
      paper.setup(canvas)
      project.value = paper.project

      // Create and name our layers
      artLayer.value = new paper.Layer()
      artLayer.value.name = 'artwork'

      uiLayer.value = new paper.Layer()
      uiLayer.value.name = 'ui'

      // Activate the artwork layer by default
      artLayer.value.activate()
    }

    return project.value
  }

  const resizeCanvas = (width, height, viewbox) => {
    if (!project.value || !uiLayer.value || !artLayer.value) return

    uiLayer.value.activate()

    // Clear previous UI elements
    uiLayer.value.removeChildren()

    // Create temporary rectangle for original viewbox
    let canvasViewbox = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Size(viewbox.width, viewbox.height),
    )
    canvasViewbox.strokeColor = '#222'
    canvasViewbox.dashArray = [3, 5]
    uiLayer.value.addChild(canvasViewbox)

    // Create rectangle with target dimensions
    let supportSize = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Size(Number(width), Number(height)),
    )
    supportSize.strokeColor = '#2AA'
    supportSize.dashArray = [3, 5]
    uiLayer.value.addChild(supportSize)

    // Manipulate the viewbox to fit the support size
    //canvasViewbox.fitBounds(supportSize.bounds)

    // Get the artwork and fit it to the target size
    artLayer.value.activate()
    let artwork = artLayer.value.getItem({ class: paper.Group })
    if (artwork) {
      // Get the current scale
      canvasViewbox.fitBounds(supportSize.bounds)
      let scale = canvasViewbox.bounds.width / viewbox.width

      // Scale the artwork to fit the support size
      if (artwork.data.previousScale) {
        // Undo previous scale
        artwork.scale(1 / artwork.data.previousScale) // Reset to original size
      } else {
        console.log('No previous scale')
      }

      artwork.scale(scale) // Apply new absolute scale

      // Reposition artwork to proportional initial offset
      // 1. Get the new offset
      // 2. Multiply by the new scale
      // 3. Add the difference between the viewbox and the support size from the top left corner
      artwork.position = artwork.data.initialOffset
        .multiply(scale)
        .add(canvasViewbox.bounds.topLeft.subtract(supportSize.bounds.topLeft))

      // Store current scale and offset
      artwork.data.previousScale = scale
    }

    uiLayer.value.activate()
    // Add dimensions labels
    const widthLabel = new paper.PointText({
      point: new paper.Point(supportSize.bounds.center.x, supportSize.bounds.y - 5),
      content: width.toFixed(2) + ' mm',
      justification: 'center',
      fillColor: '#222',
    })
    uiLayer.value.addChild(widthLabel)

    const heightLabel = new paper.PointText({
      point: new paper.Point(supportSize.bounds.x - 5, supportSize.bounds.center.y),
      content: height.toFixed(2) + ' mm',
      justification: 'center',
      fillColor: '#222',
      rotation: -90,
    })
    uiLayer.value.addChild(heightLabel)

    // Center everything
    project.value.view.update()
  }

  const importArtwork = (svgString) => {
    return new Promise((resolve, reject) => {
      if (!project.value || !artLayer.value) {
        reject(new Error('Project or art layer not initialized'))
        return
      }
      // Activate artwork layer for import
      artLayer.value.activate()
      // Clear any existing artwork
      artLayer.value.removeChildren()

      project.value.importSVG(svgString, {
        expandShapes: true,
        applyMatrix: true,
        insert: true,
        onLoad: (item) => {
          // Store original offset in data
          item.data.initialOffset = item.bounds.center
          resolve(item)
        },
        onError: (error) => {
          reject(error)
        },
      })
    })
  }
  return {
    project,
    uiLayer,
    artLayer,
    initializeProject,
    resizeCanvas,
    importArtwork,
  }
}
