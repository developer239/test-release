# @test-release/nextjs-full

A micro generator for generating nextjs-full configuration.

#### Micro Generators Included

- [@test-release/nextjs](/packages/micro-generators/nextjs)
- [@test-release/browserlist](/packages/micro-generators/browserlist)
- [@test-release/editor-config](/packages/micro-generators/editor-config)
- [@test-release/eslint](/packages/micro-generators/eslint)
- [@test-release/stylelint](/packages/micro-generators/stylelint)
- [@test-release/prettier](/packages/micro-generators/prettier)
- [@test-release/git-hooks](/packages/micro-generators/git-hooks)
- [@test-release/heroku](/packages/micro-generators/heroku)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @test-release/nextjs-full
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import { execute, askProjectName, askYesNo } from '@test-release/core'
import { createSchema } from '@test-release/nextjs-full'

const generate = async () => {
  const { projectFolder } = await askProjectName()
  const isHeroku = await askYesNo(
    'Do you want to generate Heroku configuration?'
  )

  const schema = createSchema({ projectFolder, isHeroku })

  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
