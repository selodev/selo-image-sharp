import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { externalModules } from './rollup.plugins';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export const config: Config = {
  namespace: 'selo-img-sharp',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'assets' }],
      //copy: [{ src: 'sharp-worker.js', warn: true }],
    },
    {
      type: 'dist-custom-elements-bundle',
      externalRuntime: true,
      //inlineDynamicImports: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      baseUrl: 'http://localhost:4444',
      prerenderConfig: './prerender.config.ts',
      //polyfills: true,
      copy: [{ src: 'assets' }],
    },
  ],
  plugins: [
    dynamicImportVars({
      warnOnError: true,
      exclude: './src/**/locale.*.json',
      include: './src/***',
    }),
  ],
  rollupPlugins: {
    before: [...externalModules],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills(),
    ],
  },
  enableCache:false,
  nodeResolve: {
    preferBuiltins: true,
    browser: true,
    //extensions: ['.ts', '.js', '.json'],
  },
  //extras: { dynamicImportShim: true, shadowDomShim: true, safari10: true },
  devServer: { openBrowser: false, port: 4444, logRequests: true },
};
