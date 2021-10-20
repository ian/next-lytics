import React, { useEffect, useState } from "react"
import Analytics from "analytics"
import { AnalyticsProvider } from "use-analytics"
import { configure } from "./plugins"

const NextRouter = require("next/router")

export default function AnalyticsProvider(props) {
  const { children, enabled = true, plugins } = props
  const analyticsPlugins = configure(plugins)

  const [analytics, setAnalytics] = useState(null)
  const router = NextRouter.useRouter()

  useEffect(() => {
    console.log("useEffect")

    // for now we need to load this in the browser, there is a bug with the gtag implementation
    const analytics = Analytics({
      app: "test",
      plugins: analyticsPlugins,
    })

    setAnalytics(analytics)

    const page = (url) => analytics.page({ url })
    page(router.pathname)
    NextRouter.events.on("routeChangeStart", page)
    return () => NextRouter.events.off("routeChangeStart", page)
  }, [])

  console.log({ NextRouter, enabled, analytics })

  if (!enabled || !analytics) return <>children</>
  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>
}
