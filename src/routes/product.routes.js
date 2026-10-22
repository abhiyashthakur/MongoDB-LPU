const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product.model');

const router = express.Router();

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function sendValidationError(res, error) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid product data',
      errors: error.name === 'ValidationError'
        ? Object.values(error.errors).map((validationError) => validationError.message)
        : ['Product id is invalid']
    });
  }

  return res.status(500).json({ message: 'Product operation failed' });
}

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    sendValidationError(res, error);
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (_error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({
      category: { $regex: `^${req.params.category}$`, $options: 'i' }
    }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (_error) {
    res.status(500).json({ message: 'Failed to fetch products by category' });
  }
});

router.get('/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: 'Product id is invalid' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (_error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

router.put('/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: 'Product id is invalid' });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    sendValidationError(res, error);
  }
});

router.delete('/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: 'Product id is invalid' });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (_error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
