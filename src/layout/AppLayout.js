import React from 'react';
import { Layout } from 'antd';
import './AppLayout.css';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        {/* NOTE: Navbar component */}
      </Header>
      <Content className="content">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer className="footer">Nisiter ©2020</Footer>
    </Layout>
  );
};

export default AppLayout;
