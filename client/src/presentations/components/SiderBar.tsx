import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const siderLink = ['home', 'project', 'tag'];

function SiderBar() {
  const location = useLocation();

  return (
    <Sider width={200}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1]]}
      >
        {siderLink.map((link) => (
          <Menu.Item key={link}>
            <Link to={`/${link}`}>{link.toLocaleUpperCase()}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default SiderBar;
