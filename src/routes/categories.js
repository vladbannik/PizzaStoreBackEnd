const express = require('express');
const { check } = require('express-validator');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', [
  check('name', 'Name must be required')
    .exists(),
], createCategory);

router.patch('/:id', [
  check('name', 'Name must be required')
    .exists(),
], updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
