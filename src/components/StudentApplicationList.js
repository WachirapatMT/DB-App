import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Row, Typography } from 'antd';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import StudentApplicationItem from './StudentApplicationItem';

const applicationList = [
  {
    id: 'job-1',
    title: 'Create a New Prototype of Macbook Pro 2025',
    status: 'approved',
  },
  {
    id: 'job-2',
    title: 'Debug NASA Spaceship',
    status: 'rejected',
  },
  {
    id: 'job-3',
    title: 'cooking',
    status: 'waiting',
  },
];

const availableList = [
  {
    id: 'job-4',
    title: 'play game with CEO son',
  },
  {
    id: 'job-5',
    title: 'teaching math',
  },
];

const StudentApplicationList = () => {
  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={applicationList}
        header={
          <Typography.Title level={3}>Your job application</Typography.Title>
        }
        renderItem={(job) => <StudentApplicationItem job={job} />}
      />
      <List
        itemLayout="vertical"
        dataSource={availableList}
        header={<Typography.Title level={3}>Available Job</Typography.Title>}
        renderItem={(job) => <StudentApplicationItem job={job} />}
      />
      <Button
        onClick={() => {
          window.location.assign('http://localhost:3000/');
        }}
      >
        Log out
      </Button>
    </>
  );
};

export default StudentApplicationList;
