/** Utility
 * - takes in a paper.js project
 * - queries group items with a name in the project
 * - skip unnamed groups.
 * - returns as layers in the project
 */

import paper from 'paper'
import { toRaw } from 'vue'

export function getLayers(project) {
  // Input validation
  if (!project) {
    console.warn('No project provided')
    return []
  }

  // Get artwork layer
  const artworkLayer = project.layers.find((layer) => layer.name === 'artwork')
  if (!artworkLayer) {
    console.warn('No artwork layer found')
    return []
  }

  artworkLayer.activate()

  try {
    const rawLayer = toRaw(artworkLayer)

    // First, try to get named groups (layered artwork)
    const groupLayers = rawLayer.getItems({
      recursive: true,
      class: paper.Group,
      match: (item) => item.name && item.name.trim().length > 0,
    })

    // If we found named groups, use those as layers
    if (groupLayers.length > 0) {
      console.log('Found grouped artwork with', groupLayers.length, 'layers')
      return groupLayers.map((layer, index) => ({
        id: layer.id,
        name: layer.name || `Layer ${index + 1}`,
        visible: true,
        tool: 0,
        data: layer,
      }))
    }

    // If no named groups found, create a single layer from all paths
    const paths = rawLayer.getItems({
      recursive: true,
      class: paper.Path,
    })

    if (paths.length > 0) {
      console.log('Found ungrouped artwork with', paths.length, 'paths')
      // Create a synthetic group for all paths
      const ungroupedLayer = new paper.Group(paths)
      ungroupedLayer.name = 'Layer'
      console.log('ungroupedLayer', toRaw(project.activeLayer))

      return [
        {
          id: ungroupedLayer.id,
          name: ungroupedLayer.name,
          visible: true,
          tool: 0,
          data: ungroupedLayer,
        },
      ]
    }

    console.warn('No valid artwork content found')
    return []
  } catch (error) {
    console.error('Error processing artwork layers:', error)
    return []
  }
}
