import emailjs from 'emailjs-com';
import getConfig from 'next/config';
import {
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAILURE,
  EMAIL_INITIAL,
  EMAIL_ALL_FILLIN,
} from '../types';

const { publicRuntimeConfig } = getConfig();
const userID = publicRuntimeConfig.NEXT_PUBLIC_EMAILJS_USER_ID;
const templateID = publicRuntimeConfig.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const serviceID = publicRuntimeConfig.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendEmail = async (dispatch, formData, router) => {
  emailjs.init();
  emailjs
    .send(serviceID, templateID, formData, userID)
    .then(async (res) => {
      dispatch({
        type: EMAIL_SEND_SUCCESS,
      });
      await sleep(2000);
      router.reload();
    })
    .catch(async (error) => {
      dispatch({
        type: EMAIL_SEND_FAILURE,
      });
    })
    .finally(async () => {
      await sleep(1500);
      if (
        formData.name !== '' &&
        formData.contact !== '' &&
        formData.question !== ''
      ) {
        dispatch({
          type: EMAIL_ALL_FILLIN,
        });
      } else {
        dispatch({
          type: EMAIL_INITIAL,
        });
      }
    });
};

export default sendEmail;
