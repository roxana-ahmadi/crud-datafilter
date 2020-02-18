/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable no-return-assign */
import { renderHook, act } from '@testing-library/react-hooks';
import { withHandlers } from '@js';

test('test withHandlers, reducer object', () => {
  let res = null;
  const reducers = {
    // handler: (props) => (payload) => {}
    onFunc: ({ a }) => ({ b }) => {
      res = { a, b };
    },
  };
  const initProps = { a: true };
  const { result } = renderHook(() => withHandlers(reducers)(initProps));
  const { a, onFunc } = result.current;

  expect(a).toBe(true);
  act(() => onFunc({ b: true }));
  expect(res).toEqual({ a: true, b: true });
});

test('test withHandlers, reducer func', () => {
  let called = 0;
  let res = null;
  const reducers = () => {
    called += 1;
    return {
      // handler: (props) => (payload) => {}
      onFunc: ({ a }) => ({ b }) => {
        res = { a, b };
      },
    };
  };
  const initProps = { a: true };
  const { result } = renderHook(() => withHandlers(reducers)(initProps));
  const { a, onFunc } = result.current;
  expect(a).toBe(true);
  act(() => onFunc({ b: true }));
  expect(res).toEqual({ a: true, b: true });
  expect(called).toBe(1);

  act(() => onFunc({ c: true }));
  expect(called).toBe(1);
  expect(res).toEqual({ a: true, b: undefined });
});
