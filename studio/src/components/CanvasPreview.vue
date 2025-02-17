<template>
  <canvas id="studio" ref="studio"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
import paper from 'paper'
import { usePaperProject } from '../composables/usePaperProject'

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
  viewbox: {
    type: Object,
    required: true,
  },
  svgString: {
    type: String,
    required: true,
  },
})

const studio = ref(null)
const { project, initializeProject } = usePaperProject()
let originalBox
let workAreaBox
let workWidthLabel
let workHeightLabel

function updateViewbox() {
  //console.log(project.value)
  // Remove previous viewbox if it exists
  // originalBox?.remove()
  // workAreaBox?.remove()
  // workWidthLabel?.remove()
  // workHeightLabel?.remove()
  // // Create new elements within the correct project scope
  // project.value.uiLayer.activate() // Make sure we're in the right project scope
  // originalBox = new paper.Path.Rectangle(
  //   new paper.Point(0, 0),
  //   new paper.Size(props.viewbox.width, props.viewbox.height),
  // )
  // originalBox.strokeColor = '#222'
  // originalBox.dashArray = [3, 5]
  // workAreaBox = new paper.Path.Rectangle(
  //   new paper.Point(0, 0),
  //   new paper.Size(props.settings.width, props.settings.height),
  // )
  // workAreaBox.strokeColor = '#2AA'
  // workAreaBox.dashArray = [3, 5]
  // originalBox.fitBounds(workAreaBox.bounds)
  // workWidthLabel = new paper.PointText(
  //   new paper.Point(workAreaBox.bounds.center.x, workAreaBox.bounds.y - 5),
  // )
  // workWidthLabel.justification = 'center'
  // workWidthLabel.fillColor = '#222'
  // workWidthLabel.content = workAreaBox.bounds.width.toFixed(2) + ' mm'
  // workHeightLabel = new paper.PointText(
  //   new paper.Point(workAreaBox.bounds.x - 5, workAreaBox.bounds.center.y),
  // )
  // workHeightLabel.justification = 'center'
  // workHeightLabel.fillColor = '#222'
  // workHeightLabel.rotation = -90
  // workHeightLabel.content = workAreaBox.bounds.height.toFixed(2) + ' mm'
  // if (paper.project.activeLayer) {
  //   paper.project.activeLayer.position = paper.project.view.center
  // }
}

// Watch for changes in viewbox
watch(
  [() => props.viewbox, () => props.settings],
  () => {
    if (project.value) {
      updateViewbox()
      // Center the view after resize
      // if (paper.project.activeLayer) {
      //   paper.project.activeLayer.position = paper.project.view.center
      // }
    }
  },
  { deep: true },
)

onMounted(() => {
  // Initialize paper.js with the canvas

  initializeProject(studio.value)

  // Initial setup of viewbox and elements
  updateViewbox()

  project.value.activate()

  // Paper tools
  let tool = new paper.Tool()
  let zoomFactors = [0.67, 1, 1.5, 2.25]
  let zoomIndex = 2 // Start at 1.5x zoom
  let isDragging = false

  tool.onMouseDown = function () {
    isDragging = false
  }

  tool.onMouseDrag = function (event) {
    isDragging = true
    let pan_offset = event.point.subtract(event.downPoint)
    document.getElementById('studio').style.cursor = 'grabbing'
    paper.view.center = paper.view.center.subtract(pan_offset)
  }

  tool.onMouseUp = function (event) {
    document.getElementById('studio').style.cursor = 'grab'

    if (!isDragging) {
      // 1. First apply the zoom
      paper.view.zoom = zoomFactors[zoomIndex]
      zoomIndex = (zoomIndex + 1) % zoomFactors.length

      // 2. Then move the view center to where the mouse is
      paper.view.center = event.point
    }
  }
})
</script>

<style scoped>
#studio {
  cursor: grab;
}
</style>
