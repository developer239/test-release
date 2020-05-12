import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import progress from 'rollup-plugin-progress'
import typescript from 'rollup-plugin-typescript2'

const tsDefaults = { compilerOptions: { declaration: true } }
const tsOverrides = { compilerOptions: { declaration: false } }

export default {
  input: './src/index.ts',

  output: {
    file: 'lib/index.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },

  plugins: [
    preserveShebangs(),
    progress(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      tsconfigDefaults: tsDefaults,
      tsconfigOverride: tsOverrides,
    }),
    resolve({ jsnext: true }),
    commonjs(),
  ],
}
