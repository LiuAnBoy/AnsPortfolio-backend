import { Table, Switch, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { ProjectProps } from '../../../domain/Project/ProjectProps';
import CancelModal from '../../layouts/CancelModal';

function ProjectsDataTable({
  data,
  onFeaturedProjectChange,
  handleDeleteChange,
  handleDeleteClick,
  isDeleteModalOpen,
  handleDeleteModalClose,
}: ProjectDataTableProps) {
  const navigate = useNavigate();

  const columns = [
    {
      title: '編號',
      dataIndex: 'number',
      key: 'number',
      width: '6%',
    },
    {
      title: '封面',
      dataIndex: 'image',
      key: 'image',
      width: '10%',
      render(text: string, record: any) {
        return (
          <img
            className="w-20 h-16"
            src={text ? text : 'https://fakeimg.pl/200x150/?text=Empty'}
            alt={record.name}
          />
        );
      },
    },
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '建立日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '17%',
      render(text: string) {
        return moment(new Date(text)).format('YYYY/MM/DD HH:mm:ss');
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '17%',
      render(text: string) {
        return text ? moment(new Date(text)).format('YYYY/MM/DD HH:mm:ss') : '未更新';
      },
    },
    {
      title: '精選',
      dataIndex: 'featured',
      key: 'featured',
      render(result: boolean, record: ProjectProps) {
        return (
          <Switch
            size="default"
            checkedChildren="是"
            unCheckedChildren="否"
            checked={result}
            onChange={(checked: boolean) =>
              onFeaturedProjectChange(record.number as string, checked)
            }
          />
        );
      },
    },
    {
      title: '選項',
      render(text: string, record: any) {
        return (
          <Space>
            <Button
              danger
              size="large"
              type="primary"
              onClick={() => handleDeleteClick(record._id)}
            >
              刪除
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate(`/project/edit/${record.number}`)}
            >
              編輯
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table rowKey="number" columns={columns} dataSource={data} />
      <CancelModal
        isOpen={isDeleteModalOpen}
        handleClose={handleDeleteModalClose}
        handleDelete={handleDeleteChange}
      />
    </>
  );
}

export default ProjectsDataTable;

interface ProjectDataTableProps {
  data: ProjectProps[];
  onFeaturedProjectChange: (number: string, checked: boolean) => void;
  handleDeleteChange: () => void;
  handleDeleteClick: (id: string) => void;
  isDeleteModalOpen: boolean;
  handleDeleteModalClose: () => void;
}
