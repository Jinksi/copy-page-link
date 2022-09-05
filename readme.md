# Copy Pretty Page Link

A simple extension to copy the current page's title to the clipboard in both HTML and markdown format.

## Install

- [**Chrome** extension coming soon][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/___.svg?label=%20">][link-cws]
- [**Firefox** add-on][link-amo] [<img valign="middle" src="https://img.shields.io/amo/v/copy-pretty-page-link.svg?label=%20">][link-amo]

[link-cws]: #
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/copy-pretty-page-link

## Features

The extension exposes a button to copy the current page's title & link to the clipboard.

- Copies it in html format (for rich-text editors)
- Copies it in markdown format (for plain-text editors)

## Development

- `npm run watch` to watch for changes and build the extension.
- `npm i -g web-ext` to install [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).
- `web-ext run -f firefoxdeveloperedition` to run the extension in Firefox Developer Edition.

## Sign Firefox extension

- Get your AMO keys from [Manage API Keys – Firefox Developer Hub](https://addons.mozilla.org/en-US/developers/addon/api/key/)
- `web-ext sign --api-key $AMO_JWT_ISSUER --api-secret $AMO_JWT_SECRET`
