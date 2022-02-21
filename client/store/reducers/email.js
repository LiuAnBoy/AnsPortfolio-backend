import {
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAILURE,
  EMAIL_LOADING,
  EMAIL_INITIAL,
  EMAIL_ALL_FILLIN,
} from '../types';

const initialState = {
  loading: false,
  data: null,
  formDisabled: false,
  btnDisabled: true,
  btnColor: 'red',
  btnText: '送出',
};

const email = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EMAIL_ALL_FILLIN:
      return {
        ...state,
        loading: false,
        data: payload,
        formDisabled: false,
        btnDisabled: false,
        btnColor: '#2caeba',
        btnText: '送出',
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        formDisabled: true,
        btnDisabled: true,
        btnColor: '#88ebf2',
        btnText: '送出成功',
      };
    case EMAIL_SEND_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        formDisabled: true,
        btnDisabled: true,
        btnColor: '#f288ad',
        btnText: '送出失敗',
      };
    case EMAIL_LOADING:
      return {
        ...state,
        loading: true,
        data: payload,
        formDisabled: true,
        btnDisabled: true,
        btnColor: '#e6e6e6',
        btnText: '送出中...',
      };
    case EMAIL_INITIAL:
      return {
        ...state,
        loading: false,
        data: null,
        formDisabled: false,
        btnDisabled: true,
        btnColor: '#e6e6e6',
        btnText: '送出',
      };
    default:
      return state;
  }
};

export default email;
