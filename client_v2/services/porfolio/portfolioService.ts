import { getRequest } from '../api';
// import errorHandle from '../api/errorHandle';

/**
 * [requestGetAllPortfolio]
 * @return {object} [result]
 */
export async function requestGetAllPortfolio(tag?: string) {
  let url;
  if (tag) {
    url = `/api/projects?tags=${tag}`;
  } else {
    url = '/api/projects';
  }
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
