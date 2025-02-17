<template>
  <div>
    <ul id="layers" class="reorder" role="list">
      <li v-for="layer in localLayers" :key="layer.id">
        <span class="layer-grab" tabindex="0" role="button">{{ layer.name }}</span>
        <label class="layer-control toggle">
          <span class="sr">Tool Change</span>
          <input
            :id="'toggle-layer-pause-' + layer.name"
            type="checkbox"
            v-model="layer.tool"
            @change="updateLayers"
          />
          <i class="ph-bold ph-pencil-simple on"></i>
          <i class="ph-bold ph-arrow-down off"></i>
        </label>
        <label class="layer-control toggle">
          <span class="sr">Skip</span>
          <input
            :id="'toggle-layer-skip-' + layer.name"
            type="checkbox"
            v-model="layer.visible"
            @change="updateLayers"
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

const updateLayers = () => {
  emit('update:layers', [...localLayers.value])
}
</script>
