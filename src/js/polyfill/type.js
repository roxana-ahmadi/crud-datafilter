/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const isFunction = obj => {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

export const isArray = arr => {
  return Array.isArray(arr) || arr instanceof Array;
};

export const isObject = obj => {
  return !!obj && typeof obj === 'object' && !isArray(obj);
};

export const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};
