# Guide to adding new xTokens / Contracts in xtoken-js

```sh
- Add abis, constants and addresses in xtoken-abis package

- Link abi package to xtoken-js
(yarn build && yarn link in abis package and yarn link @xtoken/abis in xtoken-js package)

- Run yarn typechain to create type bindings from new abis

- in xtoken/js - types folder:
    - Change src/types/xtoken.d.ts to include new contracts (import and add to IContracts)
    - Change src/blockchain/utils.ts - import new contracts and add them to getAbi function

- Add Contract packages in a new directory in src/blockchain incrementally:
    - Contract getter functions in helper.ts
    - New ts file for each Contract,
    each containing functions which will be called from FE
    - Create tests by using .spec.ts notation for each .ts file
    - Run yarn fix && yarn test to check if tests pass
    - Run yarn test:unit ~/path/to/test/test.spec.ts for individual tests
    - Add main index.ts file to export all functions from package
```
