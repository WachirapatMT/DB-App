import React from 'react';
import { Form, Typography, Input, Button, Radio, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const roleOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Employer', value: 'employer' },
  ];

  const history = useHistory();

  const onSubmit = (values) => {
    console.log(values);
    const { role, email } = values;
    history.push(`/${role}/${email}`);
  };

  const FormItem = Form.Item;
  return (
    <>
      <Typography.Title level={1}>Nisiter</Typography.Title>
      <Row>
        <Col span={8} offset={8}>
          <Form layout="vertical" onFinish={onSubmit}>
            <FormItem
              label="Login as"
              name="role"
              initialValue={roleOptions[0].value}
            >
              <Radio.Group
                options={roleOptions}
                optionType="button"
                buttonStyle="solid"
              />
            </FormItem>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input type="password" />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Landing;
