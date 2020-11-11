import React, { useState } from 'react';
import { Input, Button, Radio } from 'antd';

const Landing = () => {
  const onFinish = () => {
    window.location.href = userType + '/' + email;
    console.log('Success:', userType, email, password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Nisiter</h1>
      </div>
      <div>
        <Radio.Group onChange={onUserTypeChange}>
          <Radio.Button value="student">Student</Radio.Button>
          <Radio.Button value="employer">Employer</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <label>E-mail</label>
        <Input type="email" value={email} onChange={onEmailChange} />
        <label>password</label>
        <Input type="password" value={password} onChange={onPasswordChange} />
      </div>
      <Button
        type="primary"
        onClick={onFinish}
        onError={(e) => onFinishFailed(e)}
      >
        Submit
      </Button>
    </div>
  );
};

export default Landing;
