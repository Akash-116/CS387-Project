const express=require('express');
const router=express.Router();
const tables = require('../controllers/tables');

router.get('/all',tables.get_all_tables);
router.get('/single/:id',tables.get_table);
router.post('/empty',tables.get_empty_tables);
router.post('/edit',tables.edit_table_status);
router.get('/add',tables.add_table);

module.exports=router;