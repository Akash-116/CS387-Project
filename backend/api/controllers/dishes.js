const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.get_all_dishes=function(req,res){
    pgquery='select * from dish';

    client.query(pgquery,  function(err, res1) {
        if (err) {
            console.log(err.message);
            res.status(500).send({
                success: false,
                message: err.message
            });
        } 
        else {
            res.status(200).send({
                message : true,
                data : res1.rows
            });
        }
    });
}

exports.get_dish=function(req,res){
    var id=req.params.id;

    pgquery='select * from dish where dish_id=$1';
    client.query(pgquery,[id],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            if(res1.rows.length<1){
                res.status(500).status({
                    success : false,
                    message : 'No Dish with that ID'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows[0]
                });
            }
        }
    })
}

exports.delete_dish=function(req,res){
    var id=req.params.id;
    
    pgquery='delete from dish where dish_id=$1::int';

    client.query(pgquery, [id], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('No dish with that id');
                res.status(500).send({
                    success: false,
                    message: 'No dish with that id'
                });
            }
            else{
                res.status(200).send({
                    message : true
                });
            }
        }
    });
}

exports.get_items_dish=function(req,res){
    var id=req.params.id;

    pgquery='select * from dish_items where dish_id=$1';
    client.query(pgquery,[id],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            if(res1.rows.length<1){
                res.status(500).status({
                    success : false,
                    message : 'No Dish with that ID'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows
                });
            }
        }
    })
}

exports.edit_dish=function(req,res){
    var dish=req.body; 
                
    pgquery='update dish set dish_name = $2, recipe = $3, time_taken = $4::int) where dish_id = $1';

    client.query(pgquery, [dish.dish_id, dish.dish_name, dish.recipe, dish.time_taken], function(err, res1) {
        if (err) {
            console.log(err.message);
            res.status(500).send({
                success: false,
                message: err.message
            });
        }
        else{
            res.status(200).send({
                success: true
            });
        }
    });          
}

exports.add_dish=function(req,res){
    var dish=req.body;

    pgquery='insert into dish(dish_name, recipe, type, time_taken) values($1,$2,$3,$4::int)';
        client.query(pgquery, [dish.dish_name, dish.recipe, dish.type, dish.time_taken], function(err, res1) {
            if (err) {
                console.log(err.message);
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else{
                res.status(200).send({
                    success: true,
                    data: res1.rows[0].c_id
                });
            }
        });
}

exports.add_items_dish=function(req,res){
    var id = req.params.id;
    var item_id = req.params.item_id;
    var quantity = req.params.quantity;

    pgquery='insert into dish_items(dish_id, item_id, quantity) values($1::int,$2::int,$3::int)';
    client.query(pgquery,[id, item_id, quantity],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            res.status(200).send({
                success: true
            });
        }
    })
}

exports.update_item_dish=function(req,res){
    var id = req.params.id;
    var item_id = req.params.item_id;
    var quantity = req.params.quantity;

    pgquery='update dish_items set quantity = $3::int) where dish_id = $1 and item_id = $2';

    client.query(pgquery, [id, item_id, quantity], function(err, res1) {
        if (err) {
            console.log(err.message);
            res.status(500).send({
                success: false,
                message: err.message
            });
        }
        else{
            res.status(200).send({
                success: true
            });
        }
    });
}

exports.delete_item_dish=function(req,res){
    var id=req.params.id;
    var item_id = req.params.item_id;
    
    pgquery='delete from dish_items where dish_id=$1::int and item_id=$2::int';

    client.query(pgquery, [id, item_id], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('No item in that dish');
                res.status(500).send({
                    success: false,
                    message: 'No item in that dish'
                });
            }
            else{
                res.status(200).send({
                    message : true
                });
            }
        }
    });
}