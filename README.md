# next-lytics

Zero-config Analytics stack for Next.js, powered by [Analytics](https://github.com/DavidWells/analytics).

# Installation

### 1. Add the `next-lytics` package

```sh
yarn add next-lytics
```

### 2. Add the Analytics Provider to app.jsx

```tsx
// pages/_app.jsx

import AnalyticsProvider from "next-lytics"

const plugins = {
  fullstory: {
    org: "12345",
  },
  // ... add more plugins here
}

function MyApp({ Component, pageProps }) {
  return (
    <AnalyticsProvider plugins={plugins}>
      <Component {...pageProps} />
    </AnalyticsProvider>
  )
}

export default MyApp
```

# Plugins

`next-lytics` supports a number of plugins out of the box by default but can be extended easily.

Any anaytics plugin listed in here can be added to the Analytics stack: https://github.com/DavidWells/analytics#analytic-plugins

<!-- # Adding a Custom Plugin

Just install the plugin and add it to your plugins config:

```sh
yarn add analytics-custom-plugin
```

```ts
import CustomPlugin from "analytics-custom-plugin"

const plugins = {
  CustomPlugin: {
    id: "xyz",
    // ... config
  },
}
``` -->

# Built-In Plugins

Our goal is to support the major analytics platforms that any new Next.js project would likely use, without the need to npm install a ton of external libraries.

<!-- ## Amplitude

Full documentation on plugin here: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-amplitude

```ts
const plugins = {
  amplitude: {
    apiKey: "token",
  },
}
```

| Option                              | description               |
| :---------------------------------- | :------------------------ |
| `apiKey` <br/>**required** - string | Amplitude project API key |
| `options` <br/> - object            | Amplitude SDK options     | -->

<!-- ## Google Analytics

Full documentation on plugin here: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-google-analytics

```ts
const plugins = {
  googleTagManager: {
    trackingId: "UA-1234567",
  },
}
```

### Configuration

| Option                                                 | description                                                                                                                                                                              |
| :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trackingId` <br/>**required** - string                | Google Analytics site tracking Id                                                                                                                                                        |
| `debug` <br/>_optional_ - boolean                      | Enable Google Analytics debug mode                                                                                                                                                       |
| `anonymizeIp` <br/>_optional_ - boolean                | Enable [Anonymizing IP addresses](https://bit.ly/3c660Rd) sent to Google Analytics. [See details below](#anonymize-visitor-ips)                                                          |
| `customDimensions` <br/>_optional_ - object            | Map [Custom dimensions](https://bit.ly/3c5de88) to send extra information to Google Analytics. [See details below](#using-ga-custom-dimensions)                                          |
| `resetCustomDimensionsOnPage` <br/>_optional_ - object | Reset custom dimensions by key on analytics.page() calls. Useful for single page apps.                                                                                                   |
| `setCustomDimensionsToPage` <br/>_optional_ - boolean  | Mapped dimensions will be set to the page & sent as properties of all subsequent events on that page. If false, analytics will only pass custom dimensions as part of individual events  |
| `instanceName` <br/>_optional_ - string                | Custom tracker name for google analytics. Use this if you need multiple googleAnalytics scripts loaded                                                                                   |
| `customScriptSrc` <br/>_optional_ - string             | Custom URL for google analytics script, if proxying calls                                                                                                                                |
| `cookieConfig` <br/>_optional_ - object                | Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings) |
| `tasks` <br/>_optional_ - object                       | [Set custom google analytic tasks](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks)                                                                       | -->

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
const plugins = {
  fullstory: {
    org: "12345",
  },
}
```

### Configuration

| Option | Type     | Required | Description                                                    | Default |
| ------ | -------- | -------- | -------------------------------------------------------------- | ------- |
| org    | `string` | yes      | FullStory account's `org` ID. The `_fs_org` value in settings. |         |

## Plausible

Website: https://plausible.io/

Repository: https://github.com/DavidWells/analytics/tree/master/packages/analytics-plugin-fullstory#readme

```ts
const plugins = {
  plausible: {
    domain: "example.com",
  },
}
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
const plugins = {
  logrocket: {
    appId: "123456",
  },
}
```

### Configuration

| Option | Type     | Required | Description           | Default |
| ------ | -------- | -------- | --------------------- | ------- |
| appId  | `string` | yes      | Your LogRocket App ID |

## Indicative

Website: https://www.indicative.com/

Repository: https://github.com/ian/analytics/tree/main/packages/indicative

```ts
const plugins = {
  indicative: {
    apiKey: "123456",
  },
}
```

### Configuration

| Option | Type     | Required | Description             | Default |
| ------ | -------- | -------- | ----------------------- | ------- |
| apiKey | `string` | yes      | Your Indicative API key |

## Splitbee

Website: https://splitbee.io/

Repository: https://github.com/ian/analytics/tree/main/packages/splitbee

```ts
const plugins = {
  splitbee: {
    token: "123456",
  },
}
```

### Configuration

| Option | Type     | Required | Description             | Default |
| ------ | -------- | -------- | ----------------------- | ------- |
| token  | `string` | yes      | Your Splitbee API token |
