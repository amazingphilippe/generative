// stores/settingsStore.js
import { defineStore } from 'pinia'

export const usePlotterSettingsStore = defineStore('settings', {
  state: () => ({
    title: 'Untitled',
    width: 200,
    height: 200,
    penUp: 'M3S18',
    penDown: 'M3S26',
    feedRate: 3000,
    userModified: false,
  }),

  getters: {
    penUpValue: (state) => {
      const match = state.penUp.match(/M3S(\d+)/)
      return match ? parseInt(match[1]) : 0
    },

    penDownValue: (state) => {
      const match = state.penDown.match(/M3S(\d+)/)
      return match ? parseInt(match[1]) : 0
    },
  },

  actions: {
    updatePenUp(value) {
      this.penUp = `M3S${value}`
      this.userModified = true
    },

    updatePenDown(value) {
      this.penDown = `M3S${value}`
      this.userModified = true
    },

    updateSettings(newSettings) {
      Object.assign(this, {
        ...newSettings,
        userModified: true,
      })
    },

    resetToDefaults() {
      this.$reset()
    },
  },

  // Built-in persistence
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'plotterSettings',
        storage: localStorage,
      },
    ],
  },
})
