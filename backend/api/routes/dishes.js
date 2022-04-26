const express=require('express');
const router=express.Router();
const dishes = require('../controllers/dishes.js');

router.get('/all',dishes.get_all_dishes);
router.get('/single/:id',dishes.get_dish);
router.post('/add',dishes.add_dish);
router.post('/edit',dishes.edit_dish);
router.get('/delete/:id',dishes.delete_dish);
router.get('/dish_items/:id',dishes.get_items_dish);
router.get('/add/:id/:item_id/:quantity',dishes.add_items_dish);
router.get('/delete/:id/:item_id/:quantity',dishes.delete_items_dish);

module.exports=router;