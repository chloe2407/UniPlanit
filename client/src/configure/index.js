let BASE_URL = {};
if (process.env.NODE_ENV !== 'development') {
  BASE_URL['BASE_URL'] = 'https://awesome-calendar-planner.herokuapp.com';
} else {
  BASE_URL['BASE_URL'] = 'http://localhost:3000';
}
export default BASE_URL;
