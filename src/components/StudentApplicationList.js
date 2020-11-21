import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Spin, List, Typography } from 'antd';
import StudentApplicationItem from './StudentApplicationItem';
import { getAppByEmail, getStudentJobList } from '../api/student';
import { getJobById } from '../api/employer';
import StudentJobItem from './StudentJobItem';

const appMapper = (app, job) => {
  return { id: app.applicationId, title: job.title, status: app.status };
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
    currentAccepted: job.currentAccepted,
    title: job.title,
    taskSize: job.taskSize,
  };
};

const StudentApplicationList = () => {
  const { email } = useParams();

  const [applicationLoading, setApplicationLoading] = useState(true);
  const [jobLoading, setJobLoading] = useState(true);

  const [appList, setAppList] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchAppListWithJobDetails = async () => {
      const apps = await getAppByEmail(email);
      const appWithJobs = [];
      for (const i in apps) {
        const app = apps[i];
        const [job] = await getJobById(app.taskId);
        appWithJobs.push({ app: app, job: job });
      }
      setAppList(appWithJobs);
      setApplicationLoading(false);
    };
    fetchAppListWithJobDetails();
  }, []);

  useEffect(() => {
    const fetchStudentJobList = async () => {
      const jobs = await getStudentJobList();
      setJobList(jobs);
      setJobLoading(false);
    };
    fetchStudentJobList();
  }, []);

  return (
    <>
      {applicationLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <List
          itemLayout="vertical"
          header={
            <Typography.Title level={4}>Your Job Applications</Typography.Title>
          }
          dataSource={appList}
          renderItem={({ app, job }) => (
            <StudentApplicationItem application={appMapper(app, job)} />
          )}
        />
      )}
      {jobLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <List
          itemLayout="vertical"
          header={<Typography.Title level={4}>Available Jobs</Typography.Title>}
          dataSource={jobList}
          renderItem={(job) => <StudentJobItem job={jobMapper(job)} />}
        />
      )}
    </>
  );
};

export default StudentApplicationList;
