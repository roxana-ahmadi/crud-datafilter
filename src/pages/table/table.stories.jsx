import React from 'react';
import Parse from 'parse';
import 'antd/dist/antd.css';
import TableView from './TableView';

export default {
  title: 'CRUD-app',
};

Parse.initialize('myAppId', 'unused');
Parse.serverURL = 'http://localhost:1337/parse';

export const Table = () => <TableView />;
