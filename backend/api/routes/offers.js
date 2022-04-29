const express=require('express');
const router=express.Router();
const offers = require('../controllers/offers');

router.get('/all',offers.get_all);
router.get('/single/:id',offers.get_offer);
router.post('/add',offers.add_offer);
router.post('/add_dishes_offer',offers.add_dishes_offer);
router.delete('/delete/:id', offers.delete_offer);

module.exports = router;