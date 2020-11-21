import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, Typography, Space } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'Accepted':
      return <CheckOutlined />;
    case 'Rejected':
      return <CloseOutlined />;
    case 'Pending':
      return <ClockCircleOutlined />;
    case 'Finished':
      return <TrophyOutlined />;
    default:
      return <CheckOutlined />;
  }
};

const StudentApplicationItem = ({ application: { id, title, status } }) => {
  const { email } = useParams();
  return (
    <List.Item key={id}>
      <List.Item.Meta
        title={
          <Link to={`/student/${email}/application/${id}`}>
            <Typography.Link type="link">{title}</Typography.Link>
          </Link>
        }
        description={
          <Space size={8}>
            <StatusIcon status={status} />
            <Typography>{status}</Typography>
          </Space>
        }
      />
    </List.Item>
  );
};

export default StudentApplicationItem;
