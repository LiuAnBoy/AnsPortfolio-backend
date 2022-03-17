import { Layout, Button, Avatar, Space, Typography } from 'antd';

const { Header } = Layout;

function HeaderBar() {
  return (
    <Header className="flex flex-row items-center justify-between">
      <div className="Logo text-white">An's Portfolio</div>

      <span className='text-white'>env: {process.env.NODE_ENV}</span>

      <Space align="baseline" size={16}>
        <Avatar size="default">U</Avatar>
        <span className="text-white">User</span>
      </Space>
    </Header>
  );
}

export default HeaderBar;
