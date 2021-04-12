import { Config } from '@stencil/core';
import { externalModules } from './rollup.plugins';

export const config: Config = {
  namespace: 'selo-image-sharp',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
    },
  ],
  rollupPlugins: {
    before: [...externalModules],
    after: [
      // Plugins injected after commonjs()
      //nodePolyfills(),
    ],
  },
  nodeResolve: { preferBuiltins: true, browser: false },
  devServer: { openBrowser: false },
};
