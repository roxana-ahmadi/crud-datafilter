/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

if (!window.performance.now) {
  window.performance.now =
    window.performance.now ||
    window.performance.mozNow ||
    window.performance.msNow ||
    window.performance.oNow ||
    window.performance.webkitNow ||
    Date.now ||
    (() => +new Date());
}
