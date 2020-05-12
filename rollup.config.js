import commonjs from 'rollup-plugin-commonjs'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import progress from 'rollup-plugin-progress'
import typescript from 'rollup-plugin-typescript2'

export default ['bin', 'index'].map(name => ({
  input: `./src/${name}.ts`,
  output: {
    file: `./lib/${name}.js`,
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    preserveShebangs(),
    progress(),
    typescript({
      clean: true,
      tsconfig: 'tsconfig.build.json',
    }),
    commonjs(),
  ],
}))
