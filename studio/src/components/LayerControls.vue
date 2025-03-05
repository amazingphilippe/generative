<template>
  <div>
    <ul id="layers" class="reorder" role="list">
      <li v-for="layer in localLayers" :key="layer.id">
        <span class="layer-grab" tabindex="0" role="button">{{ layer.name }}</span>
        <label class="layer-control toggle">
          <span class="sr">Tool Change</span>
          <span>{{ layer.tool }}</span>
          <input
            :id="'toggle-layer-pause-' + layer.name"
            type="checkbox"
            :checked="layer.tool > localLayers[layer.id - 1]?.tool"
            @change="updateLayerTool(layer.id)"
          />
          <i class="ph-bold ph-pencil-simple on"></i>
          <i class="ph-bold ph-arrow-down off"></i>
        </label>
        <label class="layer-control toggle">
          <span class="sr">Skip</span>
          <input
            :id="'toggle-layer-skip-' + layer.name"
            type="checkbox"
            :checked="layer.visible"
            @change="updateLayerVisibility(layer.id)"
          />
          <i class="ph-bold ph-eye on"></i>
          <i class="ph-bold ph-eye-slash off"></i>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  layers: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:layers'])
const localLayers = ref([...props.layers])

watch(
  () => props.layers,
  (newLayers) => {
    localLayers.value = [...newLayers]
  },
  { deep: false },
)

const updateLayerTool = (layerId) => {
  // Update local state
  // We know the toggled layer ID
  const layerIndex = localLayers.value.findIndex((l) => l.id === layerId)

  // We know the order of the layers
  // We can select the layers to be updated by selecting all layers following layerID
  let layersToUpdate = localLayers.value.slice(layerIndex)

  // How do we know if we should increment or decrement?
  let previousTool = localLayers.value[layerIndex - 1]?.tool || 0

  // We compare the current tool ID with the previous layer tool ID
  if (previousTool === layersToUpdate[0].tool) {
    // If the current tool ID is equal to the previous layer tool ID, we increment
    layersToUpdate = layersToUpdate.map((layer) => {
      return {
        ...layer,
        tool: layer.tool + 1,
      }
    })
  } else {
    // If the current tool ID is greater than the previous layer tool ID, we decrement
    layersToUpdate = layersToUpdate.map((layer) => {
      return {
        ...layer,
        tool: layer.tool - 1,
      }
    })
  }

  // Merge the updated layers with the rest of the layers
  localLayers.value = [
    ...localLayers.value.slice(0, layerIndex),
    ...layersToUpdate,
    ...localLayers.value.slice(layerIndex + layersToUpdate.length),
  ]

  // Emit updated local state
  emit('update:layers', [...localLayers.value])
}

const updateLayerVisibility = (layerId) => {
  // Update local state first
  localLayers.value = localLayers.value.map((layer) => {
    if (layer.id === layerId) {
      return {
        ...layer,
        visible: !layer.visible,
      }
    }
    return layer
  })

  // Emit updated local state
  emit('update:layers', [...localLayers.value])
}
</script>
