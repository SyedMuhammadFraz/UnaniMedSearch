const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// Route to place an order
router.post('/', placeOrder);
router.get('/:user', getUserOrders);

module.exports = router;
