import { defaultCache }
import type { PrecacheEntry, SerwistGlobalConfig }
import { Serwist }

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface workerglobalscope extends serwistglobalconfig {
    __SW_MANIFEST: (precacheentry | string)[] | undefined;
  }
}

// eslint-disable-next-line no-undef
declare const self: serviceworkerglobalscope;eslint-disable-next-lineno-undefdeclareconstself

const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  precacheEntries: self.__SW_MANIFEST,
  runtimeCaching: defaultCache,
  skipWaiting: true,
})

serwist.addEventListeners()
