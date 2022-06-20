import { axios } from 'lib/axios';

export const getUser = (userId) => {
  return axios.get(`users/${userId}`).then((data) => Promise.resolve(data));
};

export const lockUserCourse = (courseCode) => {
  axios
    .post('users/courses/lock', courseCode)
    .then((data) => (data.success && Promise.resolve()) || Promise.reject())
    .catch((err) => Promise.reject(err));
};

export const deleteUserCourse = (courseCode) => {
  axios
    .post('users/courses/delete', courseCode)
    .then((data) => (data.success && Promise.resolve()) || Promise.reject())
    .catch((err) => Promise.reject(err));
};

export const lockCourseSection = (type, courseCode) => {
  axios
    .patch('users/courses/sections/lock', { type, courseCode })
    .then((data) => (data.success && Promise.resolve()) || Promise.reject())
    .catch((err) => Promise.reject(err));
};

export const deleteCourseSection = (type, courseCode) => {
  axios
    .delete('users/courses/sections/delete', { type, courseCode })
    .then((data) => (data.success && Promise.resolve()) || Promise.reject())
    .catch((err) => Promise.reject(err));
};
