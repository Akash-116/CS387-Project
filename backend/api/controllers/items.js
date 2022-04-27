const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.get_all_items=function(req,res){
    pgquery='select * from item';

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

exports.get_item=function(req,res){
    var id=req.params.id;

    pgquery='select * from item where item_id=$1';
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
                    message : 'No Item with that ID'
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

exports.get_bought_items_today=function(req,res){
    pgquery='select * from day_to_day_items where bought>0 and dat=CURRENT_DATE';
    client.query(pgquery,function(err,res1){
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
                    message : 'No Items bought Today'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows
                });
            }
        }
    });
}

exports.update_item_bought=function(req,res){
    var item_id=req.query.item_id;
    var quantity=req.query.quantity;
    var pgquery1='insert into day_to_day_items(dat,item_id,bought) values(CURRENT_DATE,$1::int,$2::int) on conflict on constraint day_item_prim do update set bought=bought+$2::int';

    client.query(pgquery1,[item_id,quantity],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            if(res1.rows.length<1){
                res.status(500).send({
                    success : false,
                    message : 'No Item with that id'
                });
            }
            else{
                var pgquery2='update item set quan_inv=quan_inv+$2::int where item_id=$1::int';
                client.query(pgquery2,[item_id,quantity],function(err2,res2){
                    if(err2){
                        res.status(500).send({
                            success : false,
                            message : err2.message
                        });
                    }
                    else{
                        res.status(200).send({
                            success : false
                        });
                    }
                });
            }
            
        }
    });
}

exports.add_item=function(req,res){
    var item=req.body;

    pgquery='insert into item(item_name,cost,unit) values($1,$2::int,$3) returning item_id';
        client.query(pgquery, [item.item_name,item.cost,item.unit], function(err, res1) {
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
                    data: res1.rows[0].item_id
                });
            }
        });
}