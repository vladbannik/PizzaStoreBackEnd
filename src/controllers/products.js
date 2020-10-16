const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const ProductModel = require('../models/products');

const getAllProducts = async (req, res) => {
    try {
        const docs = await ProductModel.find({}).select('id name description price sizes image categoryName -_id');
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};
const getProduct = async (req, res) => {
    const { categoryName } = req.params;
    try {
        const docs = await ProductModel.find({ "categoryName": categoryName }).select('id name description price sizes image categoryName -_id');
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};

const createProducts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { name, description, price, size, image, categoryName } = req.body;
    const sizes = size.map((old) => ({ ...old, id: uuidv4() }));
    try {
        await ProductModel.create({
            id: uuidv4(),
            name,
            description,
            price,
            sizes,
            image,
            categoryName,
        });
        res.status(200).json({ success: 'Product created' });
    } catch (e) {
        res.status(422).json({ error: { message: 'Category name is already taken' } });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    try {
        await ProductModel.findOneAndUpdate({ id }, [{ $addFields: req.body }], { upsert: true });
        res.status(200).json({ success: 'OK' });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await ProductModel.findOneAndDelete({ id });
        res.status(200).json({ success: 'OK' });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
};
module.exports = {
    getAllProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct
};