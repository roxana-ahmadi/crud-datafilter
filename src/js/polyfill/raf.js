/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

// requestAnimationFrame
let lastRafTime = 0;
const checkRaf = () => {
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${vendors[x]}CancelAnimationFrame`] ||
      window[`${vendors[x]}CancelRequestAnimationFrame`];
  }
};

checkRaf();

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = callback => {
    const currTime = performance.now();
    const frameDuration = 1000 / 60;
    const timeToCall = Math.max(0, frameDuration - (currTime - lastRafTime));
    lastRafTime = currTime + timeToCall;
    const id = window.setTimeout(
      () => callback(lastRafTime),
      Math.round(timeToCall),
    );
    return id;
  };

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = id => {
    clearTimeout(id);
  };
