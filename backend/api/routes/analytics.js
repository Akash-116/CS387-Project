const express = require('express')
const router = express.Router();
const analytics = require('../controllers/analytics')

router.get('/get_best_dish', analytics.get_best_dish);
router.get('/get_best_day', analytics.get_best_day);
router.get('/get_freq_customers', analytics.get_freq_customers);
router.get('/get_best_delivery', analytics.get_best_delivery);
router.get('/most_rated_dishes', analytics.most_rated_dishes);

module.exports = router;