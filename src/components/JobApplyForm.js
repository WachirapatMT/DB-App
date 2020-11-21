import React from 'react';
import { Row, Col, List, Card, Form, Radio, Input, Button, Typography } from 'antd';

const JobApplyForm = ({ assessment, onSubmit, loading }) => {
  const { TextArea } = Input;

  const assessmentComponent = (assessment.length===0) ? null : (
    <Col span={12} offset={6}>
      <Card title={<Typography.Title level={3}>Apply for {assessment[0].title}</Typography.Title>} bordered={false}>
        <List
          dataSource={assessment[0].question}
          renderItem={({description, choices}) => (
            <Form layout="vertical" >
              <Form.Item name="question" label={description}>
                <Radio.Group>
                  {
                    choices.map(choice => (
                      <Radio style={{display: 'block'}} value={choice.choice_id}>{choice.label}</Radio>
                    ))
                  }
                </Radio.Group>
              </Form.Item>
            </Form>
          )}
        />
      </Card>
    </Col>
  )
  return (
    <Row>
      {assessmentComponent}
      <Col span={12} offset={6}>
        <Card title={<Typography.Title level={3}>Application</Typography.Title>} bordered={false} >
          <Form layout="vertical" onFinish={onSubmit}>
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
      </Col>
    </Row>
  );
};

export default JobApplyForm;
