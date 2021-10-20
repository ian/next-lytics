import React, { useEffect, useState } from "react"
import Analytics from "analytics"
import { AnalyticsProvider } from "use-analytics"
import { configure } from "./plugins"

const { useRouter, Router } = require("next/router")

export default function AnalyticsProvider(props) {
  const { children, enabled = true, plugins } = props
  const analyticsPlugins = configure(plugins)

  const [analytics, setAnalytics] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // for now we need to load this in the browser, there is a bug with the gtag implementation
    const analytics = Analytics({
      app: "test",
      plugins: analyticsPlugins,
    })

    setAnalytics(analytics)

    const page = (url) => analytics.page({ url })
    page(router.pathname)
    Router.events.on("routeChangeStart", page)
    return () => Router.events.off("routeChangeStart", page)
  }, [])

  if (!enabled || !analytics) return <>children</>
  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>
}
