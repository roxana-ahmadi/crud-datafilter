/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import emitter from './emitter';

// fn: ({...props, ...state, emitter}) => return [emitter_tokens];
const withEmitter = fn => (props = {}) => {
  const params = { ...props, emitter };
  if (fn) {
    useEffect(() => {
      // return array of token
      params.__tokens__ = fn.call(props, params);
    }, []);
  }

  // When you return a function in the callback passed to useEffect,
  // the returned function will be called before the component is
  // removed from the UI
  useEffect(
    () => () => {
      if (params.__tokens__ !== undefined) {
        params.__tokens__.map(t => t.remove()); // remove all registered tokens
      }
    },
    [],
  );

  return { ...props, emitter };
};

export default withEmitter;
