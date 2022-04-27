const express=require('express')
const router=express.Router();
const areas = require('../controllers/areas')

router.get('/all',areas.get_all_areas);

module.exports=router;