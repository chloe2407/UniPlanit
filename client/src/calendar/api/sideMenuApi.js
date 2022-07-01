import { axios } from 'lib/axios';

export const getUser = (userId) => {
  return axios.get(`../users/${userId}`).then((data) => Promise.resolve(data));
};

export const getCourse = (courseBody) => {
  return axios
    .post('../courses', courseBody)
    .then((data) => Promise.resolve(data));
};

export const getMultipleCourse = (courses) => {
  const promises = courses.map(
    (c) =>
      new Promise((res, rej) =>
        res(axios.post('../courses', c).then((data) => data))
      )
  );
  return promises;
};

export const getUserCourse = (socket, term) => {
  socket.emit('get user course', term);
};

export const deleteCourse = (socket, courseCode, courseTerm, term) => {
  socket.emit('delete course', courseCode, courseTerm, term);
};

export const deleteCourseSection = (socket, courseCode, type, term) => {
  socket.emit('delete section', courseCode, type, term);
};

export const addUserCourse = (socket, course, term) => {
  socket.emit('add user course', course, term);
};

export const getBuildTimetable = (socket) => {
  socket.emit('get build timetable');
};

export const generateTimeTable = (socket, term) => {
  socket.emit('generate timetable', term);
};

export const buildTimetable = (socket, term) => {
  socket.emit('build timetable', term);
};

export const updateTimetable = (socket, buildTimetable, clear) => {
  socket.emit('update timetable', buildTimetable, clear);
};

export const getGenerateTimetable = (socket) => {
  socket.emit('get generated timetable');
};

export const addFavTimetable = (socket, tb) => {
  socket.emit('add fav timetable', tb);
};

export const deleteFavTimetable = (socket, tb) => {
  socket.emit('delete fav timetable', tb);
};

export const getFavTimetable = (socket) => {
  socket.emit('get fav timetable');
};

export const getUserFriend = (socket) => {
  socket.emit('get friend');
};
