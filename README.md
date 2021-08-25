# @xtoken/js

Helper library to interact with xToken contracts written in Typescript with full typing support. It allows access to the low level API to directly interact with the contracts.

## Install

```sh
yarn add @xtoken/js
```

## Dependencies

At the moment, `@xtoken/js` requires using [@xtoken/abis](https://www.npmjs.com/package/@xtoken/abis) and [ethers.js](https://www.npmjs.com/package/ethers) v5.0.30

```sh
yarn add @xtoken/abis
yarn add ethers@5.0.30
```

## Environment

We need to set up an environment variable for test address that'd be used to validate portfolio balances across all xAssets while running tests.

```sh
cp .env.sample .env # Fill in the `INFURA_API_KEY` and `TEST_ADDRESS` variables
```

## Documentation

GitHub pages: [https://xtokenmarket.github.io/js](https://xtokenmarket.github.io/js/)

## Examples

```sh
import { ethers } from 'ethers'
import { X_KNC_A } from '@xtoken/abis'
import { XToken } from '@xtoken/js'

// Setup provider
const provider = new ethers.providers.InfuraProvider('homestead', '<API KEY>')

// Initialize XToken
const xToken = new XToken(provider)

// Calculate expected mint quantity for tokens
const expectedQty = await xToken.getExpectedQuantityOnMint(X_KNC_A, true, '1') // args: `symbol`, `tradeWithEth` & `amount`
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

### Link

Link `@xtoken/js` package via [yarn](https://classic.yarnpkg.com/en/docs/cli/link/) for local development and testing the integration on the UI

```sh
$ cd js
$ yarn link # @xtoken/js package will be linked to the local copy

$ cd cafe
$ yarn link @xtoken/js # This will create a symlink named cafe/node_modules/@xtoken/js that links to the local copy of the xToken js project

$ yarn unlink # To unlink the installed package
```

### Tests

```sh
yarn watch:test
```

In order to run a single test, you can use the name of the test or regex name to match the tests to be executed

```sh
yarn build && npx ava -m='*prices*'
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

This command generates the library documentation in HTML format and opens it in a browser.

Since types are tracked by Typescript, there's no need to indicate types in JSDoc format. For more information, see the [TypeDoc documentation](http://typedoc.org/guides/doccomments/).

To generate and publish documentation to [GitHub Pages](https://pages.github.com/) use the following command:

```sh
yarn doc:publish
```

Once published, documentation should be available at the [GitHub Pages](https://xtokenmarket.github.io/js/)

## Publishing

Before publishing the package to NPM, `prepare-release` command builds, runs the tests, increases the package version automatically and publishes the docs to GitHub Pages.

```sh
yarn prepare-release
```

Once the above command runs successfully, you should then execute the below command which will tag the release version and publish the build to NPM.

**Note: Before publishing the package, ensure that the `package.json` has the `version` field incremented and also the `build` folder has the compiled code.**

```sh
git push --follow-tags origin main && npm publish
```

Created using [typescript-starter](https://github.com/bitjson/typescript-starter)
