import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, PageHeader } from 'antd';
import { JobAdsForm } from '../components';
import { jobCreate } from '../api/employer'

const EmployerJobCreate = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { email } = useParams();

  const onSubmit = (values) => {
    setLoading(true);
    jobCreate(values, email)
    setTimeout(() => {
      console.log(values);
      setLoading(false);
      history.push(`/employer/${email}`);
    }, 1500);
    // TODO integrate with backend
  };

  return (
    <>
      <PageHeader
        title="Create Job Advertisement"
        onBack={() => {
          history.push(`/employer/${email}`);
        }}
      />
      <Card>
        <JobAdsForm onSubmit={onSubmit} loading={loading} />
      </Card>
    </>
  );
};

export default EmployerJobCreate;
