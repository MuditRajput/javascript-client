import axios from 'axios';

const callApi = async (method, route, input) => {
  const serverUrl = 'http://localhost:9000/api/';
  try {
    const response = await axios[method](`${serverUrl}${route}`, input);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default callApi;
