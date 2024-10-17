const express = require('express');
const router = express.Router();

const index = require('./index');
const categoryRouter = require('./category');
const product = require('./product');
const auth = require('./auth');
const order = require('./order');

// Định tuyến tất cả các router
router.get('/', index);
router.use('/category', categoryRouter);
router.use('/product', product);
router.use('/auth', auth);
router.use('/order', order);


module.exports = router;
