import React from 'react';
import { List, Space, Typography, Button } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

const IconIcon = ({ status }) => {
  switch (status) {
    case 'approved':
      return <CheckOutlined />;

    case 'rejected':
      return <CloseOutlined />;

    case 'waiting':
      return <ClockCircleOutlined />;

    default:
      return <CheckOutlined />;
  }
};

const StudentApplicationItem = ({ job: { id, title, status } }) => {
  return (
    <List.Item key={id}>
      <List.Item.Meta
        title={
          <Link to={status ? `/application/${id}` : `/apply/${id}`}>
            <Typography.Link type="link">{title}</Typography.Link>
          </Link>
        }
      />
      {status ? (
        <Space direction="vertical">
          <div>
            {status + '\t\t'}
            <IconIcon status={status} />
          </div>
        </Space>
      ) : (
        <></>
      )}
    </List.Item>
  );
};

export default StudentApplicationItem;
