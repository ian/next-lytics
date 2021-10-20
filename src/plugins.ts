const PLUGINS = {
  fullstory: () => require("@analytics/fullstory"),
  plausible: () => require("analytics-plugin-plausible"),
}

export function configure(pluginsConfig) {
  return Object.entries(pluginsConfig)
    .map(([name, config]) => {
      const plugin = PLUGINS[name]

      if (plugin) {
        return plugin()(config)
      } else {
        console.warn(`Plugin ${name} not found.`)
      }
    })
    .filter((f) => f)
}
