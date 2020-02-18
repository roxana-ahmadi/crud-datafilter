/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@storybook/react/demo';
import { withHandlers, pipe, withState } from '@js';
import section from './section';

const Counter = props => {
  const useCounter = pipe(
    // init state value => {count:0}
    // setCount is a func to set count value
    withState(0, 'count', 'setCount'),
    withHandlers({
      // func_name: ({...state, ...props}) => (func_parameters) => {func_body}
      increment: ({ count, setCount }) => () => setCount(count + 1),
      decrement: ({ count, setCount }) => () => setCount(count - 1),
      incrementAsync: ({ count, setCount }) => () =>
        setTimeout(() => setCount(count + 1), 1000),
      add: ({ count, setCount }) => i => setCount(count + i),
    }),
  );

  const { val, count, increment, decrement, incrementAsync, add } = useCounter(
    props,
  );
  return (
    <>
      <p>{`You clicked ${count} times`}</p>
      <Button onClick={increment}>inc</Button>
      <Button onClick={incrementAsync}>async inc(after 1s)</Button>
      <Button onClick={decrement}>dec</Button>
      <Button onClick={() => add(val)}>{`add + ${val}`}</Button>
    </>
  );
};

export const handlerHook = () => <Counter val={20} />;

export default {
  title: section,
  component: Counter,
};
