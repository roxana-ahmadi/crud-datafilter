/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable */
import { Button } from '@storybook/react/demo';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { emitter, startForegroundDetector, IDLE_EVENT } from '@js';

export const ForegroundDetection = () => {
  const onClick = () => {
    startForegroundDetector();
    emitter.addListener(IDLE_EVENT, d => {
      action('active?')(!d);
    });
  };

  return (
    <Button onClick={onClick}>
      see actions: keypress, mouse click, and change tap, finally wait for 30s
      to get inactive event
    </Button>
  );
};

export default {
  title: 'core|Event',
};
