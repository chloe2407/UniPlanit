const User = require('../models/user');

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else {
    return res.json({ redirect: '/login' });
  }
};

module.exports.isAuthorizedFriend = async (req, res, next) => {
  // check if the user is a friend of the current user param
  const user = await User.findById(req.params.id);
  // user is currently being visited
  // if the param id is the current user's id, then they are authorized
  if (user.id === req.user.id) {
    return next();
  }
  // if the param id is in the current user's friend list, then they are authorized
  else if (user.friends.includes(req.user.id)) {
    return next();
  } else {
    return res.json({ err: 'You are not authorized' });
  }
};
