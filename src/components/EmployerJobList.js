import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Row, Typography } from 'antd';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { EmployerJobItem } from '.';

const jobList = [
  {
    id: 'job-1',
    title: 'Create a New Prototype of Macbook Pro 2025',
    description:
      'The prototype should be the same as 2024, just some few tweaks.',
    fieldOfWork: ['Design', 'Hardware'],
    minQuota: 5,
    maxQuota: 7,
    minCompensation: 50000,
    maxCompensation: 100000,
  },
  {
    id: 'job-2',
    title: 'Debug NASA Spaceship',
    description: 'NASA kor pa ter glub ma mai dai T T',
    fieldOfWork: ['Repairment', 'Hardware'],
    minQuota: 10,
    maxQuota: 20,
    minCompensation: 100000,
    maxCompensation: 300000,
  },
];

const EmployerJobList = () => {
  const { url } = useRouteMatch();
  return (
    <List
      itemLayout="vertical"
      dataSource={jobList}
      header={
        <Typography.Title level={3}>Your job advertisements</Typography.Title>
      }
      footer={
        <Row justify="center">
          <Link to={`${url}/job/create`}>
            <Button shape="round" icon={<PlusOutlined />} size="large">
              Add a new job
            </Button>
          </Link>
        </Row>
      }
      renderItem={(job) => <EmployerJobItem job={job} />}
    />
  );
};

export default EmployerJobList;
