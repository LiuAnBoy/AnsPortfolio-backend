import React from 'react';
import { Modal, Typography } from 'antd';

function CancelModal({ isOpen, handleClose, handleDelete }: CancelModalProps) {
  return (
    <Modal
      title="刪除"
      width={300}
      visible={isOpen}
      onCancel={handleClose}
      onOk={handleDelete}
      centered
      cancelButtonProps={{ danger: true, type: 'primary' }}
    >
      <Typography.Paragraph className="text-center mb-0 text-base">
        是否刪除？
      </Typography.Paragraph>
    </Modal>
  );
}

export default CancelModal;

interface CancelModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
