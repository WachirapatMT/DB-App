import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Card, Button, Row, Col, Typography, Spin } from 'antd';
import { JobAdsForm } from '../components/JobAdsForm';

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
      setJobDetails({ title: 1, fieldOfWork: 2, minQuota: 3 });
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
              ]
        }
      />
      {isEdit ? (
        <Card>
          <JobAdsForm
            onSubmit={onEdit}
            loading={loading}
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
