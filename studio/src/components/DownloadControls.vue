<template>
  <a :href="gcodeBlobUrl" :download="filename">Download GCODE</a>
  <a :href="gcodeBlobUrl" :download="filename">Download SVG</a>
</template>

<script>
export default {
  props: ['gcode'],
  computed: {
    gcodeBlobUrl() {
      const blob = new Blob([this.gcode], { type: 'text/plain' })
      return URL.createObjectURL(blob)
    },
    filename() {
      return 'output.gcode'
    },
  },
}
</script>
