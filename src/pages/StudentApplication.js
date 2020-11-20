import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Button, Card, Spin, Row, Col, Typography } from 'antd';
import JobApplicationForm from '../components/JobApplicationForm';

const StudentApplication = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState();
  const history = useHistory();
  const { email } = useParams();

  useEffect(async () => {
    // TODO integrate with backend
    // const job = await getJobById(jobId);

    setTimeout(() => {
      // NOTE demo
      setApplicationDetails({ information: 'demo' });
      setPageLoading(false);
    }, 1000);
  }, []);

  const onEdit = () => {
    // TODO integrate with backend
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('EDIT');
    }, 1000);
  };

  const onDelete = () => {
    // TODO integrate with backend
    console.log('DELETE');
  };

  const JobApplicationDetails = () => (
    <Card>
      {Object.keys(applicationDetails).map((key) => (
        <Row>
          <Col span={6}>
            <Typography.Title level={5}>{key}</Typography.Title>
          </Col>
          <Col span={12}>{applicationDetails[key]}</Col>
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
        title="Job Application details"
        onBack={() => {
          history.push(`/student/${email}`);
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
          <JobApplicationForm
            onSubmit={onEdit}
            loading={loading}
            initialValues={applicationDetails}
            customButtons={[
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>,
            ]}
          />
        </Card>
      ) : (
        <JobApplicationDetails />
      )}
    </>
  );
};

export default StudentApplication;
