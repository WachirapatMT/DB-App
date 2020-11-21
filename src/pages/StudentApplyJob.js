import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { createApp, getAssessmentByJobId } from '../api/student';
import { JobApplyForm } from '../components'
import { Row, Spin } from 'antd';

const loadAssessment = async (setAssessment, setLoading, jobId) => {
  setAssessment(await getAssessmentByJobId(jobId))
  setLoading(false)
}

const StudentApplyJob = () => {
  const { jobId, email } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    loadAssessment(setAssessment, setLoading, jobId.toString())
  }, []);

  const onSubmit = async (values) => {
    setSubmitLoading(true);

    const app = {
      information: values.information,
      studentEmail: email,
      taskId: parseInt(jobId)
    };
  
    await createApp(app)
    
    setLoading(false);
    history.push(`/student/${email}`);
  };
  if (loading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  } else {
    return (
      <JobApplyForm assessment={assessment} onSubmit={onSubmit} loading={submitLoading} />
    );
  }
};

export default StudentApplyJob;
