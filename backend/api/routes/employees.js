const express=require('express')
const router=express.Router();
const employees = require('../controllers/employees')

router.get('/get',employees.get_employee);
router.post('/create',employees.create_employee);
router.get('/all',employees.get_all_employees);
router.delete('/single',employees.delete_employee);
router.post('/edit',employees.edit_employee);

module.exports=router;