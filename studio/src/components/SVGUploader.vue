<template>
  <div>
    <input type="file" @change="onFileChange" />
  </div>
</template>

<script>
export default {
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$emit('svgLoaded', e.target.result)
      }
      reader.readAsText(file)
    },
  },
}
</script>
