# @test-release/editor-config

A micro generator for generating editor-config configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @test-release/editor-config
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import { execute, getProjectFolder } from '@test-release/core'
import { createSchema } from '@test-release/editor-config'

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  
  const schema = createSchema()
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
