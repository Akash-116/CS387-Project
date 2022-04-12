const express = require("express")
const customerRoutes=require('./api/routes/customers')
const employeeRoutes=require('./api/routes/employees')
const bodyParser=require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

var app=express()
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static('images'))
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Methods','GET,PUT,DELETE,POST');
    // if(req.method=='OPTIONS'){
    //     res.header('Access-Control-Allow-Methods','GET,PUT,DELETE,POST');
    //     return res.status(200).json({});
    // }
    console.log(req.method,req.path);
    next();
})
app.use('/customer',customerRoutes)
app.use('/employee',employeeRoutes)

var server=app.listen(process.env.port,function(){
    var port = server.address().port
    console.log("app listening at http://localhost:%s", port)
})