import React from 'react'
import { Checkbox, Form, Input, InputNumber, Button } from 'antd'

const JobAdsForm = ({ onSubmit, initialValues }) => {
  const FormItem = Form.Item
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
        <Input />
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
      <FormItem name="isMain" valuePropName="checked">
        <Checkbox>This task is the main task</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

export default JobAdsForm
