import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Row, Spin, Typography } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { EmployerJobItem } from '.';
import { getJobList } from '../api/employer';

const loadJobList = async (setJobList, setLoading) => {
  setJobList(await getJobList());
  setLoading(false);
};

const EmployerJobList = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    loadJobList(setJobList, setLoading);
  }, []);

  if (loading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  } else {
    return (
      <List
        itemLayout="vertical"
        dataSource={jobList}
        header={
          <Typography.Title level={4}>Your job advertisements</Typography.Title>
        }
        footer={
          <Row justify="center">
            <Button
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => history.push(`${url}/job/create`)}
            >
              Add a new job
            </Button>
          </Row>
        }
        renderItem={(job) => <EmployerJobItem job={job} />}
      />
    );
  }
};

export default EmployerJobList;
