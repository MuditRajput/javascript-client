import axios from 'axios';
import { baseUrl } from '../../configs/Constants';

const callApi = async (method, route, data) => {
  try {
    const response = await axios({
      method,
      url: `${baseUrl}${route}`,
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
