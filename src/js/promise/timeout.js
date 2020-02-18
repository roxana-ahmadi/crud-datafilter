/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export default (fn, delay) => {
  let gResolve;
  let gReject;
  let timeoutId;
  const promise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      try {
        resolve(fn());
      } catch (e) {
        reject(e);
      }
    }, delay || 0);

    gReject = reject;
    gResolve = resolve;
  });

  promise.cancel = err => {
    clearTimeout(timeoutId);
    if (err) {
      gReject(err);
    } else {
      gResolve();
    }
  };
  return promise;
};
