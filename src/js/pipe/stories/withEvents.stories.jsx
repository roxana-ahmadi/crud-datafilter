/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable */
import { Button } from '@storybook/react/demo';
import React, { useEffect, memo } from 'react';
import { pipe, withState, withHandlers, withEvents } from '@js';
import { action } from '@storybook/addon-actions';
import section from './section';

const useController = pipe(
  withState({ c: 'child', m: 'child_memo', d: 0 }),
  withHandlers({
    increment: ({ updateState }) => () =>
      updateState(s => ({ ...s, d: s.d + 1 })),
  }),
  withEvents({
    onInc: ({ updateState }) => () => updateState(s => ({ ...s, d: s.d + 1 })),
  }),
);

const Child = ({ name }) => {
  useEffect(() => {
    action(`{on ${name} update}`)();
  });
  return <Button>{name}</Button>;
};

const ChildMemo = memo(Child);

export const eventsHook = props => {
  const { state, increment, onInc } = useController(props);
  const { d, m, c } = state;
  return (
    <>
      <Button
        onClick={increment}
      >{`click increment!, child update, val:${d}`}</Button>
      <Button onClick={onInc}>{`click onInc!, child update, val:${d}`}</Button>
      <p>component vs memo component</p>
      <Child name={c} />
      <ChildMemo name={m} />
    </>
  );
};

export default {
  title: section,
};
