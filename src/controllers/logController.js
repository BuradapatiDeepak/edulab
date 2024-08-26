const Log = require('../models/Log');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find(); // Optionally, add filters here
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
