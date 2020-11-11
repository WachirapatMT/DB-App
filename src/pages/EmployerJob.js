import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader, Card, Button } from 'antd';
import { JobAdsForm } from '../components/JobAdsForm';

const EmployerJob = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const { email } = useParams();

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

  const JobDetails = () => <Card>job detail</Card>;

  return (
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
