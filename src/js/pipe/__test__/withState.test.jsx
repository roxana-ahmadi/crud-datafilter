/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { withState } from '@js';

test('test withState, primitive state', () => {
  const { result } = renderHook(withState(0));
  const { state, updateState } = result.current;
  expect(state).toBe(0);
  act(() => updateState(1));
  expect(state).toBe(0); // old ref
  expect(result.current.state).toBe(1); // new ref
});

test('test withState, object state', () => {
  const { result } = renderHook(withState({ a: 1 }));
  const { state, updateState } = result.current;
  expect(state).toEqual({ a: 1 });
  act(() => updateState({ a: 2, c: 3 }));
  expect(result.current.state).toEqual({ a: 2, c: 3 });
});

test('test withState, custom name and init func', () => {
  let called = 0;
  const init = () => {
    called += 1;
    return 0;
  };
  const { result } = renderHook(withState(init, 'data', 'setData'));
  const { data, setData } = result.current;
  expect(data).toBe(0);
  act(() => setData(1));

  expect(result.current.data).toBe(1);
  expect(called).toBe(1);
});
