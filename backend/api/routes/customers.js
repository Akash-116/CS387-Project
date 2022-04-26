const express=require('express')
const router=express.Router();
const cutomers = require('../controllers/customers')

router.get('/get/:username/:pswd',cutomers.get_customer);
router.post('/create',cutomers.create_customer);
router.get('/all',cutomers.get_all_customers);
router.post('/edit',cutomers.edit_customer);

module.exports=router;