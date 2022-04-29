const express = require('express')
const router = express.Router();
const cart = require('../controllers/cart');

router.get('/all/:id', cart.get_cart);
router.delete('/clear/:id', cart.delete_cart);
router.post('/add_dish_cart', cart.add_dish_cart);
router.post('/edit_dish_cart', cart.edit_dish_cart);

module.exports = router;