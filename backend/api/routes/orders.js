const express = require('express')
const router = express.Router();
const orders = require('../controllers/orders')

router.get('/all/count', orders.get_all_orders_count);
router.get('/all', orders.get_all_orders);
router.get('/single/:order_id', orders.get_single_order);
router.post('/add', orders.add_order);
router.post('/add_order_dish', orders.add_order_dish);
router.post('/assign_delivery', orders.assign_delivery);
router.post('/assign_table', orders.assign_table);
router.post('/finished', orders.finished);
router.post('/delivered', orders.delivered);

module.exports = router;