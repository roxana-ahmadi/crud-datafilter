/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { emitter } from '../pipe';
import { timeout } from '../promise';
import { config } from '../config';

export const IDLE_EVENT = 'idle.isIDLE';

// when page is idle emit idle.isIDLE
class Idle {
  constructor() {
    this.isIDLE = false;
    this.started = false;

    // see https://whatwebcando.today/foreground-detection.html
    this.hidden = 'hidden';
    this.visibilityChange = 'visibilitychange';
    if (typeof document.hidden !== 'undefined') {
      // default
    } else if (typeof document.mozHidden !== 'undefined') {
      this.hidden = 'mozHidden';
      this.visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }
    if (!config.Mobile) {
      this.visibilityChange = '';
    }

    this.timeout = false;
    this.debouncePromise = false;
    // in order to add and remove in bind mode
    this.onEvent = this.onEvent.bind(this);
  }

  start() {
    if (this.started) return;
    this.started = true;
    window.addEventListener('mousedown', this.onEvent);
    window.addEventListener('keydown', this.onEvent);
    window.addEventListener('focus', this.onEvent);
    window.addEventListener('blur', this.onEvent);
    window.addEventListener('touchstart', this.onEvent);
    if (this.visibilityChange !== '') {
      document.addEventListener(this.visibilityChange, this.onEvent);
    }

    setTimeout(() => this.onEvent({ type: 'blur', fake_initial: true }), 0);
  }

  onEvent(e) {
    if (e.type === 'mousemove') {
      const originalEvent = e.originalEvent || e;
      if (
        originalEvent &&
        originalEvent.movementX === 0 &&
        originalEvent.movementY === 0
      ) {
        return;
      }
      window.removeEventListener('mousemove', this.onEvent);
    }

    let isIDLE = !!(e.type === 'blur' || e.type === 'timeout');
    if (this.hidden && document[this.hidden]) {
      isIDLE = true;
    }

    if (this.timeout) {
      this.timeout.cancel();
    }
    if (!isIDLE) {
      this.timeout = timeout(() => this.onEvent({ type: 'timeout' }), 30000);
    }

    if (e.type === 'focus' && !this.idleAfterFocus) {
      this.idleAfterFocus = true;
      setTimeout(() => {
        this.idleAfterFocus = false;
      }, 10);
    }

    if (this.debouncePromise) {
      this.debouncePromise.cancel();
    }

    if (this.isIDLE === isIDLE) {
      return;
    }

    this.debouncePromise = timeout(() => {
      this.isIDLE = isIDLE;
      emitter.emit(IDLE_EVENT, isIDLE);
      if (isIDLE && e.type === 'timeout') {
        // when page is active but without any change in previous 30s
        window.addEventListener('mousemove', this.onEvent);
      }
    }, 1000);
  }
}

export const startForegroundDetector = () => new Idle().start();
