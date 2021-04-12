// prerender.config.ts
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  crawlUrls: false,
  staticSite: true,
  entryUrls: ['/'],
  hydrateOptions: _url => {
    return {
      runtimeLogging: true,
      prettyHtml: true,
      constrainTimeouts: true,
    };
  },
};
