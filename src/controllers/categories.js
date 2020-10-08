const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const CategoriesModel = require('../models/categories');
const getToken = require('../utils/getToken');

const getAllCategories = (req, res) => {
  CategoriesModel.find({}, (err, categories) => {
    if (err) return res.status(501).json({ error: { message: 'Something went wrong' } });
    return res.status(200).json({ categories });
  });
};

const createCategory = (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: { message: 'Invalid token' } });
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) return res.status(401).json({ error: { message: 'Invalid token' } });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    CategoriesModel.create({
      id: uuidv4(),
      name,
    }, (error) => {
      if (error) return res.status(422).json({ error: { message: 'Email is already taken' } });
      return res.status(200).json({ success: 'Category created' });
    });

    return false;
  });
  return false;
};

const updateCategory = (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: { message: 'Invalid token' } });
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) return res.status(401).json({ error: { message: 'Invalid token' } });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const { id } = req.query;

    CategoriesModel.findOneAndUpdate({ id }, { name }, { upsert: true }, (error) => {
      if (error) return res.send(500, { error });
      return res.status(200).json({ success: 'OK' });
    });

    return false;
  });
  return false;
};

const deleteCategory = (req, res) => {};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
