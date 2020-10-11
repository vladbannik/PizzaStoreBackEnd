const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const CategoriesModel = require('../models/categories');

const getAllCategories = async (req, res) => {
  try {
    const docs = await CategoriesModel.find({}).select('id name -_id');
    res.status(200).json(docs);
  } catch (e) {
    res.status(501).json({ error: { message: 'Something went wrong' } });
  }
};

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    await CategoriesModel.create({
      id: uuidv4(),
      name,
    });
    res.status(200).json({ success: 'Category created' });
  } catch (e) {
    res.status(422).json({ error: { message: 'Category name is already taken' } });
  }
};

const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const { id } = req.params;

  try {
    await CategoriesModel.findOneAndUpdate({ id }, { name }, { upsert: true });
    res.status(200).json({ success: 'OK' });
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await CategoriesModel.findOneAndDelete({ id });
    res.status(200).json({ success: 'OK' });
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
