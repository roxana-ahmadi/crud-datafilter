/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable no-return-assign */
import { renderHook } from '@testing-library/react-hooks';
import { withLifeCycle } from '@js';

test('test withLifeCycle, onCreate called only once', () => {
  let called = 0;
  const props = { a: 1 };
  const reducers = {
    // handler: (props) => {}
    onCreate: ({ a }) => {
      called += 1;
      expect(a).toBe(1);
      // eslint-disable-next-line no-param-reassign
      a = 2;
    },
  };
  const { rerender } = renderHook(() => withLifeCycle(reducers)(props));
  expect(called).toBe(1);
  expect(props.a).toBe(1);

  rerender();

  expect(called).toBe(1);
  expect(props.a).toBe(1);
});

test('test withLifecycle, onDestroy called at unmount', () => {
  let called = 0;
  const props = { a: 1 };
  const reducers = {
    // handler: (props) => {}
    onDestroy: ({ a }) => {
      called += 1;
      expect(a).toBe(1);
    },
  };
  const { unmount, rerender } = renderHook(() =>
    withLifeCycle(reducers)(props),
  );
  expect(called).toBe(0);
  rerender();
  unmount();
  expect(called).toBe(1);
});

test('test withLifecycle, onUpdate called in every render', () => {
  let called = 0;
  const props = { a: 1 };
  const reducers = {
    // handler: (props) => {}
    onUpdate: ({ a }) => {
      called += 1;
      /* eslint-disable no-unused-expressions */
      called === 1 && expect(a).toBe(undefined);
      called === 2 && expect(a).toBe(1);
      /* eslint-disable no-unused-expressions */
    },
  };
  const { rerender } = renderHook(() => withLifeCycle(reducers)(props));
  expect(called).toBe(1);
  rerender();
  expect(called).toBe(2);
});
