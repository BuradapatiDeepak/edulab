const Log = require('../models/Log');

exports.logAction = async (action, userId) => {
  const log = new Log({
    action,
    user: userId,
  });
  await log.save();
};
