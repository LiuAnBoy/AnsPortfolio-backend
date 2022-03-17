import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin } from 'antd';

import ProjectsDataTable from '../../presentations/components/Project/ProjectsDataTable';
import Message from '../../presentations/layouts/Message';
import useGetProjects from '../../applications/Project/useGetProjects';
import usePatchProject from '../../applications/Project/usePatchProject';
import useDeleteProject from '../../applications/Project/useDeleteProject';

function ProjectPage() {
  const { projectList, getAllProjects } = useGetProjects();
  const { patchFeaturedProject } = usePatchProject();
  const { deleteProject } = useDeleteProject();
  const { sendSuccessMsg, sendErrorMsg } = Message();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const onFeaturedProjectChange = async (id: string, checked: boolean) => {
    setIsLoading(true);
    const res = await patchFeaturedProject(id, checked);
    if (!res) {
      sendErrorMsg();
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    sendSuccessMsg();
    getAllProjects();
  };

  const handleDeleteChange = async () => {
    setIsLoading(true);
    const res = await deleteProject(projectId);

    if (!res) {
      sendErrorMsg('刪除失敗');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    sendSuccessMsg('刪除成功');
    setDeleteModalOpen(false);
    setProjectId('');
    getAllProjects();
  };

  const handleDeleteClick = (id: string) => {
    setProjectId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  // useEffect(() => {
  //   if (Object.keys(projectList).length === 0) {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [projectList]);

  return (
    <Spin spinning={isLoading}>
      <div className="mb-4 flex item-center justify-between">
        <span className="text-3xl">
          {location.pathname.split('/')[1].toLocaleUpperCase()}
        </span>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/project/create/${projectList.length + 1}`)}
        >
          新增
        </Button>
      </div>
      <ProjectsDataTable
        data={projectList}
        onFeaturedProjectChange={onFeaturedProjectChange}
        handleDeleteChange={handleDeleteChange}
        handleDeleteClick={handleDeleteClick}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
      />
    </Spin>
  );
}
export default ProjectPage;
