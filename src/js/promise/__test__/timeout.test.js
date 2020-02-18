/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { timeout } from '@js';

test('timeout, simple queue', async () => {
  let called = 0;
  const fn = () => {
    called += 1;
  };
  const n = 10;
  const works = [];
  for (let i = 0; i < n; i += 1) {
    works.push(timeout(fn, 100));
  }

  await Promise.all(works);
  expect(called).toBe(n);
});

test('timeout, cancel', async () => {
  let called = 0;
  const fn = () => {
    called += 1;
  };
  const n = 10;
  const works = [];
  for (let i = 0; i < n; i += 1) {
    works.push(timeout(fn, 100));
  }

  for (let i = 0; i < n; i += 1) {
    works[i].cancel();
  }
  await Promise.all(works);
  expect(called).toBe(0);
});

test('timeout, cancel with err', async () => {
  let called = 0;
  const fn = () => {
    called += 1;
  };
  const n = 10;
  const works = [];
  for (let i = 0; i < n; i += 1) {
    works.push(timeout(fn, 100));
  }

  for (let i = 0; i < n; i += 1) {
    works[i].cancel(new Error('timeout canceled'));
  }
  try {
    await Promise.all(works);
  } catch (err) {
    expect(called).toBe(0);
  }
});
