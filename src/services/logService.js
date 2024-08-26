const Log = require('../models/Log');

const createLog = async (level, message, metadata) => {
  try {
    const newLog = new Log({
      level,
      message,
      metadata,
      timestamp: new Date(),
    });
    await newLog.save();
  } catch (error) {
    console.error('Failed to create log:', error);
  }
};

module.exports = {
  createLog,
};
