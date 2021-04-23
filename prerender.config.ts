// prerender.config.ts
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  crawlUrls: true,
  staticSite: true,
  entryUrls: ['/'],
  hydrateOptions: _url => {
    return {
      runtimeLogging: true,
      prettyHtml: true,
      constrainTimeouts: false,
      timeout: 10000000,
      clientHydrateAnnotations: false,
      resourcesUrl: '',
      hashAssets: 'querystring',
      //hashAssets: 'querystring',
    };
  },
};
