/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, Select, Tree } from 'antd';
import operandController from './operandController';
import ClauseView from './ClauseView';
import filterIcon from './filter-icon';

const InputGroup = Input.Group;
const { Option } = Select;
const { TreeNode } = Tree;

const OperandView = props => {
  const {
    addClause,
    deleteChild,
    changeOperand,
    addOperand,
    data,
  } = operandController(props);
  const {
    fields,
    constraints,
    operandIndex,
    deleteOperand,
    makeMainQuery,
  } = props;

  const OperandNode = () => (
    <InputGroup compact>
      <Select defaultValue={data.op} onChange={value => changeOperand(value)}>
        <Option value="and">And</Option>
        <Option value="or">Or</Option>
      </Select>
      <Button icon="plus" onClick={() => addClause()} />
      <Button onClick={() => addOperand()}>
        <Icon component={filterIcon} />
      </Button>
      <Button icon="close" onClick={() => deleteOperand(operandIndex)} />
    </InputGroup>
  );

  return (
    <Tree defaultExpandAll>
      <TreeNode title={<OperandNode />}>
        {data.childs.map((item, index) => {
          if (item.op && item.childs.length >= 0) {
            return (
              <TreeNode
                key={index}
                title={
                  <OperandView
                    makeMainQuery={makeMainQuery}
                    filterData={item}
                    deleteOperand={deleteChild}
                    constraints={props.constraints}
                    fields={props.fields}
                    operandIndex={index}
                  />
                }
              />
            );
          }
          if (item) {
            return (
              <TreeNode
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={
                  <ClauseView
                    deleteClause={deleteChild}
                    queryIndex={index}
                    query={item}
                    fields={fields}
                    constraints={constraints}
                  />
                }
              />
            );
          }
        })}
      </TreeNode>
    </Tree>
  );
};

OperandView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fields: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  constraints: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  operandIndex: PropTypes.object.isRequired,
  deleteOperand: PropTypes.func.isRequired,
  makeMainQuery: PropTypes.func.isRequired,
};

export default OperandView;
