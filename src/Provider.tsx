import React, { useEffect, useState } from "react"
import Analytics from "analytics"
import { AnalyticsProvider } from "use-analytics"

import { configure } from "./plugins"

// const React = require("react")
const NextRouter = require("next/router")

export default function Provider(props) {
  const { children, enabled = true, plugins } = props

  const [analytics, setAnalytics] = useState(null)
  const router = NextRouter.useRouter()

  if (!enabled || !analytics) return children

  useEffect(() => {
    // for now we need to load this in the browser, there is a bug with the gtag implementation
    const analytics = Analytics({
      // app: "mintdrop",
      plugins: configure(plugins),
    })

    setAnalytics(analytics)

    const page = (url) => analytics.page({ url })
    page(router.pathname)
    NextRouter.events.on("routeChangeStart", page)
    return () => NextRouter.events.off("routeChangeStart", page)
  }, [])

  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>
}
