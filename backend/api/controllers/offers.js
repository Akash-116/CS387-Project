const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()


exports.get_all=function(req,res){
    var pgquery='select * from offer';

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

exports.get_offer=function(req,res){
    var id=req.params.id;

    pgquery='select * from offer where offer_id=$1::int';
    client.query(pgquery,[id],function(err,res1){
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
                    message : 'No offer with that ID'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows[0]
                });
            }
        }
    });
}

exports.add_offer=function(req,res){
    var offer=req.body;

    pgquery='insert into offer(name, discount) values($1,$2::int) returning offer_id';
        client.query(pgquery, [offer.name, offer.discount], function(err, res1) {
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
                    data: res1.rows[0].offer_id
                });
            }
        });
}

exports.add_dishes_offer=function(req,res){
    var offer=req.body;

    pgquery='insert into offer_valid(offer_id, dat, dish_id) values($1::int,$2,$3::int)';
    client.query(pgquery,[offer.offer_id, offer.dat, offer.dish_id],function(err,res1){
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