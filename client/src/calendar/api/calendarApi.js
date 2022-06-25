export const getTimetable = (socket) => {
  socket.emit('get timetable');
};
