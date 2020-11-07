# @test-release/code-quality

A robust generator for installing your favorite code quality tools for your project.

#### Micro Generators Included

- [@test-release/editor-config](/packages/micro-generators/editor-config)
- [@test-release/eslint](/packages/micro-generators/eslint)
- [@test-release/prettier](/packages/micro-generators/prettier)
- [@test-release/stylelint](/packages/micro-generators/stylelint)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @test-release/code-quality
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import {
  execute,
  AppType,
  askAppType,
  getProjectFolder,
} from '@test-release/core'
import { createSchema } from '@test-release/code-quality'

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const codeQualitySchema = createSchema({ appType })
  await execute(codeQualitySchema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```

