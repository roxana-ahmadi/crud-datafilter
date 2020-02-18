/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

// RequestAnimationFrame
class Raf {
  constructor(fn, duration) {
    this.state = 0;
    this.start = 0;
    if (this.rafId !== 0) {
      window.cancelAnimationFrame(this.rafId);
    }
    this.rafId = window.requestAnimationFrame(timestamp =>
      this.step(timestamp),
    );
    this.duration = duration;
    this.fn = fn;
  }

  step(timestamp) {
    if (!this.start) this.start = timestamp;
    if (this.state > 0) return; // end or cancel
    const progress = timestamp - this.start;
    this.fn(progress);

    if (progress < this.duration) {
      this.rafId = window.requestAnimationFrame(t => this.step(t));
    } else {
      this.state = 2; // end
    }
  }

  cancel() {
    if (!this.state) {
      this.state = 1; // cancel
      window.cancelAnimationFrame(this.rafId);
    }
  }
}

export default (fn, duration) => new Raf(fn, duration);
