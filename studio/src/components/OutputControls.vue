<template>
  <label>Title<input type="text" v-model="localSettings.title" @change="updateSettings" /></label>
  <fieldset class="paired-values">
    <legend>Size (mm)</legend>
    <label>
      Width
      <input
        class="output-control"
        type="number"
        v-model="localSettings.width"
        @change="updateSettings"
      />
    </label>
    <label>
      Height
      <input
        class="output-control"
        type="number"
        v-model="localSettings.height"
        @change="updateSettings"
      />
    </label>
  </fieldset>
  <fieldset class="paired-values">
    <legend>Tool</legend>
    <label>Up<input type="text" v-model="localSettings.penUp" @change="updateSettings" /></label>
    <label
      >Down<input type="text" v-model="localSettings.penDown" @change="updateSettings"
    /></label>
  </fieldset>
  <label
    >Feed Rate<input type="number" v-model="localSettings.feedRate" @change="updateSettings"
  /></label>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:settings'])

// Create a local copy of settings
const localSettings = ref({ ...props.settings })

// Watch for changes in props
watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...newSettings }
  },
  { deep: true },
)

const updateSettings = () => {
  emit('update:settings', { ...localSettings.value })
}
</script>
