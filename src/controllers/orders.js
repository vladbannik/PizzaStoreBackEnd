const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const ProductModel = require('../models/Orders');

const getAllOrders = async (req, res) => {
    try {
        const docs = await ProductModel.find({}).select('id data status address order');
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};

const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { status, address, order } = req.body;
    const curentData = new Date();
    try {
        await ProductModel.create({
            id: uuidv4(),
            curentData,
            status,
            address,
            order
        });
        res.status(200).json({ success: 'Order created' });
    } catch (e) {
        res.status(422).json({ error: { message: 'Сreation errors' } });
    }
};

const updateOrder = async (req, res) => {
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
module.exports = {
    getAllOrders,
    createOrder,
    updateOrder
};