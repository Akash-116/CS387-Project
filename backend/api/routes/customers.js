const express=require('express')
const router=express.Router();
const customers = require('../controllers/customers')

router.post('/login',customers.get_customer);
router.post('/create',customers.create_customer);
router.get('/all',customers.get_all_customers);
router.post('/edit',customers.edit_customer);
router.get('/previous_orders/:c_id',customers.get_customer_previous);
router.post('/dish_rating',customers.give_dish_rating);

module.exports=router;