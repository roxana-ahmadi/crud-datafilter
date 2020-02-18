/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { pipe } from '@js';

test('simple pipe', () => {
  expect(pipe()(/* init state/value */)).toEqual({});

  const initProps = 0;
  const incFunc = num => num + 1;
  expect(pipe(incFunc, incFunc)(initProps)).toBe(2);

  const initFunc = () => ({ num: 0 });
  const incNumFunc = x => ({ num: x.num + 1 });
  expect(pipe(initFunc, incNumFunc)()).toEqual({ num: 1 });
});
