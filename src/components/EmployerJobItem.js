import React from 'react';
import { List, Tag, Space, Divider, Typography, Button } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const EmployerJobItem = ({
  job: {
    id,
    title,
    description,
    fieldsOfWork,
    minCompensation,
    maxCompensation,
    minQuota,
    maxQuota,
    currentAccepted,
  },
}) => {
  const { email } = useParams();

  return (
    <List.Item key={id}>
      <List.Item.Meta
        title={
          <Link to={`/employer/${email}/job/${id}`}>
            <Typography.Link type="link">{title}</Typography.Link>
          </Link>
        }
        description={fieldsOfWork.map((field) => (
          <Tag>{field}</Tag>
        ))}
      />
      <Space direction="vertical">
        <div>{description}</div>
        <div>
          <Typography.Text strong>
            {`${minCompensation / 1000}k - ${maxCompensation / 1000}k`}
          </Typography.Text>
          <Divider type="vertical" />
          <IconText icon={UserOutlined} text={`${minQuota} - ${maxQuota}`} />
          <Divider type="vertical" />
          <IconText icon={UserAddOutlined} text={currentAccepted} />
        </div>
      </Space>
    </List.Item>
  );
};

export default EmployerJobItem;
