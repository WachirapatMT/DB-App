import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Card, Button, Row, Col, Typography, Spin } from 'antd';
import { JobAdsForm } from '../components';
import { getJobById, updateJobById, deleteJobById } from '../api/employer';

const EmployerJob = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [jobDetails, setJobDetails] = useState();
  const history = useHistory();
  const { email, jobId } = useParams();

  useEffect(async () => {
    const job = await getJobById(jobId);

    setTimeout(() => {
      setJobDetails({
        title: job[0].title,
        description: job[0].description,
        fieldsOfWork: `${job[0].fieldsOfWork}`,
        minCompensation: job[0].minCompensation,
        maxCompensation: job[0].maxCompensation,
        minQuota: job[0].minQuota,
        maxQuota: job[0].maxQuota,
        currentAccepted: job[0].currentAccepted,
        paymentMethod: job[0].paymentMethod,
      });
      setPageLoading(false);
    }, 1000);
  }, []);

  const onEdit = async (values) => {
    setLoading(true);
    values.fieldsOfWork = values.fieldsOfWork.split(',')
    await updateJobById({ taskId: jobId, ...values });

    setTimeout(() => {
      history.go(0);
      setLoading(false);
      setIsEdit(false);
    }, 2000);
  };

  const onDelete = async () => {
    await deleteJobById(jobId);
    history.push(`/employer/${email}`);
  };

  const JobDetails = () => (
    <Card>
      {Object.keys(jobDetails).map((key) => (
        <Row>
          <Col span={6}>
            <Typography.Title level={5}>{key}</Typography.Title>
          </Col>
          <Col span={12}>{jobDetails[key]}</Col>
        </Row>
      ))}
    </Card>
  );

  return pageLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin />
    </div>
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
                <Button type="primary" onClick={() => setIsEdit(true)}>
                  Edit
                </Button>,
                <Button type="danger" onClick={onDelete}>
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
