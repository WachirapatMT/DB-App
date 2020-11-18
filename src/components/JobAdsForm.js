import React from 'react';
import { Checkbox, Form, Input, InputNumber, Button, Space } from 'antd';

const JobAdsForm = ({ onSubmit, initialValues, loading, customButtons }) => {
  const FormItem = Form.Item;
  const { TextArea } = Input;
  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
      <FormItem
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input />
      </FormItem>
      <FormItem label="Description" name="description">
        <TextArea showCount maxLength={100} />
      </FormItem>
      <FormItem
        label="Field of work"
        name="fieldsOfWork"
        rules={[{ required: true, message: 'Field of work is required' }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="Minimum compensation"
        name="minCompensation"
        rules={[
          { required: true, message: 'Minimum compensation is required' },
        ]}
      >
        <InputNumber min={0} max={1000000} />
      </FormItem>
      <FormItem
        label="Maximum compensation"
        name="maxCompensation"
        rules={[
          { required: true, message: 'Maximum compensation is required' },
        ]}
      >
        <InputNumber min={0} max={1000000} />
      </FormItem>
      <FormItem
        label="Min Quota"
        name="minQuota"
        rules={[{ required: true, message: 'Min Quota is required' }]}
      >
        <InputNumber min={0} max={100} />
      </FormItem>
      <FormItem
        label="Max Quota"
        name="maxQuota"
        rules={[{ required: true, message: 'Max Quota is required' }]}
      >
        <InputNumber min={0} max={100} />
      </FormItem>
      <FormItem
        label="Payment Method"
        name="paymentMethod"
        rules={[{ required: true, message: 'Payment Method is required' }]}
      >
        <Input />
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

export default JobAdsForm;
