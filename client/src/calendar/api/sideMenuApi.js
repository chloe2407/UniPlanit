import { axios } from '../../lib/axios';

export const getUser = (userId) => {
  return axios.get(`users/${userId}`).then((data) => Promise.resolve(data));
};

export const getCourse = (courseBody) => {
  return axios
    .post('courses', courseBody)
    .then((data) => Promise.resolve(data));
};

export const getMultipleCourse = (courses) => {
  const promises = courses.map(
    (c) =>
      new Promise((res, rej) =>
        res(axios.post('courses', c).then((data) => data[0]))
      )
  );
  return promises;
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

export const generateTimeTable = (socket, courses) => {
  socket.emit('generate timetable', courses);
};

export const makeNewTimetable = (socket, courses) => {
  socket.emit('build timetable', courses);
};

export const updateTimetable = (socket, course) => {
  socket.emit('update timetable', course);
};
