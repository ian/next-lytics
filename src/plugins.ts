import FullStory from "@analytics/fullstory"
import Indicative from "analytics-plugin-indicative"
import Plausible from "analytics-plugin-plausible"
import LogRocket from "analytics-plugin-logrocket"

const PLUGINS = {
  fullstory: (config) => FullStory(config),
  indicative: (config) => Indicative(config),
  logrocket: (config) => LogRocket(config),
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
