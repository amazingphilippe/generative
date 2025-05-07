<template>
  <label>Title<input type="text" v-model="title" @change="updateTitle" /></label>
  <fieldset class="paired-values">
    <legend>Size (mm)</legend>
    <label>
      Width
      <input class="output-control" type="number" v-model="width" @change="updateWidth" />
    </label>
    <label>
      Height
      <input class="output-control" type="number" v-model="height" @change="updateHeight" />
    </label>
  </fieldset>
  <fieldset class="paired-values">
    <legend>Tool</legend>
    <label>
      Up
      <input type="number" v-model="penUpValue" @change="updatePenUp" min="0" max="1000" step="1" />
    </label>
    <label>
      Down
      <input
        type="number"
        v-model="penDownValue"
        @change="updatePenDown"
        min="0"
        max="1000"
        step="1"
      />
    </label>
  </fieldset>
  <label>Feed Rate<input type="number" v-model="feedRate" @change="updateFeedRate" /></label>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlotterSettingsStore } from '../stores/plotterSettings'
import { storeToRefs } from 'pinia'

const store = usePlotterSettingsStore()

// Reactive state using storeToRefs
const { title, width, height, feedRate } = storeToRefs(store)

// Computed pen values
const penUpValue = ref(store.penUpValue)
const penDownValue = ref(store.penDownValue)
// Methods
const updateTitle = () => store.updateSettings({ title: title.value })
const updateWidth = () => store.updateSettings({ width: width.value })
const updateHeight = () => store.updateSettings({ height: height.value })
const updateFeedRate = () => store.updateSettings({ feedRate: feedRate.value })

const updatePenUp = () => store.updatePenUp(penUpValue.value)
const updatePenDown = () => store.updatePenDown(penDownValue.value)
</script>
