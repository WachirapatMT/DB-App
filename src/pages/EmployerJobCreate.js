import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, PageHeader } from 'antd';
import { JobAdsForm } from '../components';
import axios from "axios"

const EmployerJobCreate = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { email } = useParams();
  const jobCreate = async values => {
    try {
      const data = await axios.post(
        'http://localhost:3001/task',
        {
          title: values.title,
          description: values.description,
          minCompensation: values.minCompensation,
          maxCompensation: values.maxCompensation,
          minQuota: values.minQuota,
          maxQuota: values.maxQuota,
          paymentMethod: values.paymentMethod,
          employerEmail: email,
          fieldsOfWork: [values.fieldsOfWork],
        }
      )
      console.log("success")
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return { error }
    }
  }
  const onSubmit = (values) => {
    setLoading(true);
    jobCreate(values)
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
