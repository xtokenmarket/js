# Guide to adding new xAssets in `@xtoken/js`

- Add ABIs, constants and addresses in `@xtoken/abis` package

- Link `abis` package to `js`

```
cd abis
yarn build && yarn link

cd js
yarn link @xtoken/abis
```

- Run `yarn typechain && yarn fix` in `js` to create type bindings from newly added ABIs

- In `js/src/types` folder:

  - Change `src/types/xtoken.d.ts` to include new contracts (import and add to IContracts)
  - Change `src/blockchain/utils.ts` - import new contracts and add them to `getAbi()` function

- Add contract related functionality in a new module created within `src/blockchain` incrementally:
  - Contract getter functions in `helper.ts`
  - New `.ts` file for each contract, each containing functions which will be called from Front-end
  - Create tests by using `.spec.ts `notation for each `.ts` file
  - Run `yarn fix && yarn test` to check if tests pass
  - Run `yarn test:unit src/test/test.spec.ts` for individual tests
  - Add main `index.ts` file to export all functions from package
  - Export the `getXAssetPrice()` method in `src/index.ts`

```

```
