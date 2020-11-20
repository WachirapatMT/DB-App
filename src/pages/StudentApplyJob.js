import React, { useState, useEffect } from 'react';
import { JobApplyForm } from '../components'

const StudentApplyJob = () => {
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState("");
  // useEffect(() => {
  //   const temp = await getJobAssessment()
  //   setAssessment(temp) 
  // }, []);

  const onSubmit = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log(values);
      setLoading(false);
    }, 1500);
  };

  return (
    <JobApplyForm assessment={assessment} onSubmit={onSubmit} loading={loading} />
  );
};

export default StudentApplyJob;
