import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { getAppByEmail } from '../api/student';
import { getAllJobList } from '../api/employer';
import StudentApplicationItem from './StudentApplicationItem';
import StudentJobItem from './StudentJobItem';

const loadAppByEmail = async (setAppByEmail, setLoading, email) => {
  setAppByEmail(await getAppByEmail(email));
  setLoading(false);
};

const appMapper = (app) => {
  return {
    id: app.applicationId,
    email: app.studentEmail,
    taskId: app.taskId,
    status: app.status,
    information: app.information,
  };
};

const loadJobList = async (setJobList, setLoading2) => {
  setJobList(await getAllJobList());
  setLoading2(false);
};

const jobMapper = (job) => {
  return {
    id: job.taskId,
    amount: job.amount,
    description: job.description,
    email: job.employerEmail,
    fieldsOfWork: job.fieldsOfWork,
    maxCompensation: job.maxCompensation,
    minCompensation: job.minCompensation,
    minQuota: job.minQuota,
    maxQuota: job.maxQuota,
    title: job.title,
  };
};

const StudentApplicationList = () => {
  const { url } = useRouteMatch();
  const { email } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [appList, setAppList] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    loadAppByEmail(setAppList, setLoading, email);
    loadJobList(setJobList, setLoading2);
  }, []);

  if (loading || loading2) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  } else {
    return (
      <>
        <List
          itemLayout="vertical"
          dataSource={appList}
          header={
            <Typography.Title level={4}>Your job application</Typography.Title>
          }
          renderItem={(app) => <StudentApplicationItem app={appMapper(app)} />}
        />
        <List
          itemLayout="vertical"
          dataSource={jobList}
          header={<Typography.Title level={3}>Available Job</Typography.Title>}
          renderItem={(job) => <StudentJobItem job={jobMapper(job)} />}
        />
      </>
    );
  }
};

export default StudentApplicationList;
