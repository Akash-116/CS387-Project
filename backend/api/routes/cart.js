const express=require('express')
const router=express.Router();
const cart = require('../controllers/cart');

router.get('/all/:id',cart.get_cart);
router.get('/add_dish_cart',cart.add_dish_cart);
router.get('/edit_dish_cart',cart.edit_dish_cart);

module.exports=router;