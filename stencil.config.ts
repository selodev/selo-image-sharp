import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import { externalModules } from './rollup.plugins';

export const config: Config = {
  namespace: 'selo-img-sharp',
  taskQueue: 'async',
  allowInlineScripts: true,
  hashFileNames: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
      polyfills: true,
    },
  ],
  rollupPlugins: {
    before: [...externalModules],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills(),
    ],
  },
  nodeResolve: { preferBuiltins: true, browser: true, extensions: ['.js', '.json'] },
  extras: { dynamicImportShim: true, shadowDomShim: true },
  devServer: { openBrowser: false, port: 4444, logRequests: true },
};
