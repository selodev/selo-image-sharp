// prerender.config.ts
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  crawlUrls: false,
  staticSite: false,
  entryUrls: ['/'],
  hydrateOptions: _url => {
    return {
      runtimeLogging: true,
      prettyHtml: true,
      constrainTimeouts: false,
      timeout: 10000000,
      //hashAssets: 'querystring',
    };
  },
};
