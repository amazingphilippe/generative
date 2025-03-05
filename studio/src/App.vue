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

// Ref for file input
let fileInput = ref(null)
// Ref to track if studio or sketch
let isStudio = ref(false)
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

// File handling function
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        // Get the SVG string from the file
        const uploadedSvgString = e.target.result

        // Create a temporary container and insert the SVG
        const container = document.createElement('div')
        container.style.display = 'none'
        container.innerHTML = uploadedSvgString

        let svgContainer = container.querySelector('svg')
        svgContainer.classList.add('canvas')

        // Replace existing canvas content or append new one
        const existingCanvas = document.querySelector('.canvas')
        if (existingCanvas) {
          existingCanvas.replaceWith(container)
        } else {
          document.body.appendChild(container)
        }

        // Setup observer for the new SVG
        setupObserver()
      }
      reader.readAsText(file)
    } catch (error) {
      console.error('Error reading SVG file:', error)
    }
  }
}

// Function to check for canvas element
const checkIsStudio = () => {
  isStudio.value = !!document.querySelector('.canvas')
}

// Add a function to set up the observer
const setupObserver = () => {
  const canvasElement = document.querySelector('.canvas')
  if (canvasElement && observer.value) {
    observer.value.observe(canvasElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
    handleCanvasChange() // Initial processing
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

    // Check for canvas element initially
    checkIsStudio()

    // Set up the observer
    observer.value = new MutationObserver(() => {
      handleCanvasChange()
    })

    // Try to get title from H1 if it exists
    const h1 = document.querySelector('h1')
    if (h1) {
      settings.value.title = h1.textContent
    }

    // Try to set up observer if canvas already exists
    setupObserver()
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
      <input
        v-if="!isStudio"
        type="file"
        ref="fileInput"
        accept=".svg"
        @change="handleFileUpload"
        class="file-input"
      />
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
