# @test-release/cra-full

A robust generator for generating full CRA project.

#### Micro Generators Included

- [@test-release/create-react-app](/packages/micro-generators/create-react-app)
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
npx @test-release/cra-full
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import { execute, askProjectName, askYesNo } from '@test-release/core'
import { createSchema } from '@test-release/cra-full'

const generate = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askYesNo('Do you want to configure router?')
  const isHeroku = await askYesNo(
    'Do you want to generate Heroku configuration?'
  )

  const schema = createSchema({ projectFolder, isHeroku, isRouter })

  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
