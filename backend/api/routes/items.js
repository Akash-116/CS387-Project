const express=require('express');
const router=express.Router();
const items = require('../controllers/items.js');

router.get('/all',items.get_all_items);
router.get('/single/:id',items.get_item);
router.get('/bought_today',items.get_bought_items_today);
router.post('/update_item_bought',items.update_item_bought);
router.post('/add',items.add_item);

module.exports=router;