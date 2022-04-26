const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()


exports.get_all=function(req,res){
    var pgquery='select * from employee where e_type="Delivery" and left_date is null';

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

exports.change_delivery_codes=function(req,res){
    var data=req.body;
    var pgquery='update employee set prim_area_id=$1::int and sec_area_id=$2::int where e_id=$3::int';

    client.query(pgquery,[data.prim_area_id,data.sec_area_id,data.e_id],function(err,res1){
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

exports.free_delivery_persons_prim=function(req,res){
    var area_id=req.params.area_id;
    var pgquery='select * from employee where prim_area_id=$1::int and e_type="Delivery" and d_status="Free"';

    client.query(pgquery,[area_id],function(err,res1){
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

exports.free_delivery_persons_sec=function(req,res){
    var area_id=req.params.area_id;
    var pgquery='select * from employee where sec_area_id=$1::int and e_type="Delivery" and d_status="Free"';

    client.query(pgquery,[area_id],function(err,res1){
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