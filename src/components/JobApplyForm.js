import React from 'react';
import { Form, Input, Button } from 'antd';

const JobApplyForm = ({ initialValues, onSubmit }) => {
  const FormItem = Form.Item;
  const { TextArea } = Input;
  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
      <FormItem label="Information" name="information">
        <TextArea showCount maxLength={100} />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default JobApplyForm;
