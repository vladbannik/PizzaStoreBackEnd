const express = require('express');
const withJWT = require('../utils/withJWT');
const { approveUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.patch('/approve/:id', withJWT, approveUser);

router.delete('/:id', withJWT, deleteUser);

module.exports = router;
