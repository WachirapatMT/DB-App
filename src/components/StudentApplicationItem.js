import React, { useEffect, useState } from 'react';
import { List, Space, Typography, Button, Spin, Row } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { getJobById } from '../api/employer';

const IconIcon = ({ status }) => {
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

const loadJobById = async (setJobById, setLoading, id) => {
  const job = await getJobById(id);
  setJobById(job);
  setLoading(false);
};

const StudentApplicationItem = ({
  app: { id, email, taskId, status, information },
}) => {
  const [loading, setLoading] = useState(true);
  const [jobById, setJobById] = useState({});
  const user = useParams().email;
  useEffect(() => {
    loadJobById(setJobById, setLoading, id);
  }, [jobById]);

  if (jobById.length === 1) var title = jobById[0].title;

  return loading ? (
    <Row justify="center">
      <Spin />
    </Row>
  ) : (
    <List.Item key={id}>
      <List.Item.Meta
        title={
          <Link to={`/student/${user}/application/${id}`}>
            <Typography.Link type="link">{title}</Typography.Link>
          </Link>
        }
      />
      <Space direction="vertical">
        <div>
          {status + '\t\t'}
          <IconIcon status={status} />
        </div>
      </Space>
      )
    </List.Item>
  );
};

export default StudentApplicationItem;
