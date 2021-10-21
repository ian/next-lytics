# next-lytics

Zero-config Analytics stack for Next.js that just works.

Run your own Segment-like analytics multiplexer, powered by the [Analytics](https://github.com/DavidWells/analytics) package.

The primary motivation behind this was to just have an inclusive, startup-collection of analytics that are packaged together rather than `yarn add analytics-package-xyz` 10 times for every new project. By taking advantage of Next.js tree shaking we only include the plugins during build-time that are being used.

# Installation

### 1. Add the `next-lytics` package

```sh
yarn add next-lytics
```

### 2. Add the Analytics Provider to app.jsx

```tsx
// pages/_app.jsx

import AnalyticsProvider from "next-lytics"
import { FullStory } from "next-lytics/plugins"

const plugins = [
  FullStory({
    org: "12345",
  }),
  // ... add more plugins here
]

function MyApp({ Component, pageProps }) {
  return (
    <AnalyticsProvider plugins={plugins}>
      <Component {...pageProps} />
    </AnalyticsProvider>
  )
}

export default MyApp
```

### 3. Use in your Components

```tsx
import { useAnalytics } from "next-lytics"

export default function MyComponent() {
  const { track } = useAnalytics()

  return (
    <button onClick={() => track("Button Clicked")}>Click me to track</button>
  )
}
```

# Methods

## `track`

Track an analytics event. Full documentation: https://github.com/DavidWells/analytics#analyticstrack

## `page`

Trigger page view. Full documentation: https://github.com/DavidWells/analytics#analyticspage.

Note - The Analytics provider will automatically track Next.js page views, only use this if you need to trigger a custom page event.

## `identify`

Identify a user. Full documentation: https://github.com/DavidWells/analytics#analyticsidentify

# Plugins

`next-lytics` supports a number of plugins out of the box by default but can be extended easily.

Any anaytics plugin listed in here can be added to the Analytics stack: https://github.com/DavidWells/analytics#analytic-plugins

# Built-In Plugins

Our goal is to support the major analytics platforms that any new Next.js project/startup would likely use, without the need to npm install a ton of external libraries.

## Amplitude

Full documentation on plugin here: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-amplitude

```ts
import { Amplitude } from "next-lytics/plugins"

const plugins = [
  Amplitude({
    apiKey: "token",
  }),
]
```

| Option    | Type     | Required | Description               | Default |
| :-------- | :------- | -------- | ------------------------- | ------- |
| `apiKey`  | `string` | yes      | Amplitude project API key |
| `options` | `object` |          | Amplitude SDK options     |

## Google Analytics

Full documentation on plugin here: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-google-analytics

```ts
import { GoogleAnalytics } from "next-lytics/plugins"

const plugins = [
  GoogleAnalytics({
    trackingId: "UA-1234567",
  }),
]
```

### Configuration

| Option                        | Type      | Required | Description                                                                                                                                                                              | Default |
| :---------------------------- | :-------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `trackingId`                  | `string`  | yes      | Google Analytics site tracking Id                                                                                                                                                        |
| `debug`                       | `boolean` |          | Enable Google Analytics debug mode                                                                                                                                                       |
| `anonymizeIp`                 | `boolean` |          | Enable [Anonymizing IP addresses](https://bit.ly/3c660Rd) sent to Google Analytics. [See details below](#anonymize-visitor-ips)                                                          |
| `customDimensions`            | `object`  |          | Map [Custom dimensions](https://bit.ly/3c5de88) to send extra information to Google Analytics. [See details below](#using-ga-custom-dimensions)                                          |
| `resetCustomDimensionsOnPage` | `object`  |          | Reset custom dimensions by key on analytics.page() calls. Useful for single page apps.                                                                                                   |
| `setCustomDimensionsToPage`   | `boolean` |          | Mapped dimensions will be set to the page & sent as properties of all subsequent events on that page. If false, analytics will only pass custom dimensions as part of individual events  |
| `instanceName`                | `string`  |          | Custom tracker name for google analytics. Use this if you need multiple googleAnalytics scripts loaded                                                                                   |
| `customScriptSrc`             | `string`  |          | Custom URL for google analytics script, if proxying calls                                                                                                                                |
| `cookieConfig`                | `object`  |          | Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings) |
| `tasks`                       | `object`  |          | [Set custom google analytic tasks](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks)                                                                       |

<!-- ## Google Tag Manager

Full documentation on plugin here: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-google-tag-manager

```ts
const plugins = {
  googleTagManager: {
    containerId: "GTM-123xyz",
  },
}
```

### Configuration

| Option                                     | description                                                    |
| :----------------------------------------- | :------------------------------------------------------------- |
| `containerId` <br/>**required** - string   | The Container ID uniquely identifies the GTM Container.        |
| `dataLayerName` <br/>_optional_ - string   | The optional name for dataLayer-object. Defaults to dataLayer. |
| `customScriptSrc` <br/>_optional_ - string | Load Google Tag Manager script from a custom source            |
| `preview` <br/>_optional_ - string         | The preview-mode environment                                   |
| `auth` <br/>_optional_ - string            | The preview-mode authentication credentials                    | -->

## FullStory

Website: https://fullstory.com/

Repository: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-fullstory#readme

```ts
import { FullStory } from "next-lytics/plugins"

const plugins = [
  FullStory({
    org: "12345",
  }),
]
```

### Configuration

| Option | Type     | Required | Description                                                    | Default |
| ------ | -------- | -------- | -------------------------------------------------------------- | ------- |
| org    | `string` | yes      | FullStory account's `org` ID. The `_fs_org` value in settings. |         |

## Plausible

Website: https://plausible.io/

Repository: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-fullstory#readme

```ts
import { Plausible } from "next-lytics/plugins"

const plugins = [
  Plausible({
    domain: "example.com",
  }),
]
```

### Configuration

| Option         | Type     | Required | Description                                                       | Default                  |
| -------------- | -------- | -------- | ----------------------------------------------------------------- | ------------------------ |
| domain         | `string` | yes      | Your site's domain, as declared by you in Plausible's settings    | `location.hostname`      |
| hashMode       | `bool`   |          | Enables tracking based on URL hash changes.                       | `false`                  |
| trackLocalhost | `bool`   |          | Enables tracking on _localhost_.                                  | `false`                  |
| apiHost        | `string` |          | Plausible's API host to use. Change this if you are self-hosting. | `'https://plausible.io'` |

## LogRocket

Full documentation on plugin here: https://github.com/ian/analytics/tree/main/packages/logrocket

```ts
import { LogRocket } from "next-lytics/plugins"

const plugins = [
  LogRocket({
    appId: "123456",
  }),
]
```

### Configuration

| Option | Type     | Required | Description           | Default |
| ------ | -------- | -------- | --------------------- | ------- |
| appId  | `string` | yes      | Your LogRocket App ID |

## Indicative

Website: https://www.indicative.com/

Repository: https://github.com/ian/analytics/tree/main/packages/indicative

```ts
import { Indicative } from "next-lytics/plugins"

const plugins = [
  Indicative({
    apiKey: "123456",
  }),
]
```

### Configuration

| Option | Type     | Required | Description             | Default |
| ------ | -------- | -------- | ----------------------- | ------- |
| apiKey | `string` | yes      | Your Indicative API key |

## Splitbee

Website: https://splitbee.io/

Repository: https://github.com/ian/analytics/tree/main/packages/splitbee

```ts
import { Splitbee } from "next-lytics/plugins"

const plugins = [
  Splitbee({
    token: "123456",
  }),
]
```

### Configuration

| Option | Type     | Required | Description             | Default |
| ------ | -------- | -------- | ----------------------- | ------- |
| token  | `string` | yes      | Your Splitbee API token |

# Adding a Custom Plugin

Just install the plugin and add it to your plugins config. You can use any Analytics compatible plugin from here: https://github.com/DavidWells/analytics#analytic-plugins

```sh
yarn add analytics-custom-plugin
```

```ts
import CustomPlugin from "analytics-custom-plugin"

const plugins = [
  CustomPlugin({
    id: "xyz",
    // ... other config
  }),
]
```
