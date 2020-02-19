import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe } from '@js';

const ClauseQuery = Parse.Object.extend('ClauseQuery');

const init = props => props.filterData;

const addClause = ({ setData, data, makeMainQuery }) => () => {
  const query = new Parse.Query(ClauseQuery);
  const newd = data.set('childs', data.childs.concat(query));
  setData(newd);
  makeMainQuery(newd);
};

const deleteChild = ({ setData, data, makeMainQuery }) => index => {
  const newd = data.set(
    'childs',
    data.childs.filter((value, i) => i !== index),
  );
  setData(newd);
  makeMainQuery(newd);
};

const changeOperand = ({ setData, data, makeMainQuery }) => operand => {
  const newd = data.set('op', operand);
  setData(newd);
  makeMainQuery(newd);
};

const addOperand = ({ setData, data, makeMainQuery }) => () => {
  const query = new Parse.Query(ClauseQuery);
  const newd = data.set(
    'childs',
    data.childs.concat(Record({ op: 'and', childs: [], mainQuery: query })()),
  );
  setData(newd);
  makeMainQuery(newd);
};

const operandController = pipe(
  withState(init, 'data', 'setData'),
  withHandlers({
    addClause,
    deleteChild,
    changeOperand,
    addOperand,
  }),
);

export default operandController;
