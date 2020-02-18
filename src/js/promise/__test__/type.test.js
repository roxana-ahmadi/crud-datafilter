/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { isFunction, isArray, isObject, isPromise } from '@js';

class C {}
test('not and not-not', () => {
  const n = null;
  const u = undefined;

  expect(!n).toBe(true);
  expect(!!n).toBe(false);

  expect(!u).toBe(true);
  expect(!!u).toBe(false);
});

test('isFunction', () => {
  expect(isFunction(0)).toBe(false);
  expect(isFunction('')).toBe(false);
  expect(isFunction('abc')).toBe(false);
  expect(isFunction(0.5)).toBe(false);
  expect(isFunction(undefined)).toBe(false);
  expect(isFunction(null)).toBe(false);
  expect(isFunction([])).toBe(false);
  expect(isFunction(new Array(10))).toBe(false);
  expect(isFunction({})).toBe(false);
  expect(isFunction(new C())).toBe(false);

  const fn1 = () => {};
  expect(isFunction(fn1)).toBe(true);

  function fn2() {}
  expect(isFunction(fn2)).toBe(true);

  const fn3 = () => () => {};
  expect(isFunction(fn3)).toBe(true);
});

test('isArray', () => {
  expect(isArray(0)).toBe(false);
  expect(isArray('')).toBe(false);
  expect(isArray('abc')).toBe(false);
  expect(isArray(0.5)).toBe(false);
  expect(isArray(undefined)).toBe(false);
  expect(isArray(null)).toBe(false);
  expect(isArray({})).toBe(false);
  expect(isArray(new C())).toBe(false);

  const fn1 = () => {};
  expect(isArray(fn1)).toBe(false);

  function fn2() {}
  expect(isArray(fn2)).toBe(false);

  const fn3 = () => () => {};
  expect(isArray(fn3)).toBe(false);

  expect(isArray([])).toBe(true);
  expect(isArray(new Array(10))).toBe(true);
});

test('isObject', () => {
  expect(isObject(0)).toBe(false);
  expect(isObject('')).toBe(false);
  expect(isObject('abc')).toBe(false);
  expect(isObject(0.5)).toBe(false);
  expect(isObject(undefined)).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject([])).toBe(false);
  expect(isObject(new Array(10))).toBe(false);

  const fn1 = () => {};
  expect(isObject(fn1)).toBe(false);

  function fn2() {}
  expect(isObject(fn2)).toBe(false);

  const fn3 = () => () => {};
  expect(isObject(fn3)).toBe(false);

  expect(isObject({})).toBe(true);
  expect(isObject({ a: 10 })).toBe(true);
  expect(isObject(new C())).toBe(true);
});

test('isPromise', () => {
  expect(isPromise(0)).toBe(false);
  expect(isPromise(1)).toBe(false);
  expect(isPromise('')).toBe(false);
  expect(isPromise('abc')).toBe(false);
  expect(isPromise(0.5)).toBe(false);
  expect(isPromise(undefined)).toBe(false);
  expect(isPromise(null)).toBe(false);
  expect(isPromise([])).toBe(false);
  expect(isPromise(new Array(10))).toBe(false);
  expect(isPromise({})).toBe(false);
  expect(isPromise(new C())).toBe(false);

  const fn1 = () => {};
  expect(isPromise(fn1)).toBe(false);

  function fn2() {}
  expect(isPromise(fn2)).toBe(false);

  const fn3 = () => () => {};
  expect(isPromise(fn3)).toBe(false);

  expect(isPromise(Promise.reject())).toBe(true);
  expect(isPromise(Promise.resolve())).toBe(true);
  const fn = () => {};
  fn.then = () => {};
  expect(isPromise(fn)).toBe(true);

  // expect(Promise.resolve(1)).toBe(true);
  // const p = new Promise((resolve, reject) => {});
  // expect(p).toBe(true);
});
