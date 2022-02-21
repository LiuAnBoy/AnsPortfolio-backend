import { getRequest } from '../api';
// import errorHandle from '../api/errorHandle';

/**
 * [requestGetAllTags]
 * @return {object} [result]
 */
export async function requestGetAllTags() {
  const url = '/api/tags';
  const res = await getRequest(url);
  const result = {
    status: false,
    data: null,
  };

  try {
    result.data = res.data;
    result.status = true;
  } catch (error) {
    result.data = res.data;
  }

  return result;
}
