const express=require('express')
const router=express.Router();
const deliveries = require('../controllers/delivery')

router.get('/all',deliveries.get_all);
router.post('/change_codes',deliveries.change_delivery_codes);
router.get('/free_prim/:area_id',deliveries.free_delivery_persons_prim);
router.get('/free_sec/:area_id',deliveries.free_delivery_persons_sec);
module.exports=router;