const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const ProductModel = require('../models/Orders');

const getAllOrders = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const docs = await ProductModel.find({}).select('id data status address order');
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};
const getOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { orderId } = req.params;
    try {
        const docs = await ProductModel.findOne({ "id": orderId }).select('id data status address order');
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
    const id = uuidv4();
    try {
        await ProductModel.create({
            id,
            status,
            address,
            order
        });
        res.status(200).json({ orderId: id });
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
    getOrder,
    createOrder,
    updateOrder
};