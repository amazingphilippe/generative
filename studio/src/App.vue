<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { SVG } from '@svgdotjs/svg.js'
import paper from 'paper'
import { usePaperProject } from './composables/usePaperProject.js'
import { getLayers } from './utils/layers.js'
import { transformForPlot, updatePathColors } from './transformers/paths.js'
import CanvasPreview from './components/CanvasPreview.vue'
import OutputControls from './components/OutputControls.vue'
import LayerControls from './components/LayerControls.vue'
import DownloadControls from './components/DownloadControls.vue'

// Data
let svgString = ref('')
let viewbox = ref({ width: 200, height: 200 })
let layers = ref([])
const { project, artLayer, initializeProject, resizeCanvas, importArtwork } = usePaperProject()

// Controls
let settings = ref({
  title: 'Untitled',
  width: 200,
  height: 200,
  penUp: 'M3S18',
  penDown: 'M3S26',
  feedRate: 3000,
})

// Machine travel preview
const travel = ref([])
const updateTravel = (lines) => {
  // console.log('Travel', lines)
  travel.value = lines
}

// Add a ref for the observer
const observer = ref(null)
// Add a flag to prevent duplicate initialization
const isInitialized = ref(false)

const updateSettings = (newSettings) => {
  settings.value = newSettings
}

const updateLayers = (newLayers) => {
  try {
    layers.value = newLayers
  } catch (error) {
    console.log("Couldn't update layers", error)
  }
}

// Watch for changes in settings dimensions
watch(
  () => [settings.value.width, settings.value.height],
  ([newWidth, newHeight]) => {
    if (project.value && newWidth && newHeight) {
      resizeCanvas(newWidth, newHeight, viewbox.value)
    }
  },
)

const importArtworkAndTransform = async (svgString) => {
  try {
    const artwork = await importArtwork(svgString)

    // Update layers before transform
    layers.value = getLayers(project.value)

    // Transform the artwork
    transformForPlot(artwork, { layers: layers.value, viewbox: viewbox.value })

    return artwork
  } catch (error) {
    console.log("Couldn't import artwork", error)
    throw error
  }
}

const handleCanvasChange = async () => {
  try {
    const svg = SVG('.canvas')
    // Set SVG and data
    svgString.value = svg.node.outerHTML
    viewbox.value = {
      width: svg.node.viewBox.baseVal.width,
      height: svg.node.viewBox.baseVal.height,
    }
    // Set default controls
    settings.value.width = svg.node.viewBox.baseVal.width
    settings.value.height = svg.node.viewBox.baseVal.height

    // Import SVG
    await importArtworkAndTransform(svgString.value)

    // Resize canvas after import
    resizeCanvas(settings.value.width, settings.value.height, viewbox.value)

    // Update layers after import
    // layers.value = getLayers(project.value)
  } catch (error) {
    console.log(error, 'Error updating canvas')
  }
}

onMounted(async () => {
  try {
    if (isInitialized.value) return

    // Get canvas for paper setup
    const canvas = document.getElementById('studio')
    if (!canvas) {
      throw new Error('Canvas element not found')
    }

    initializeProject(canvas)
    isInitialized.value = true

    // Set up the observer
    observer.value = new MutationObserver(() => {
      handleCanvasChange()
    })

    // Start observing the canvas
    observer.value.observe(document.querySelector('.canvas'), {
      childList: true,
      subtree: true,
    })

    // Set title from H1
    settings.value.title = document.querySelector('h1').textContent

    // Initial setup
    await handleCanvasChange()
  } catch (error) {
    console.log(error, 'Studio mode. Waiting for file upload')
  }
})

// Clean up the observer when component is unmounted
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
  isInitialized.value = false
})

// Watch for layer changes (visibility, tool)
watch(
  layers,
  (newLayers) => {
    if (project.value && artLayer.value) {
      try {
        // Get the first child of the art layer
        const artwork = artLayer.value

        if (artwork && artwork instanceof paper.Group) {
          console.log(artwork, newLayers)

          updatePathColors(artwork, {
            layers: newLayers,
            viewbox: viewbox.value,
          })
          project.value.view.update()
        } else {
          console.log('No valid artwork group found')
        }
      } catch (error) {
        console.error('Error updating colors:', error)
      }
    }
  },
  { flush: 'post' }, // Try different timing
)
</script>

<template>
  <CanvasPreview :svgString :settings :viewbox :travel />

  <aside>
    <h2>Studio</h2>
    <form>
      <OutputControls :settings @update:settings="updateSettings" />
    </form>
    <hr />

    <div class="layers flow width-full">
      <h3>Features</h3>
      <LayerControls :settings :layers @update:layers="updateLayers" />
      <hr />
    </div>
    <hr />

    <DownloadControls :layers :settings :svgString @travel-updated="updateTravel" />
  </aside>
</template>

<style scoped></style>
