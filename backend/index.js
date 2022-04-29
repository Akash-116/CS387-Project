const express = require("express");
const customerRoutes = require('./api/routes/customers');
const employeeRoutes = require('./api/routes/employees');
const itemRoutes = require('./api/routes/items');
const dishRoutes = require('./api/routes/dishes');
const orderRoutes = require('./api/routes/orders');
const tableRoutes = require('./api/routes/tables');
const deliveryRoutes = require('./api/routes/delivery');
const offerRoutes = require('./api/routes/offers');
const cartRoutes = require('./api/routes/cart');
const analyticsRoutes = require('./api/routes/analytics');
const areaRoutes = require('./api/routes/areas');
const bodyParser = require('body-parser');

const sessobj=require("./connectDB").sessobj;

var app = express()
app.use(sessobj);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('images'))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST');
    // if(req.method=='OPTIONS'){
    //     res.header('Access-Control-Allow-Methods','GET,PUT,DELETE,POST');
    //     return res.status(200).json({});
    // }
    console.log(req.method, req.path);
    next();
})
app.use('/customer', customerRoutes)
app.use('/employee', employeeRoutes)
app.use('/items', itemRoutes);
app.use('/dishes', dishRoutes);
app.use('/orders', orderRoutes);
app.use('/tables', tableRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/offers', offerRoutes);
app.use('/cart', cartRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/areas', areaRoutes);

var server = app.listen(process.env.port, function () {
    var port = server.address().port
    console.log("app listening at http://localhost:%s", port)
});

app.post('/logout', async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).send({
            success : true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            success : false
        });
    }
});