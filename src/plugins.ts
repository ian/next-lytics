import FullStory from "@analytics/fullstory"
import Plausible from "analytics-plugin-plausible"

const PLUGINS = {
  fullstory: (config) => FullStory(config),
  plausible: (config) => Plausible(config),
}

export function configure(pluginsConfig) {
  return Object.entries(pluginsConfig)
    .map(([name, config]) => {
      const plugin = PLUGINS[name]

      if (plugin) {
        return plugin(config)
      } else {
        console.warn(`Plugin ${name} not found.`)
      }
    })
    .filter((f) => f)
}
