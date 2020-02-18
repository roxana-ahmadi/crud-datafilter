/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@storybook/react/demo';
import { withState } from '@js';
import section from './section';

const Component = props => {
  const useState = withState({ title: 'title state' });
  const { val, state, updateState } = useState(props);
  const onClick = () => {
    updateState({ title: 'new title' });
  };
  return (
    <>
      <Button>{`val from props ${val}`}</Button>
      <Button onClick={onClick}>{state.title}</Button>
    </>
  );
};

export const stateHook = () => <Component val={10} />;

export default {
  title: section,
};
