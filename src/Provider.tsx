import React, { useEffect, useState } from "react"
import Analytics from "analytics"
import { AnalyticsProvider as UseAnalyticsProvider } from "use-analytics"

const { useRouter, Router } = require("next/router")

type Props = {
  children: any
  enabled?: boolean
  plugins: Record<string, unknown>[]
}

export default function AnalyticsProvider(props: Props) {
  const { children, enabled = true, plugins } = props
  const [analytics, setAnalytics] = useState(null)
  const router = useRouter()

  if (!enabled) return children

  useEffect(() => {
    // for now we need to load this in the browser, there is a bug with the gtag implementation
    const analytics = Analytics({
      app: "test",
      plugins,
    })

    setAnalytics(analytics)

    const page = (url) => analytics.page({ url })
    page(router.pathname)
    Router.events.on("routeChangeStart", page)
    return () => Router.events.off("routeChangeStart", page)
  }, [])

  if (!analytics) return children
  return (
    <UseAnalyticsProvider instance={analytics}>{children}</UseAnalyticsProvider>
  )
}
