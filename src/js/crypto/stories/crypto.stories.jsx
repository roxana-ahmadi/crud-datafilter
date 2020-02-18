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
import { crypto } from '@js';
import { bytesToHex, bytesFromArrayBuffer } from '../bin';

export const Sha256Hash = () => {
  const onClick = async () => {
    const sha256 = await crypto.sha256Hash([1, 2, 3]);
    action('sha256Hash')(
      sha256,
      bytesToHex(bytesFromArrayBuffer(sha256)) ===
        '039058c6f2c0cb492c533b0a4d14ef77cc0f78abccced5287d84a1a2011cfb81',
    );
  };
  return <Button onClick={onClick}>Sha256, see worker thread</Button>;
};

export const AesEncrypt = () => {
  const onClick = async () => {
    const got =
      'af507156ad37da662091d4be60785e9e9cda022acc4a345d05000000100000009f359992f401000096000000a861000024e8c118bd50a595877bd2c57d4813c752102b3c824b76989473e80edba80b71fac3300c869b247b9bfd5fe8ca4c1244e342f40e768610d18c7e1662b79311ea';
    const wanted =
      '07dbd1c8db96ef556ca0b4800130bcc4a7f0c9095b9db5a6b7ff0257192b2593d5d9fa532273f6656ad3ba6532fd4a833762e3ecd1358d8e2054c35f2daa9e63e1eaffbb6442bda010b11ce7ab8dd970c7499a67992218ad7bfae11b02f859188f75dcc81c7d74390e7e9a161d6e5218';

    const k1 = [
      255,
      8,
      154,
      197,
      222,
      10,
      112,
      222,
      63,
      231,
      64,
      173,
      76,
      204,
      83,
      229,
      77,
      177,
      149,
      107,
      180,
      135,
      1,
      23,
      78,
      230,
      26,
      71,
      253,
      150,
      175,
      24,
    ];
    const k2 = [
      53,
      71,
      224,
      228,
      216,
      56,
      167,
      236,
      21,
      241,
      164,
      107,
      180,
      185,
      108,
      151,
      55,
      133,
      5,
      255,
      195,
      228,
      210,
      64,
      80,
      137,
      223,
      195,
      45,
      23,
      53,
      188,
    ];
    const aes = await crypto.aesEncryptSync(binUtils.bytesFromHex(got), k1, k2);
    action('aes')(aes, bytesToHex(aes) === wanted);
  };
  return <Button onClick={onClick}>Aes, see worker thread</Button>;
};

export const ModPow = () => {
  const onClick = async () => {
    const modPow = await crypto.modPow([2, 2, 2], [1, 2, 3], [1, 2, 3]);
    action('modPow')(modPow, modPow[0] === 55 && modPow[1] === 158);
  };
  return <Button onClick={onClick}>ModPow, see worker thread</Button>;
};

export default {
  title: 'core|Crypto',
};
