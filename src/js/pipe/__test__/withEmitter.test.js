/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { withEmitter } from '@js';
import { renderHook } from '@testing-library/react-hooks';
import eventEmitter from '../emitter';

test('test withEmitter', () => {
  const listener = ({ emitter }) => {
    const token = emitter.addListener('event_name', data => {
      expect(data).toBe(10);
    });
    return [token];
  };

  renderHook(() => withEmitter(listener)());
  eventEmitter.emit('event_name', 10);
});
