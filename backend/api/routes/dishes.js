const express=require('express');
const router=express.Router();
const dishes = require('../controllers/dishes');

router.get('/all',dishes.get_all_dishes);
router.get('/single/:id',dishes.get_dish);
router.post('/add',dishes.add_dish);
router.post('/edit',dishes.edit_dish);
router.delete('/delete/:id',dishes.delete_dish);
router.get('/dish_items/:id',dishes.get_items_dish);
router.post('/add_item',dishes.add_items_dish);
router.post('/edit_item',dishes.update_item_dish);
router.delete('/delete_item',dishes.delete_item_dish);

module.exports=router;