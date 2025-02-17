import { generateGcode } from '../utils/gcodeUtils'

export function pathsToGcode(paths, settings) {
  return generateGcode(paths, settings)
}
