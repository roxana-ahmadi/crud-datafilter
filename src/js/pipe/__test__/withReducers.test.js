/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { withReducers } from '@js';

test('test withReducers, change state in reducers', () => {
  const initValue = { b: false };
  const reducers = {
    onFunc: () => ({ b }) => ({ b }), // { return { b } }
    addNewPropState: () => ({ c }) => ({ c }),
  };
  const { result } = renderHook(() => withReducers(initValue, reducers)());
  const { b, onFunc, addNewPropState } = result.current;
  expect(b).toEqual(false);
  act(() => onFunc({ b: true }));
  expect(result.current.b).toEqual(true);

  act(() => addNewPropState({ c: 10 }));
  expect(result.current.c).toEqual(10);
});

test('test withReducers, unchanged state reducer', () => {
  const initValue = { b: true };
  const reducers = {
    onFunc: () => () => undefined, // reducer return undefined
  };
  const { result } = renderHook(() => withReducers(initValue, reducers)());
  const { onFunc } = result.current;

  act(() => onFunc());
  expect(result.current.b).toBe(true);
});

test('test withReducers, init and props', () => {
  const initProps = { c: 10 };
  const reducers = {
    onFunc: () => ({ b }) => ({ b }),
  };
  const initValue = () => ({ b: false });
  const { result } = renderHook(() =>
    withReducers(initValue, reducers)(initProps),
  );
  const { b: initB, onFunc } = result.current;
  expect(initB).toBe(false);

  act(() => onFunc({ b: true }));
  const { b, c } = result.current;
  expect(b).toBe(true);
  expect(c).toBe(10);
});
