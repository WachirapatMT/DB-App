import React from 'react';
import { Form, Input, Space, Button } from 'antd';

const JobApplicationForm = ({
  onSubmit,
  initialValues,
  loading,
  customButtons,
}) => {
  const FormItem = Form.Item;
  const { TextArea } = Input;

  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
      <FormItem label="Information" name="information">
        <TextArea showCount maxLength={100} />
      </FormItem>
      <FormItem>
        <Space size={8}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          {customButtons}
        </Space>
      </FormItem>
    </Form>
  );
};

export default JobApplicationForm;
