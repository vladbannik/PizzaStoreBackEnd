const express = require('express');
const withJWT = require('../utils/withJWT');
const { nameValidator } = require('../validation/categories');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', [nameValidator, withJWT], createCategory);

router.patch('/:id', [nameValidator, withJWT], updateCategory);

router.delete('/:id', withJWT, deleteCategory);

module.exports = router;
