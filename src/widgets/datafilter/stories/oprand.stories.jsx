import React from 'react';
import { Map } from 'immutable';
import 'antd/dist/antd.css';
import Parse from 'parse';
import OprandView from '../OprandView';

export default {
  title: 'CRUD-app',
};

const ClouseQuery = Parse.Object.extend('ClouseQuery');
const mainQuery = new Parse.Query(ClouseQuery);

const fields = Map({
  name: 'string',
  id: 'number',
  date: 'time',
  boolean: 'boolean',
});

const constraints = Map({
  string: [
    'Contains',
    'StartsWith',
    'EndsWith',
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsEmpty',
    'NotIsEmpty',
    'IsNull',
    'NotIsNull',
  ],
  number: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  time: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  boolean: [],
  default: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
});
const filterData = {
  op: 'and',
  childs: [],
  mainQuery,
  searchResults: [],
};

export const Oprand = () => (
  <OprandView
    filterData={filterData}
    constraints={constraints}
    fields={fields}
    operandIndex={2}
  />
);
