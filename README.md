# @test-release 💦

![release](https://github.com/developer239/test-release/workflows/release/badge.svg)

> Replace your big boilerplate repositories with small composable generators.

_@test-release_ is alternative to Yeoman and other generators that help you to kickstart new projects, prescribe best practices and tools to help you stay productive.

There is a difference though that _@test-release_ generators are really small and independent. However you can easily compose smaller generators into bigger ones and create more robust and opinionated codebase. 

## Core Packages

You can use these to build your own generators. All packages are written in TypeScript and designed to be easy to use.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Library Core  | [@test-release/core](packages/core/core) | [![@test-release/core][core-badge]][core-npm] |  

## Generators

Multiple micro generators composed into robust generators. These generators are useful for opinionated codebase setup. For example when we are setting up CRA the first thing we do is to remove service worker and install code quality tools.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Macro | [@test-release/code-quality](packages/macro-generators/code-quality) | [![@test-release/code-quality][cc-badge]][cc-npm] |  

## Micro Generators

You can easily selectively add code quality tools and other useful libraries to your existing codebase.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Micro | [@test-release/browserlist](packages/micro-generators/browserlist) | [![@test-release/browserlist][bl-badge]][bl-npm] |
|Micro | [@test-release/create-react-app](packages/micro-generators/create-react-app) | [![@test-release/create-react-app][cra-badge]][cra-npm] |
|Micro | [@test-release/semantic-release](packages/micro-generators/editor-config) | [![@test-release/editor-config][ef-badge]][ef-npm] | 
|Micro | [@test-release/eslint](packages/micro-generators/eslint) | [![@test-release/eslint][es-badge]][es-npm] |
|Micro | [@test-release/git-hooks](packages/micro-generators/git-hooks) | [![@test-release/git-hooks][gh-badge]][gh-npm] |
|Micro | [@test-release/heroku](packages/micro-generators/heroku) | [![@test-release/heroku][he-badge]][he-npm] |
|Micro | [@test-release/nestjs](packages/micro-generators/nestjs) | [![@test-release/nestjs][nest-badge]][nest-npm] |
|Micro | [@test-release/nextjs](packages/micro-generators/nextjs) | [![@test-release/nextjs][next-badge]][next-npm] |
|Micro | [@test-release/prettier](packages/micro-generators/prettier) | [![@test-release/prettier][prettier-badge]][prettier-npm] |
|Micro | [@test-release/stylelint](packages/micro-generators/stylelint) | [![@test-release/stylelint][stylelint-badge]][stylelint-npm] |
|Micro | [@test-release/ts-node](packages/micro-generators/ts-node) | [![@test-release/ts-node][tsnode-badge]][tsnode-npm] |

## Examples

### Minimal micro generator

This is how many lines of code you have to write to add prettier to all your projects in the future:

```js
// src/templates/.prettierrc.js

module.exports = require('@linters/prettier-config')
```

```ts
// src/index.ts

import path from 'path'
import { builder, execute } from '@test-release/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  schema.addFolder({
    name: 'prettier',
    source: path.join(__dirname, 'templates'),
  })

  schema.addScript('format', "prettier --write '*/**/*.{ts,tsx,css,md,json}'")
  schema.addDevDependencies(['prettier', '@linters/prettier-config'])

  return schema.toJson()
}

const projectFolder = '.'
execute(createPrettierSchema(), projectFolder)
```

### Composing multiple micro generators

We can easily use existing micro generators and bundle them together into bigger generator.

#### Micro generators

- [@test-release/editor-config](/packages/micro-generators/editor-config)
- [@test-release/eslint](/packages/micro-generators/eslint)
- [@test-release/prettier](/packages/micro-generators/prettier)
- [@test-release/stylelint](/packages/micro-generators/stylelint)

#### Generator implementation

```ts
import { AppType, builder } from '@test-release/core'
import { createEditorConfigSchema } from '@test-release/editor-config'
import { createEslintSchema } from '@test-release/eslint'
import { createPrettierConfig } from '@test-release/prettier'
import { createStylelintWebConfig } from '@test-release/stylelint'

export const createWebCodeQualitySchema = () => {
  const schema = builder('codequality')
  const hasPrettier = true

  const editorconfigSchema = createEditorConfigSchema()
  const eslintSchema = createEslintSchema({ appType: AppType.WEB })
  const prettierSchema = createPrettierConfig({ appType: AppType.WEB })
  const stylelintSchema = createStylelintWebConfig({ hasPrettier })

  schema.combineSchema(editorconfigSchema)
  schema.combineSchema(eslintSchema)
  schema.combineSchema(prettierSchema)
  schema.combineSchema(stylelintSchema)

  return schema.toJson()
}

const projectFolder = '.'
execute(createWebCodeQualitySchema(), projectFolder)
```

[core-badge]: https://badge.fury.io/js/%40test-release%2Fcore.svg
[core-npm]: https://badge.fury.io/js/%40test-release%2Fcore

[cc-badge]: https://badge.fury.io/js/%40test-release%2Fcode-quality.svg
[cc-npm]: https://badge.fury.io/js/%40test-release%2Fcode-quality

[bl-badge]: https://badge.fury.io/js/%40test-release%2Fbrowserlist.svg
[bl-npm]: https://badge.fury.io/js/%40test-release%2Fbrowserlist

[cra-badge]: https://badge.fury.io/js/%40test-release%2Fcreate-react-app.svg
[cra-npm]: https://badge.fury.io/js/%40test-release%2Fcreate-react-app

[ef-badge]: https://badge.fury.io/js/%40test-release%2Feditor-config.svg
[ef-npm]: https://badge.fury.io/js/%40test-release%2Feditor-config

[es-badge]: https://badge.fury.io/js/%40test-release%2Feslint.svg
[es-npm]: https://badge.fury.io/js/%40test-release%2Feslint

[gh-badge]: https://badge.fury.io/js/%40test-release%2Fgit-hooks.svg
[gh-npm]: https://badge.fury.io/js/%40test-release%2Fgit-hooks

[he-badge]: https://badge.fury.io/js/%40test-release%2Fheroku.svg
[he-npm]: https://badge.fury.io/js/%40test-release%2Fheroku

[nest-badge]: https://badge.fury.io/js/%40test-release%2Fnestjs.svg
[nest-npm]: https://badge.fury.io/js/%40test-release%2Fnestjs

[next-badge]: https://badge.fury.io/js/%40test-release%2Fnextjs.svg
[next-npm]: https://badge.fury.io/js/%40test-release%2Fnextjs

[prettier-badge]: https://badge.fury.io/js/%40test-release%2Fprettier.svg
[prettier-npm]: https://badge.fury.io/js/%40test-release%2Fprettier

[stylelint-badge]: https://badge.fury.io/js/%40test-release%2Fstylelint.svg
[stylelint-npm]: https://badge.fury.io/js/%40test-release%2Fstylelint

[tsnode-badge]: https://badge.fury.io/js/%40test-release%2Fts-node.svg
[tsnode-npm]: https://badge.fury.io/js/%40test-release%2Fts-node
