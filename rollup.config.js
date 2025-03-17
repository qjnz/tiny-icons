import svelte from 'rollup-plugin-svelte';
import svg from 'rollup-plugin-svg';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

export default [
  // Main package
  {
    input: 'src/index.js',
    output: [
      {
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    ],
    plugins: [
      svelte({
        compilerOptions: {
          hydratable: true
        }
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      css(),
      terser()
    ],
    external: ['svelte']
  },
  
  // Individual SVG processing
  {
    input: 'src/icons/index.js',  // We'll create this
    output: {
      dir: 'dist/icons',
      format: 'es',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      preserveModules: true,
      preserveModulesRoot: 'src/icons'
    },
    plugins: [
      svg({
        base64: false,
        stringify: true
      }),
      terser()
    ]
  }
];