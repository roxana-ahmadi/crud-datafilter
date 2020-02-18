/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { timeout, defer } from '../promise';
import {
  convertToUint8Array,
  sha256HashSync,
  bytesModPow,
  addPadding,
  convertToArrayBuffer,
  convertToByteArray,
  aesEncryptSync,
  pqPrimeFactorization,
  aesDecryptSync,
} from './bin';
import { config } from '../config';
import CryptoWorker from './crypto.worker';

class Crypto {
  constructor() {
    this.webWorker = false;
    this.awaiting = {};
    this.taskID = 0;
    this.webCrypto =
      config.Modes.webcrypto &&
      window.crypto &&
      (window.crypto.subtle || window.crypto.webkitSubtle);
    this.useSha256Crypto =
      this.webCrypto && this.webCrypto.digest !== undefined;
    this.wasm = false; // todo add wasm
    if (window.Worker) {
      const tmpWorker = new CryptoWorker();
      tmpWorker.postMessage({ taskID: this.taskID, task: 'ready' });
      this.taskID += 1;
      tmpWorker.onmessage = e => {
        if (!this.webWorker) {
          this.webWorker = tmpWorker;
        } else {
          this.finalizeTask(e.data.taskID, e.data.result);
        }
      };
      tmpWorker.onerror = error => {
        console.error('CW error', error, error.stack);
        this.webWorker = false;
      };
    }
  }

  finalizeTask(taskID, result) {
    const deferred = this.awaiting[taskID];
    if (deferred !== undefined) {
      // console.log(dT(), 'CW done')
      console.log('CW done', deferred);

      deferred.resolve(result);
      delete this.awaiting[taskID];
    }
  }

  performTaskWorker(task, params, embed) {
    // console.log(dT(), 'CW start', task)
    const deferred = defer();

    this.awaiting[this.taskID] = deferred;

    params.task = task;
    params.taskID = this.taskID;
    (embed || this.webWorker).postMessage(params);

    this.taskID += 1;

    return deferred;
  }

  async sha256Hash(bytes) {
    if (this.useSha256Crypto) {
      const deferred = defer();
      const bytesTyped = Array.isArray(bytes)
        ? convertToUint8Array(bytes)
        : bytes;
      try {
        const digest = await this.webCrypto.digest(
          { name: 'SHA-256' },
          bytesTyped,
        );
        deferred.resolve(digest);
      } catch (e) {
        console.error('Crypto digest error', e);
        this.useSha256Crypto = false;
        deferred.resolve(sha256HashSync(bytes));
      }

      return deferred;
    }

    return timeout(() => sha256HashSync(bytes));
  }

  aesEncrypt(bytes, keyBytes, ivBytes) {
    if (this.wasm) {
      return this.performTaskWorker(
        'aes-encrypt',
        {
          bytes: addPadding(convertToArrayBuffer(bytes)),
          keyBytes: convertToArrayBuffer(keyBytes),
          ivBytes: convertToArrayBuffer(ivBytes),
        },
        this.wasm,
      );
    }
    return timeout(() =>
      convertToArrayBuffer(aesEncryptSync(bytes, keyBytes, ivBytes)),
    );
  }

  aesDecrypt(encryptedBytes, keyBytes, ivBytes) {
    if (this.wasm) {
      return this.performTaskWorker(
        'aes-decrypt',
        {
          encryptedBytes: addPadding(convertToArrayBuffer(encryptedBytes)),
          keyBytes: convertToArrayBuffer(keyBytes),
          ivBytes: convertToArrayBuffer(ivBytes),
        },
        this.wasm,
      );
    }
    return timeout(() =>
      convertToArrayBuffer(aesDecryptSync(encryptedBytes, keyBytes, ivBytes)),
    );
  }

  factorize(bytes) {
    bytes = convertToByteArray(bytes);
    if (this.wasm && bytes.length <= 8) {
      return this.performTaskWorker('factorize', { bytes }, this.wasm);
    }
    if (this.webWorker) {
      return this.performTaskWorker('factorize', { bytes });
    }
    return timeout(() => pqPrimeFactorization(bytes));
  }

  modPow(x, y, m) {
    if (this.webWorker) {
      return this.performTaskWorker('mod-pow', { x, y, m });
    }
    return timeout(() => bytesModPow(x, y, m));
  }
}
const crypto = new Crypto();
export default crypto;
