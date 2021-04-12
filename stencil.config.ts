import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import { externalModules } from './rollup.plugins';

export const config: Config = {
  namespace: 'selo-image-sharp',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      //copy: [{ src: 'sharp-worker.js', warn: true }],
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      baseUrl: 'http://test.com',
      prerenderConfig: './prerender.config.ts',
    },
  ],
  rollupPlugins: {
    before: [...externalModules],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills(),
    ],
  },
  nodeResolve: { preferBuiltins: true, browser: true },
  extras: { dynamicImportShim: true, shadowDomShim: true },
  devServer: { openBrowser: false, port: 4444, logRequests: true },
};
