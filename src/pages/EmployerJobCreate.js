import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, PageHeader } from 'antd';
import { JobAdsForm } from '../components/JobAdsForm';

const EmployerJobCreate = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { email } = useParams();
  const onSubmit = (values) => {
    setLoading(true);
    // NOTE demo
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
        onBack={() => history.goBack()}
      />
      <Card>
        <JobAdsForm onSubmit={onSubmit} loading={loading} />
      </Card>
    </>
  );
};

export default EmployerJobCreate;
