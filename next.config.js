const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      reactStrictMode: true,
    }
  }

  return {
    reactStrictMode: true,
    assetPrefix: '/i18next-v4-format-converter-web/', // because of gh-pages
  }
}