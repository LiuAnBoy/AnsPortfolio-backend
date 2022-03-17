import { message } from 'antd';

const Message = () => {
  const sendSuccessMsg = (msg?: string) => {
    message.success({
      content: msg || '更新成功',
      duration: 5,
      maxCount: 1,
      style: {
        position: 'relative',
        top: 50,
      },
    });
  };

  const sendErrorMsg = (msg?: string) => {
    message.error({
      content: msg || '更新失敗',
      duration: 5,
      maxCount: 1,
      style: {
        position: 'relative',
        top: 50,
      },
    });
  };

  return {
    sendSuccessMsg,
    sendErrorMsg,
  };
};

export default Message;
