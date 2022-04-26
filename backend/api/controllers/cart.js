const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.get_cart=function(req,res){
    var id=req.params.id;

    pgquery='select * from cart where c_id=$1';
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
                    message : 'Nothing in the cart'
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

exports.add_dish_cart=function(req,res){
    var cart = req.body;

    pgquery='insert into cart(c_id, dish_id) values($1::int,$2::int)';
    client.query(pgquery,[cart.c_id, cart.dish_id],function(err,res1){
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

exports.edit_dish_cart=function(req,res){
    var cart = req.body;
    
    pgquery='update cart set quantity = $3 where c_id = $1 and dish_id = $2';
    client.query(pgquery,[cart.c_id, cart.dish_id, cart.quantity],function(err,res1){
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