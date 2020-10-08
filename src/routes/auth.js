const express = require('express');
const { check } = require('express-validator');
const { signIn, signUp } = require('../controllers/auth');

const router = express.Router();

router.post('/sign-in', [
  check('email')
    .exists()
    .isEmail()
    .normalizeEmail()
    .trim(),
  check('password', 'Password is required')
    .exists()
    .trim(),
], signIn);

router.post('/sign-up', [
  check('email')
    .exists()
    .isEmail()
    .normalizeEmail()
    .trim(),
  check('password', 'Password field must have length from 3 to 12')
    .exists()
    .isLength({ min: 3, max: 12 })
    .trim(),
  check('passwordConfirmation', 'Password confirmation field must have the same value as the password field')
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .trim(),
], signUp);

module.exports = router;
