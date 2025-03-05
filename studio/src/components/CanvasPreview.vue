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
  travel: {
    type: Array,
    default: () => [],
  },
})

const studio = ref(null)
const { project, initializeProject, updateTravelLines } = usePaperProject()

watch(
  () => props.travel,
  (newTravel) => {
    if (newTravel && newTravel.length > 0) {
      updateTravelLines(newTravel)
    }
  },
  { deep: false },
)

onMounted(() => {
  // Initialize paper.js with the canvas

  initializeProject(studio.value)
  updateTravelLines(props.travel.value)

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
