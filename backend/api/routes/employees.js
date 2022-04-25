const express=require('express')
const router=express.Router();
const employees = require('../controllers/employees')

router.get('/get/:username/:pswd',employees.get_employee);
router.post('/create',employees.create_employee);

module.exports=router;