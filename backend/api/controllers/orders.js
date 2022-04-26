const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.get_all_orders=function(req,res){
    var pgquery='select * from orders';

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

exports.get_single_order=function(req,res){
    var order_id=req.params.order_id;
    var pgquery='select A.*,C.dish_id,C.dish_name,C.dish_type,C.cost,B.offer_id from orders as A,order_dishes as B,dish as C where A.order_id=$1::int and B.order_id=A.order_id and B.dish_id=C.dish_id';

    client.query(pgquery,function(req,res1){
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

exports.add