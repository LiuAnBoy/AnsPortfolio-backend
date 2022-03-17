import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import zhTW from 'antd/lib/locale/zh_TW';
import { Routes, Route } from 'react-router-dom';

import RoutesProps from './domain/Route/RouteProps';
import HeaderBar from './presentations/components/HeaderBar';
import SiderBar from './presentations/components/SiderBar';
import routes from './applications/routes';

import './styles/index.scss';
import 'antd/dist/antd.min.css';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Layout>
        <HeaderBar />
        <Layout>
          <SiderBar />
          <Layout className="p-6">
            <Content
              className="bg-white p-6 m-0"
              style={{
                minHeight: 'calc(100vh - 112px)',
              }}
            >
              <Routes>
                {routes.map((route: RoutesProps, idx) => (
                  <Route key={idx} path={route.path} element={<route.view />} />
                ))}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
