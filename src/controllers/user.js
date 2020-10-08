const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/user');
const getToken = require('../utils/getToken');

const approveUser = (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: { message: 'Invalid token' } });
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) return res.status(401).json({ error: { message: 'Invalid token' } });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    UserModel.findOneAndUpdate({ id }, { approve: true }, { upsert: true }, (error) => {
      if (error) return res.send(500, { error });
      return res.status(200).json({ success: 'OK' });
    });

    return false;
  });
  return false;
};

const deleteUser = (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: { message: 'Invalid token' } });
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) return res.status(401).json({ error: { message: 'Invalid token' } });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    UserModel.findOneAndDelete({ id }, {}, (error) => {
      if (error) return res.send(500, { error });
      return res.status(200).json({ success: 'OK' });
    });

    return false;
  });
  return false;
};

module.exports = { approveUser, deleteUser };
