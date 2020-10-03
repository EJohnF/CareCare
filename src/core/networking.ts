import Config from 'react-native-config';
import axios from 'axios';
import {Filters} from 'types';

const axiosInstance = axios.create({
  baseURL: Config.MOVIE_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  // do authorisations here.
  config.params.apikey = Config.API_KEY;
  return config;
});

interface RemoteFilters {
  s?: string;
  page?: number;
  i?: string;
  y?: number;
  type?: string;
}

type RequestParams = Filters & {page?: number} & {i?: string};

const convertLocalToRemote = (params: RequestParams): RemoteFilters => {
  const result: RemoteFilters & RequestParams = {...params};
  if (params.title) {
    result.s = params.title;
    delete result.title;
  }
  if (params.year) {
    result.y = params.year;
    delete result.year;
  }
  return result;
};

export const request = async (params: RequestParams) => {
  return axiosInstance.get('/', {
    params: convertLocalToRemote(params),
  });
};
