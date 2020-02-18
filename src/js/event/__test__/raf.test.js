/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { raf } from '@js';
import puppeteer from 'puppeteer';

test('RAF, call event with request animation frame', async () => {
  const callback = jest.fn();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction('testRaf', () => raf(callback, 20));
  await page.evaluate(async () => {
    await window.testRaf();
  });
  await page.waitFor(300);
  expect(callback).toBeCalled();
});

test('RAF, cancel raf request', async () => {
  const callback = jest.fn();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction('testRaf', () => raf(callback, 20).cancel());
  await page.evaluate(async () => {
    await window.testRaf();
  });
  await page.waitFor(300);
  expect(callback).toBeCalledTimes(0);
});
