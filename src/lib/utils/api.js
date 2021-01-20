import axios from 'axios';
import { baseURL } from '../../configs/Constants';

const callApi = async (method, route, data) => {
  try {
    const response = await axios({
      method,
      baseURL,
      url: route,
      data,
    });
    return response;
  } catch (err) {
    const serverError = {
      data: {
        message: 'Internal Server Error',
      },
    };
    if (err.response) {
      return err.response;
    }
    return serverError;
  }
};

export default callApi;
