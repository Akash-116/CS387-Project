const client = require("../../connectDB").client;

exports.get_all_orders=function(req,res){
    var pgquery='select * from orders';
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows
                });
            }
        });
    }
}

exports.get_single_order=function(req,res){
    var order_id=req.params.order_id;
    var pgquery='select A.*,C.dish_id,C.dish_name,C.dish_type,C.cost,B.offer_id from orders as A,order_dishes as B,dish as C where A.order_id=$1::int and B.order_id=A.order_id and B.dish_id=C.dish_id';
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[order_id],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows
                });
            }
        });
    }
}

exports.add_order=function(req,res){
    var order=req.body;
    var pgquery="insert into orders(c_id,area_id,dat,received_time,status,order_type) values($1::int,$2::int,CURRENT_DATE,CURRENT_TIME,'Preparing',$3) returning order_id";
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[order.c_id,order.area_id,order.order_type],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows[0].order_id
                });
            }
        });
    }
}

exports.add_order_dish = function (req, res) {
    var order_id = req.body.order_id;
    var dish_id = req.body.dish_id;
    var quantity = req.body.quantity;
    var offer_id = req.body.offer_id;
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        var pgquery='insert into order_dishes values($1::int,$2::int,$3::int,$4::int)';
        client.query(pgquery,[order_id,dish_id,quantity,offer_id],function(err,res1){
            if(err){
                res.status(500).send({
                    success : true,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true
                });
            }
        });
    }
}

exports.assign_delivery=function(req,res){
    var data=req.body;
    var pgquery='update orders set delivery_person=$2::int where order_id=$1::int';
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[data.order_id,data.delivery_person],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true
                });
            }
        });
    }
}

exports.assign_table=function(req,res){
    var data=req.body;
    var pgquery='update orders set table_id=$2::int where order_id=$1::int';
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[data.order_id,data.table_id],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true
                });
            }
        });
    }
}

exports.finished=function(req,res){
    var data=req.body;
    var pgquery='update orders set finished_time=CURRENT_TIME, status=$2 where order_id=$1::int';
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[data.order_id, data.status],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true
                });
            }
        });
    }
}

exports.delivered=function(req,res){
    var data=req.body;
    var pgquery="update orders set delivered_time=CURRENT_TIME, status='Delivered' where order_id=$1::int";
    if((req.session.role != 'Manager') && (req.session.role != 'Billing Manager') && (req.session.role != 'Delivery')){
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else{
        client.query(pgquery,[data.order_id],function(err,res1){
            if(err){
                res.status(500).send({
                    success : false,
                    message : err.message
                });
            }
            else{
                res.status(200).send({
                    success : true
                });
            }
        });
    }
}