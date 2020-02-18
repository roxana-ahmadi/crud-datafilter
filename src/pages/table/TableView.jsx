import React from 'react';
import Parse from 'parse';
import { Map } from 'immutable';
import {
  Table,
  Divider,
  Button,
  Input,
  Icon,
  Row,
  Col,
  PageHeader,
  Modal,
} from 'antd';
import { OprandView } from '@widgets';
import tableController from './tableController';

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

const ClouseQuery = Parse.Object.extend('ClouseQuery');

const mainQuery = new Parse.Query(ClouseQuery);

const filterData = {
  op: 'and',
  childs: [],
  mainQuery,
  searchResults: [],
};

const doNothing = () => {};

const TableView = () => {
  const {
    data,
    addPerson,
    setPersonName,
    deletePerson,
    editPerson,
    confirmEdit,
    makeMainQuery,
    showDatafilter,
    closeDatafilter,
  } = tableController();

  const columns = [
    {
      title: 'objectId',
      dataIndex: 'objectId',
      key: 'objectId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon
            type="delete"
            key="delete"
            onClick={() => deletePerson(record.key)}
          />
          <Divider type="vertical" />
          <Icon type="edit" key="edit" onClick={() => editPerson(record.key)} />
        </span>
      ),
    },
  ];

  const dataSource = data.personsList.map((item, key) => ({
    ...item.toJSON(),
    key,
  }));

  return (
    <div>
      <PageHeader>
        <Button onClick={() => showDatafilter()}>Search</Button>
        <Modal
          footer={[
            <Button key="Cancle" onClick={() => closeDatafilter()}>
              Cancle
            </Button>,
            <Button
              key="Search"
              type="primary"
              onClick={() => makeMainQuery(data.tmpdata)}
            >
              Search
            </Button>,
          ]}
          onCancel={() => closeDatafilter()}
          visible={data.dataFilterVisible}
          title="Search"
        >
          <OprandView
            deleteOprand={doNothing}
            makeMainQuery={makeMainQuery}
            filterData={filterData}
            constraints={constraints}
            fields={fields}
          />
        </Modal>
      </PageHeader>

      <Row style={{ padding: 24 }}>
        <Col span={8}>
          {data.editing && <h1>Edit Mode</h1>}
          <Input
            placeholder="name"
            value={data.personName}
            onChange={e => setPersonName(e.target.value)}
          />
        </Col>
        <Col span={8}>
          {!data.editing && <Button onClick={() => addPerson()}>add</Button>}
          {data.editing && (
            <Button onClick={() => confirmEdit()}>confirm edit</Button>
          )}
        </Col>
      </Row>
      <Row style={{ padding: 24 }}>
        <Col span={12}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </div>
  );
};

export default TableView;
