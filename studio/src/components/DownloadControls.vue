<template>
  <a class="icon-link" :href="gcodeBlobUrl" :download="filename + '.gcode'"
    ><i class="ph-bold ph-download-simple"></i> GCODE</a
  >
  <a class="icon-link" :href="svgBlobUrl" :download="filename + '.svg'"
    ><i class="ph-bold ph-download-simple"></i> SVG</a
  >
</template>

<script setup>
import { computed } from 'vue'
import { usePlotterSettingsStore } from '../stores/plotterSettings'
import { pathsToGCODE } from '../transformers/pathsToGCODE'

const settings = usePlotterSettingsStore()

const props = defineProps({
  layers: {
    type: Array,
    required: true,
  },
  svgString: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['travel-updated'])

const gcodeBlobUrl = computed(() => {
  if (!props.layers || !settings) return ''
  const { gcode, travel } = pathsToGCODE(props.layers, settings)
  const blob = new Blob([gcode], { type: 'text/plain' })
  // console.log('GCODE', blob)
  // console.log('TRAVEL', travel)
  emit('travel-updated', travel)
  return URL.createObjectURL(blob)
})

const svgBlobUrl = computed(() => {
  if (!props.layers || !settings) return ''
  const blob = new Blob([props.svgString], { type: 'image/svg+xml' })
  // console.log('SVG', blob)
  return URL.createObjectURL(blob)
})

const filename = computed(() => {
  return `${settings.title}`
})
</script>
