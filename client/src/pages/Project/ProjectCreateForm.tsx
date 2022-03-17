import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Button,
  Upload,
  Space,
  UploadProps,
  Select,
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import Message from '../../presentations/layouts/Message';
import { ProjectProps } from '../../domain/Project/ProjectProps';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import useGetTags from '../../applications/Tag/useGetTags';
import usePostProject from '../../applications/Project/usePostProject';
import { TagProps } from '../../domain/Tag/TagProps';

function ProjectCreateForm() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { sendErrorMsg, sendSuccessMsg } = Message();

  const { tagsList } = useGetTags();
  const { postProject } = usePostProject();

  const [imgUrl, setImgUrl] = useState<string>('');

  const handleSave = async (value: ProjectProps) => {
    value.image = imgUrl;

    const res = await postProject(value);

    if (!res) {
      sendErrorMsg();
      return;
    }

    sendSuccessMsg('新增成功');
    navigate('/project');
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    action: 'https://api.cloudinary.com/v1_1/cla/image/upload',
    data(file: UploadFile) {
      return {
        folder: `Portfolio/Projects/${file.name}`,
        upload_preset: 'mqjsxfjp',
        timestamp: Date.now,
      };
    },
    maxCount: 1,
    beforeUpload: beforeUpload,
  };

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      sendErrorMsg('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      sendErrorMsg('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }

    if (e.file.status === 'done') {
      setImgUrl(e.file.response.url);
    }

    return e && e.fileList;
  };

  return (
    <>
      <div className="mb-4 flex item-center justify-between">
        <span className="text-3xl">新增作品</span>
        <Space>
          <Button
            type="primary"
            size="large"
            danger
            onClick={() => navigate(-1)}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            form="project-form"
          >
            完成
          </Button>
        </Space>
      </div>
      <hr className="mt-4 mb-6" />
      <Form
        size="large"
        labelAlign="left"
        colon={false}
        id="project-form"
        name="project-form"
        form={form}
        onFinish={handleSave}
        wrapperCol={{ span: 10 }}
        initialValues={{ number: number, featured: false, url: '' }}
      >
        <Form.Item name="number" label="編號" labelCol={{ span: 2 }}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="image"
          label="圖片"
          labelCol={{ span: 2 }}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="作品名稱"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請輸入作品名稱。' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="company"
          label="公司名稱"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請輸入公司名稱。' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="introduce"
          label="公司介紹"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請輸入公司介紹。' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="description"
          label="設計理念"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請輸入設計理念。' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="url"
          label="網址"
          labelCol={{ span: 2 }}
          rules={[{ type: 'url', message: '請輸入正確網址。' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="featured"
          label="精選"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請選擇是否精選。' }]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="tags"
          label="標籤"
          labelCol={{ span: 2 }}
          rules={[{ required: true, message: '請輸選擇標籤。' }]}
        >
          <Select mode="tags">
            {tagsList.map((tag: TagProps) => (
              <Select.Option key={tag._id} value={tag._id}>
                {tag.name.toLocaleUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProjectCreateForm;
