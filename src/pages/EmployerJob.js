import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Card, Button, Row, Col, Typography, Spin } from 'antd';
import { JobAdsForm } from '../components';

const EmployerJob = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [jobDetails, setJobDetails] = useState();
  const history = useHistory();
  const { email } = useParams();

  useEffect(() => {
    // TODO integrate with backend
    setTimeout(() => {
      // NOTE demo
      setJobDetails({
        title: `Job's Title`,
        description: 'bla bla',
        fieldsOfWork: 'Technology',
        minCompensation: 10000,
        maxCompensation: 20000,
        minQuota: 3,
        maxQuota: 10,
        isMain: true,
      });
      setPageLoading(false);
    }, 1000);
  }, []);

  const onEdit = (values) => {
    setLoading(true);
    // NOTE demo
    setTimeout(() => {
      console.log(values);
      setLoading(false);
      setIsEdit(false);
    }, 2000);
    // TODO integrate with backend
  };

  const onDelete = () => {
    // TODO integrate with backend
    console.log('Delete!');
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
