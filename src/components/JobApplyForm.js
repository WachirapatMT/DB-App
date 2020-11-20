import React from 'react';
import { Row, Card, Form, Input, Button, Typography } from 'antd';

const JobApplyForm = ({ assessment, onSubmit, loading }) => {
  const { TextArea } = Input;
  let assessmentComponent = (
    <div>
      <Typography.Title level={3}>Assessment</Typography.Title>
      <Typography.Text>{assessment}</Typography.Text>
    </div>
  )
  return (
    <Row justify="center" style={{margin: 10}}>
      <Card title={assessmentComponent} bordered={false} style={{ width: "50%"}} >
        <Form layout="vertical" name="control-hooks" onFinish={onSubmit}>
          <Form.Item name="information" label="Information" style={{position: "relative"}}>
            <TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default JobApplyForm;
