import { axios } from 'lib/axios';

export const getUser = (userId) => {
  return axios.get(`users/${userId}`).then((data) => Promise.resolve(data));
};

export const getCourse = (courseBody) => {
  return axios
    .post('courses', courseBody)
    .then((data) => Promise.resolve(data));
};

export const getUserCourse = (socket) => {
  socket.emit('get user course');
};

export const lockCourse = (socket, courseCode) => {
  socket.emit('lock course', courseCode);
};

export const deleteCourse = (socket, courseCode) => {
  socket.emit('delete course', courseCode);
};

export const lockCourseSection = (socket, courseCode, type) => {
  socket.emit('lock section', courseCode, type);
};

export const deleteCourseSection = (socket, courseCode, type) => {
  socket.emit('delete section', courseCode, type);
};

export const addUserCourse = (socket, course) => {
  socket.emit('add user course', course);
};
