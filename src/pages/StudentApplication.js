import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Button, Card, Spin, Row, Col, Typography } from 'antd';
import JobApplicationForm from '../components/JobApplicationForm';
import { deleteAppById, getAppById, updateApp } from '../api/student';

const StudentApplication = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState();
  const history = useHistory();
  const { email, applicationId } = useParams();

  const fetchApplication = async () => {
    const [application] = await getAppById(applicationId);
    const details = {
      information: application.information,
    };
    setApplicationDetails(details);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const onEdit = async (values) => {
    setLoading(true);

    const appData = {
      applicationId,
      information: values.information,
    };
    await updateApp(appData);

    await fetchApplication();
    setLoading(false);
    setIsEdit(false);
  };

  const onDelete = async () => {
    await deleteAppById(applicationId);
    history.push(`/student/${email}`);
  };

  const JobApplicationDetails = () => (
    <Card>
      {Object.keys(applicationDetails).map((key) => (
        <Row key={key}>
          <Col span={6}>
            <Typography.Title level={5}>{key}</Typography.Title>
          </Col>
          <Col span={12}>{applicationDetails[key]}</Col>
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
