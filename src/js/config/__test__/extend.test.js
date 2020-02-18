/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

test('extend object', () => {
  const config = { a: 10 };
  const ref = config;
  //   config = { ...config, b: 200 };
  Object.assign(config, { b: 200 });
  expect(ref).toEqual(config);
});
