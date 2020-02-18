/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { defer } from '@js';

test('defer, resolve', async () => {
  const doWork = () => {
    const promise = defer();
    setTimeout(() => promise.resolve(100), 300);
    return promise;
  };

  const res = await doWork();
  expect(res).toBe(100);
});

test('defer, reject', async () => {
  const doWork = () => {
    const promise = defer();
    setTimeout(() => promise.reject(-100), 300);
    return promise;
  };

  try {
    await doWork();
  } catch (err) {
    expect(err).toBe(-100);
  }
});

test('defer, notify and resolve', async () => {
  let counter = 0;
  const doWork = progress => {
    const promise = defer(progress);
    setTimeout(() => promise.notify(20), 100);
    setTimeout(() => promise.notify(20), 150);
    setTimeout(() => promise.notify(20), 200);
    setTimeout(() => promise.resolve(100), 300);
    return promise;
  };

  const progress = n => {
    expect(n).toBe(20);
    counter += 1;
  };
  const res = await doWork(progress);
  expect(res).toBe(100);
  expect(counter).toBe(3);
});

test('defer, notify and cancel', async () => {
  let counter = 0;
  const doWork = progress => {
    const promise = defer(progress);
    setTimeout(() => !promise.canceled && promise.notify(20), 100);
    setTimeout(() => !promise.canceled && promise.notify(20), 150);
    setTimeout(() => !promise.canceled && promise.notify(20), 200);
    setTimeout(() => promise.resolve(100), 300);
    return promise;
  };

  const progress = (n, cancel) => {
    if (counter === 2) {
      cancel();
      return;
    }
    expect(n).toBe(20);
    counter += 1;
  };
  const res = await doWork(progress);
  expect(res).toBe(undefined);
  expect(counter).toBe(2);
});

test('defer, queue and cancel', async () => {
  const doWork = progress => {
    const promise = defer(progress);
    setTimeout(() => {
      if (promise.canceled) {
        return;
      }
      promise.resolve(100);
    }, 300);
    return promise;
  };

  const works = [];
  for (let i = 0; i < 10; i += 1) {
    works.push(doWork());
  }

  for (let i = 0; i < 9; i += 1) {
    works[i].cancel();
  }

  const res = await Promise.all(works);
  for (let i = 0; i < 9; i += 1) {
    expect(res[i]).toBe(undefined);
  }
  expect(res[9]).toBe(100);
});
