import { axios } from 'lib/axios';
import Axios from 'axios';
import { BASE_URL } from 'configure/index';

export const getUser = (userId) => {
  return axios.get(`users/${userId}`).then((data) => Promise.resolve(data));
};

const courseAxios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

courseAxios.interceptors.response.use(
  (response) => {
    return (response.data.success && Promise.resolve()) || Promise.reject();
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const lockUserCourse = (courseCode) => {
  return courseAxios.post('/users/courses/lock', { courseCode });
};

export const deleteUserCourse = (courseCode) => {
  return courseAxios.delete('users/courses/delete', { courseCode });
};

export const lockCourseSection = (courseCode, type) => {
  return courseAxios.post('users/courses/sections/lock', { courseCode, type });
};

export const deleteCourseSection = (courseCode, type) => {
  return courseAxios.post('users/courses/sections/delete', { courseCode, type });
};
