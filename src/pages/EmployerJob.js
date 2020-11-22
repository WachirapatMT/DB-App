import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Card, Button, Row, Col, Typography, Spin, List, Tag } from 'antd';
import { JobAdsForm } from '../components';
import { getJobById, updateJobById, deleteJobById, getApplications, acceptApplication, rejectApplication } from '../api/employer';

const EmployerJob = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [jobDetails, setJobDetails] = useState();
  const [applications, setApplications] = useState();
  const history = useHistory();
  const { email, jobId } = useParams();

  const fetchJob = async () => {
    const [job] = await getJobById(jobId);
    const details = {
      title: job.title,
      description: job.description,
      fieldsOfWork: `${job.fieldsOfWork}`,
      minCompensation: job.minCompensation,
      maxCompensation: job.maxCompensation,
      minQuota: job.minQuota,
      maxQuota: job.maxQuota,
      currentAccepted: job.currentAccepted,
      paymentMethod: job.paymentMethod,
    };

    setJobDetails(details);
    setPageLoading(false);
  };

  const fetchApplication = async () => {
    const applications = await getApplications(jobId);
    setApplications(applications);
  }

  useEffect(() => {
    fetchJob();
    fetchApplication();
  }, []);

  const onEdit = async (values) => {
    setLoading(true);

    const jobData = {
      ...values,
      taskId: jobId,
      fieldsOfWork: values.fieldsOfWork.split(','),
    };

    await updateJobById(jobData);

    await fetchJob();
    setLoading(false);
    setIsEdit(false);
  };

  const onDelete = async () => {
    await deleteJobById(jobId);
    history.push(`/employer/${email}`);
  };

  const onAcceptApplication = async (applicationId, information) => {
    await acceptApplication(applicationId, information);
    fetchApplication();
  }

  const onRejectApplication = async (applicationId, information) => {
    await rejectApplication(applicationId, information);
    fetchApplication()
  }

  const JobDetails = () => (
    <Card>
      {Object.keys(jobDetails).map((key) => (
        <Row key={key}>
          <Col span={6}>
            <Typography.Title level={5}>{key}</Typography.Title>
          </Col>
          <Col span={12}>{jobDetails[key]}</Col>
        </Row>
      ))}
    </Card>
  );

  return pageLoading ? (
    <Row justify="center">
      <Spin />
    </Row>
  ) : (
    <>
      <PageHeader
        title="Job Advertisement details"
        onBack={() => {
          history.push(`/employer/${email}`);
        }}
        extra={
          isEdit
            ? []
            : [
                <Button
                  key="edit_btn"
                  type="primary"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>,
                <Button key="delete_btn" type="danger" onClick={onDelete}>
                  Delete
                </Button>,
              ]
        }
      />

      {isEdit ? (
        <Card>
          <JobAdsForm
            onSubmit={onEdit}
            loading={loading}
            initialValues={jobDetails}
            customButtons={[
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>,
            ]}
          />
        </Card>
      ) : (
        <JobDetails />
      )}
    </>
  );
};

export default EmployerJob;
