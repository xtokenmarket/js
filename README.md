# xtoken-js

Helper library to interact with xToken contracts written in Typescript with full typing support. It allows access to the low level API to directly interact with the contracts.

## Install
```sh
yarn add xtoken-js
```

## Dependencies

At the moment, xtoken-js requires to use [Ether.js](https://www.npmjs.com/package/ethers) V5. In the future will add support for web3.js

```sh
yarn add ethers
```

## Documentation

// TODO: Publish docs and link here

## Examples
```sh
import { ethers } from 'ethers'
import { XToken } from 'xtoken-js'

// Setup provider
const provider = new ethers.providers.InfuraProvider('homestead', '<API KEY>')

// Initialize XToken
const xToken = new XToken(provider)

// Calculate expected mint quantity for tokens
const expectedQty = await xToken.getExpectedQuantityOnMint('xKNCa', true, '1') // args: `symbol`, `tradeWithEth` & `amount`
```

## Development

- Generate API documentation (HTML or JSON) [without a mess of JSDoc tags](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/) to maintain
- Collocated, atomic, concurrent unit tests with [AVA](https://github.com/avajs/ava)
- Source-mapped code coverage reports with [nyc](https://github.com/istanbuljs/nyc)
- Configurable code coverage testing (for continuous integration)
- Automatic linting and formatting using [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) and [Prettier](https://prettier.io/)

### Build
```sh
yarn watch:build
```

### Tests
```sh
yarn watch:test
```

### Linting

To automatically fix `eslint` and `prettier` formatting issues, run:

```sh
yarn fix
```

### Coverage

To generate and view test coverage, run:

```sh
yarn cov
```

This will create an HTML report of test coverage – source-mapped back to Typescript – and open it in your default browser.

## Docs

The src folder is analyzed and documentation is automatically generated using [TypeDoc](https://github.com/TypeStrong/typedoc).

```sh
yarn doc
```

This command generates API documentation in HTML format and opens it in a browser.

Since types are tracked by Typescript, there's no need to indicate types in JSDoc format. For more information, see the [TypeDoc documentation](http://typedoc.org/guides/doccomments/).

To generate and publish documentation to [GitHub Pages](https://pages.github.com/) use the following command:

```sh
yarn doc:publish
```

Once published, documentation should be available at the proper GitHub Pages URL for your repo.

Created using [typescript-starter](https://github.com/bitjson/typescript-starter)
