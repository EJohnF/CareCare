import Config from 'react-native-config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: Config.MOVIE_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  // do authorisations here.
  config.params.apikey = Config.API_KEY;
  return config;
});

export const request = async (params) => {
  return axiosInstance.get('/', {
    params,
  });
};
