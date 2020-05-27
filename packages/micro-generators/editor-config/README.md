# @test-release/editorconfig

A micro generator for generating editorconfig configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @test-release/editorconfig
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import { execute } from '@test-release/core'
import { createEditorConfigSchema } from '@test-release/editorconfig'

const generate = async () => {
  const schema = createEditorConfigSchema()
  await execute(schema, '.')
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
