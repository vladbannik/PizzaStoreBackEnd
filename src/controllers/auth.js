const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  UserModel.find({ email }, (error, user) => {
    if (error) return res.status(422).json({ error: { message: 'Email or password is incorrect' } });
    const result = bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    }
    return res.status(422).json({ error: { message: 'Email or password is incorrect' } });
  });

  return false;
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  UserModel.create({
    id: uuidv4(),
    email,
    password: hashPassword,
    approve: false,
  }, (err) => {
    if (err) return res.status(422).json({ error: { message: 'Email is already taken' } });
    return res.status(200).json({ success: 'User created' });
  });
  return false;
};

module.exports = { signIn, signUp };
