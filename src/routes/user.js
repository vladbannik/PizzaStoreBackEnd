const express = require('express');
const { check } = require('express-validator');
const { approveUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.patch('/approve', [
  check('id', 'Id must be required')
    .exists(),
], approveUser);

router.delete('/', [
  check('id', 'Id must be required')
    .exists(),
], deleteUser);

module.exports = router;
