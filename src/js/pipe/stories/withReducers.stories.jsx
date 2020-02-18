/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@storybook/react/demo';
import { withReducers } from '@js';
import section from './section';

const Component = () => {
  const useCounter = withReducers(
    { val: 0 },
    {
      // func_name: ({...state, ...props}) => (func_parameters) => {func_body}
      increment: ({ val }) => () => ({ val: val + 1 }),
      decrement: ({ val }) => () => ({ val: val - 1 }),
      add: ({ val }) => i => ({ val: val + i }),
    },
  );
  const { val, increment, decrement, add } = useCounter();
  return (
    <>
      <p>{`You clicked ${val} times`}</p>
      <Button onClick={increment}>inc</Button>
      <Button onClick={decrement}>dec</Button>
      <Button onClick={() => add(10)}>add + 10</Button>
    </>
  );
};

export const reducerHook = () => <Component val={10} />;

export default {
  title: section,
};
