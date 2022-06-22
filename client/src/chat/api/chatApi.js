import { axios } from 'lib/axios';

export const getConversation = (id) => {
  return axios
    .get(`users/messages/${id}`)
    .then((data) => Promise.resolve(data))
    .catch((err) => Promise.reject(err));
};
