/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export default progress => {
  let gResolve;
  let gReject;
  const promise = new Promise((resolve, reject) => {
    gReject = reject;
    gResolve = resolve;
  });

  promise.reject = err => gReject(err);
  promise.resolve = data => gResolve(data);
  promise.notify = data => {
    if (progress) {
      progress(data, promise.cancel);
    }
  };

  promise.canceled = false;
  promise.cancel = err => {
    promise.canceled = true;
    if (err) {
      gReject(err);
    } else {
      gResolve();
    }
  };

  return promise;
};
