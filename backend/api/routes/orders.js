const express=require('express')
const router=express.Router();
const orders = require('../controllers/orders')

router.get('/all',orders.get_all_orders);
router.get('/single_order/:order_id',orders.get_single_order);
router.post('/add',orders.add_order);
router.post('add_order_dish',orders.add_order_dish);

module.exports=router;