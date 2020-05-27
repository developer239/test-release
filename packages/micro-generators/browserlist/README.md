# @test-release/browserlist

A micro generator for generating browserlist configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @test-release/browserlist
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@test-release/core`:

```ts
// src/index.ts
import { execute } from '@test-release/core'
import { createBrowserListSchema } from '@test-release/browserlist'

const generate = async () => {
  const schema = createBrowserListSchema()
  await execute(schema, '.')
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
