const User = require('../models/User');

exports.createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

exports.getUsers = async () => {
  return User.find();
};

// Other service methods like updateUser, deleteUser, etc.
