const { Client } = require("pg")
const dotenv = require("dotenv");
const bcrypt=require('bcrypt')
const saltRounds=10
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.create_customer=function(req,res){
    var user=req.body;
    
    if(!user.pswd){
        console.log('UserName Not given')
        res.status(500).send({
            success: false,
            message: 'UserName Not given'
        });
    }
    else{
        bcrypt.hash(user.pswd,saltRounds,function(err1,hash){
            if(err1){
                res.status(500).send({
                    success : false,
                    message : err1.message
                });
            }
            else{
                user.pswd=hash;
                pgquery='insert into customer(name,username,pswd,ph_no,addr) values($1,$2,$3,$4::bigint,$5)';

                client.query(pgquery, [user.name,user.username,user.pswd,user.ph_no,user.addr], function(err, res1) {
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
            
        });
    }
}

exports.get_customer=function(req,res){
    var username=req.params.username;
    var pswd=req.params.pswd;
    pgquery='select * from customer where username=$1::text';

    client.query(pgquery, [username], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('No user with that UserName');
                res.status(500).send({
                    success: false,
                    message: 'No user with that UserName'
                });
            }
            else{
                var pass_hash=rows[0].pswd;
                console.log(pass_hash);
                bcrypt.compare(pswd,pass_hash,function(err1,res2){
                    if(err1){
                        console.log(err1.message)
                        res.status(500).send({
                            success: false,
                            message: err1.message
                        });
                    }
                    else{
                        if(res2==false){
                            console.log('Incorrect Password')
                            res.status(500).send({
                                success: false,
                                message: 'Incorrect Password'
                            });
                        }
                        else{
                            res.status(200).send({
                                success: true,
                                data : rows[0]
                            });
                        }
                    }
                });
            }
        }
    });
}

exports.get_all_customers=function(req,res){
    
    pgquery='select * from customer';

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

exports.edit_customer=function(req,res){
    var user=req.body;    
                
    pgquery='update employee set name = $2,ph_no=$3::bigint,addr=$5) where username = $1';

    client.query(pgquery, [user.username,user.name,user.ph_no,user.addr], function(err, res1) {
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