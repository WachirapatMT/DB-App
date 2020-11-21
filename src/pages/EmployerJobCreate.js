import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createJob } from '../api/employer';
import { Card, PageHeader } from 'antd';
import { JobAdsForm } from '../components';

const EmployerJobCreate = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { email } = useParams();

  const onSubmit = async (values) => {
    setLoading(true);

    const job = {
      title: values.title,
      description: values.description,
      minCompensation: values.minCompensation,
      maxCompensation: values.maxCompensation,
      minQuota: values.minQuota,
      maxQuota: values.maxQuota,
      paymentMethod: values.paymentMethod,
      employerEmail: email,
      fieldsOfWork: values.fieldsOfWork.split(','),
    };

    await createJob(job);

    setLoading(false);
    history.push(`/employer/${email}`);
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
