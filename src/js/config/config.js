/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const config = {
  Modes: {
    test: window.location.search.indexOf('test=1') > 0,
    debug: window.location.search.indexOf('debug=1') > 0,
    http: window.location.search.indexOf('http=1') > 0,
    ssl:
      window.location.search.indexOf('ssl=1') > 0 ||
      (window.location.protocol === 'https:' &&
        window.location.search.indexOf('ssl=0') === -1),
    force_mobile: window.location.search.indexOf('mobile=1') > 0,
    force_desktop: window.location.search.indexOf('desktop=1') > 0,
    webcrypto: window.location.search.indexOf('webcrypto=0') === -1,
  },
  Navigator: {
    osX:
      (navigator.platform || '').toLowerCase().indexOf('mac') !== -1 ||
      (navigator.userAgent || '').toLowerCase().indexOf('mac') !== -1,
    msie: (navigator.userAgent || '').search(/MSIE | Trident\/|Edge\//) !== -1,
    retina: window.devicePixelRatio > 1,
    ffos: navigator.userAgent.search(/mobi.+Gecko/i) !== -1,
    ffos2p: navigator.userAgent.search(/mobi.+Gecko\/[34567]/i) !== -1,
    touch:
      (window.screen && window.screen.width <= 768) ||
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    mobile:
      (window.screen && window.screen.width && window.screen.width < 480) ||
      navigator.userAgent.search(
        /iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i,
      ) !== -1,
  },
  Mobile: false,
};

export const addConfig = sources => Object.assign(config, sources);
