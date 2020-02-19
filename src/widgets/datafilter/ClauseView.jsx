/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, DatePicker, Select, Switch } from 'antd';
import clauseController from './clauseController';

const InputGroup = Input.Group;
const { Option } = Select;

const fieldOptions = fields => {
  const fieldNames = Array.from(fields.keys());
  return fieldNames.map((item, index) => (
    <Option key={index} value={item}>
      {item.toUpperCase()}
    </Option>
  ));
};

const constraintOptions = (constraints, fields, fieldName) => {
  const fieldType = fields.get(fieldName);
  const constrains = Array.from(constraints.get(fieldType));
  return constrains.map((item, index) => (
    <Option key={index} value={item}>
      {item.toUpperCase()}
    </Option>
  ));
};

const ClauseView = props => {
  const { deleteClause, queryIndex, fields, constraints } = props;
  const { setFieldName, data, setConstraint, setFieldValue } = clauseController(
    props,
  );
  const jSonQuery = props.query.toJSON();

  const generateInputByType = fieldType => {
    switch (fieldType) {
      case 'string':
        return (
          <Input
            value={Object.values(jSonQuery.where)[0] || null}
            style={{ width: '9.5vw' }}
            placeholder="String"
            onChange={e => setFieldValue(e.target.value)}
          />
        );
      case 'time':
        return (
          <DatePicker
            style={{ width: '9.5vw' }}
            onChange={(date, dateString) => setFieldValue(dateString)}
          />
        );
      case 'number':
        return (
          <Input
            value={Object.values(jSonQuery.where)[0] || null}
            style={{ width: '9.5vw' }}
            placeholder="Number"
            type="number"
            onChange={e => setFieldValue(e.target.value)}
          />
        );
      case 'boolean':
        return <Switch style={{ marginLeft: '10px' }} />;

      default:
        return <Input style={{ width: '10vw' }} disabled />;
    }
  };

  return (
    <InputGroup compact>
      <span>
        <Select
          style={{ width: '5vw' }}
          defaultValue={Object.keys(jSonQuery.where)[0] || 'name'}
          onChange={value => setFieldName(value)}
        >
          {fieldOptions(fields)}
        </Select>
        <Select
          style={{ width: '7vw' }}
          defaultValue="EqualTo"
          onChange={value => setConstraint(value)}
        >
          {constraintOptions(constraints, fields, data.fieldName)}
        </Select>
        {generateInputByType(
          fields.get(Object.keys(jSonQuery.where)[0] || data.fieldName),
        )}
        <Button icon="close" onClick={() => deleteClause(queryIndex)} />
      </span>
    </InputGroup>
  );
};

ClauseView.propTypes = {
  deleteClause: PropTypes.func.isRequired,
  queryIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  fields: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  constraints: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  query: PropTypes.object.isRequired,
};

export default ClauseView;
