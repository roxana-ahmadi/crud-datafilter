import React from 'react';
import { Map } from 'immutable';
import 'antd/dist/antd.css';
import Parse from 'parse';
import OperandView from '../OperandView';

export default {
  title: 'CRUD-app',
};

const ClauseQuery = Parse.Object.extend('ClauseQuery');
const mainQuery = new Parse.Query(ClauseQuery);

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

export const Operand = () => (
  <OperandView
    filterData={filterData}
    constraints={constraints}
    fields={fields}
    operandIndex={2}
  />
);
