/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';
import { withHandlers, pipe, withState, withLifeCycle } from '@js';
import section from './section';

const Component = ({ onDestroy }) => {
  const useLifeCycle = pipe(
    withState(0), // state, updateState
    withHandlers({
      // increment: call updateState => caused re-render component
      increment: ({ state, updateState }) => () => updateState(state + 1),
    }),
    withLifeCycle({
      onCreate: ({ state }) => action('onCreate')(state),
      onDestroy: ({ state }) => action('onDestroy')(state),
      onUpdate: ({ state }) => action('onUpdate, previous state')(state),
    }),
  );

  const { state, increment } = useLifeCycle();
  return (
    <>
      <p>{`You clicked ${state} times`}</p>
      <Button onClick={increment}>inc</Button>
      <Button onClick={() => onDestroy(1)}>new component</Button>
    </>
  );
};

const AnotherComponent = () => <div>pervious component destroyed!</div>;

export const lifeCycleHook = () => {
  const { destroy, onDestroy } = withState(0, 'destroy', 'onDestroy')();
  if (destroy) {
    return <AnotherComponent />;
  }

  return <Component onDestroy={onDestroy} />;
};

export default {
  title: section,
};
