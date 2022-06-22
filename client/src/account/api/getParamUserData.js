import { axios } from 'lib/axios';

export const getParamUserData = (userId) => {
  return axios.get(`users/${userId}`).then((data) => Promise.resolve(data));
};
