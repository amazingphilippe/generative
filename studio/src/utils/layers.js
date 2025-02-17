/** Utility
 * - takes in a paper.js project
 * - queries group items with a name in the project
 * - skip unnamed groups.
 * - returns as layers in the project
 */

import paper from 'paper'
import { toRaw } from 'vue'

export function getLayers(project) {
  // Only get layers from the artwork layer
  const artworkLayer = project.layers.find((layer) => layer.name === 'artwork')
  if (!artworkLayer) return []

  let projectLayers = []
  try {
    projectLayers = toRaw(artworkLayer).getItems({
      recursive: true,
      class: paper.Group,
      match: (item) => item.name && item.name.trim().length > 0,
    })
  } catch (error) {
    console.error('Failed to get layers', error)
    return []
  }

  return projectLayers.map((layer) => ({
    id: layer.id,
    name: layer.name,
    visible: true,
    tool: 0,
    data: layer,
  }))
}
