import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const StudentApplyJob = () => {
  const onFinish = values => {
    console.log(values);
  };

  let question = "Question is why we need to do this I suss?"
  let assessment = (
    <div>
      <Typography.Title level={3}>Assessment</Typography.Title>
      <Typography.Text>{question}</Typography.Text>
    </div>
  )

  return (
    <Row justify="center" style={{margin: 10}}>
        <Card title={assessment} bordered={false} style={{ width: "50%"}} >
          <Form {...layout} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="information" label="Information" style={{position: "relative"}}>
              <TextArea />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
     
    </Row>
  );
};

export default StudentApplyJob;
