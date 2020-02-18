/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

// storybook error:
//   React Hook "useRef" is called in function "withEvent" which
/* eslint-disable */
import { useRef, useLayoutEffect, useMemo } from 'react';

const a = 10;
const withEvent = fn => {
  const ref = useRef();
  // useLayoutEffect:
  // The signature is identical to useEffect, but it fires synchronously after
  // all DOM mutations. Use this to read layout from the DOM and synchronously
  // re-render. Updates scheduled inside useLayoutEffect will be flushed
  // synchronously, before the browser has a chance to paint.
  //
  // Prefer the standard useEffect when possible
  // to avoid blocking visual updates.
  useLayoutEffect(() => {
    ref.current = fn;
  });
  // https://stackoverflow.com/questions/11541134/javascript-syntax-0-fnargs
  // (0, func)()?
  // comma operand is used to remove this!
  //
  // foo.func(); // in func this = foo
  // var g = foo.func;
  // g(); // in g this = window
  //
  // (0, foo.func)()
  // ---------------
  // let f = (0, foo.func)
  // f(); // in g this = window
  return useMemo(() => (...args) => (0, ref.current)(...args), []);
};

const withEvents = handlers => (props = {}) => {
  const realHandlers = useMemo(
    () => (typeof handlers === 'function' ? handlers(props) : handlers),
    [],
  );

  const actionTypes = Object.keys(realHandlers);

  const boundHandlers = actionTypes.reduce(
    (obj, type) =>
      Object.assign(obj, {
        // note about handler syntax: (props) => (payload) => {}
        [type]: withEvent((...payload) =>
          realHandlers[type](props)(...payload),
        ),
      }),
    {},
  );

  return { ...props, ...boundHandlers };
};

export default withEvents;
