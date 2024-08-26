const UserService = require('../services/userService');
const LogService = require('../services/logService');

exports.createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);

    // Log successful user creation
    await LogService.createLog('info', 'User created successfully', {
      userId: user._id,
      email: user.email,
    });

    res.status(201).json(user);
  } catch (error) {
    // Log error during user creation
    await LogService.createLog('error', 'User creation failed', {
      error: error.message,
    });

    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();

    // Log retrieval of users
    await LogService.createLog('info', 'Users retrieved successfully', {
      count: users.length,
    });

    res.status(200).json(users);
  } catch (error) {
    // Log error during user retrieval
    await LogService.createLog('error', 'Failed to retrieve users', {
      error: error.message,
    });

    res.status(500).json({ error: error.message });
  }
};

 