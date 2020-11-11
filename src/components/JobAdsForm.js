import React from 'react';
import { Form, Input, InputNumber, Button, Space } from 'antd';
import FIELD_LABELS from '../utils/FieldLabels';

const JobAdsForm = ({ onSubmit, initialValues, loading, customButtons }) => {
  const FormItem = Form.Item;
  const { TextArea } = Input;
  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
      <FormItem
        label={FIELD_LABELS.title}
        name="title"
        rules={[
          { required: true, message: `${FIELD_LABELS.title} is required` },
        ]}
      >
        <Input />
      </FormItem>

      <FormItem label={FIELD_LABELS.description} name="description">
        <TextArea showCount maxLength={100} />
      </FormItem>

      <FormItem
        label={FIELD_LABELS.fieldsOfWork}
        name="fieldsOfWork"
        rules={[{ required: true, message: `${FIELD_LABELS.fieldsOfWork} is required` }]}
      >
        <Input />
      </FormItem>

      <FormItem
        label={FIELD_LABELS.minCompensation}
        name="minCompensation"
        rules={[
          {
            required: true,
            message: `${FIELD_LABELS.minCompensation} is required`,
          },
        ]}
      >
        <InputNumber min={0} max={1000000} />
      </FormItem>

      <FormItem
        label={FIELD_LABELS.maxCompensation}
        name="maxCompensation"
        rules={[
          {
            required: true,
            message: `${FIELD_LABELS.maxCompensation} is required`,
          },
        ]}
      >
        <InputNumber min={0} max={1000000} />
      </FormItem>

      <FormItem
        label={FIELD_LABELS.minQuota}
        name="minQuota"
        rules={[
          { required: true, message: `${FIELD_LABELS.minQuota} is required` },
        ]}
      >
        <InputNumber min={0} max={100} />
      </FormItem>

      <FormItem
        label={FIELD_LABELS.maxQuota}
        name="maxQuota"
        rules={[
          { required: true, message: `${FIELD_LABELS.maxQuota} is required` },
        ]}
      >
        <InputNumber min={0} max={100} />
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
