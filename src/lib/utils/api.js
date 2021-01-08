import axios from 'axios';

export const callApi = async (method, route, input, params) => {
  const serverUrl = 'http://localhost:9000/api/';
  let response;
  const header = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    params,
  };
  try {
    if (method === 'post') {
      response = await axios[method](`${serverUrl}${route}`, input, header);
    }
    if (method === 'get') {
      response = await axios[method](`${serverUrl}${route}`, header);
    }
    return response;
  } catch (err) {
    return err;
  }
};
