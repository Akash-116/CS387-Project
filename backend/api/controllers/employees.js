const { Client } = require("pg")
const dotenv = require("dotenv");
const bcrypt=require('bcrypt')
const saltRounds=10
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.create_employee=function(req,res){
    var user=req.body;
    
    if(!user.pswd){
        console.log('Password Not given')
        res.status(500).send({
            success: false,
            message: 'Password Not given'
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
                pgquery='insert into employee(name,username,pswd,salary,ph_no,addr,e_type,join_date,status,prim_area_id,sec_area_id) values($1,$2,$3,$4::int,$5::bigint,$6,$7,CURRENT_DATE,$8,$9,$10) returning e_id';

                client.query(pgquery, [user.name,user.username,user.pswd,user.salary,user.ph_no,user.addr,user.e_type,'Working',user.prim_area_id,user.sec_area_id], function(err, res1) {
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
                            data: res1.rows[0].e_id
                        });
                    }
                });
            }
            
        });
    }
}

exports.get_employee=function(req,res){
    console.log("Get Employee");
    var username=req.body.username;
    var pswd=req.body.pswd;
    console.log(username);
    console.log(pswd);
    pgquery='select * from employee where username=$1::text';

    client.query(pgquery, [username], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                token : 'ERROR',
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('No user with that UserName');
                res.status(500).send({
                    success: false,
                    token : 'ERROR',
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
                            token : 'ERROR',
                            message: err1.message
                        });
                    }
                    else{
                        if(res2==false){
                            console.log('Incorrect Password')
                            res.status(500).send({
                                success: false,
                                token : 'ERROR',
                                message: 'Incorrect Password'
                            });
                        }
                        else{
                            res.status(200).send({
                                success: true,
                                token : 'VALID',
                                data : rows[0]
                            });
                        }
                    }
                });
            }
        }
    });
}

exports.get_all_employees=function(req,res){
    
    pgquery='select * from employee';

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

exports.delete_employee=function(req,res){
    var e_id=req.body.e_id;
    
    pgquery='delete from employee where e_id=$1::int returning e_id';

    client.query(pgquery, [e_id], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('No user with that ID');
                res.status(500).send({
                    success: false,
                    message: 'No user with that ID'
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


exports.edit_employee=function(req,res){
    var user=req.body;    
                
    pgquery='update employee set name = $2,salary=$3::int,ph_no=$4::bigint,addr=$5,e_type=$6,status=$7 where e_id = $1::int';

    client.query(pgquery, [user.e_id,user.name,user.salary,user.ph_no,user.addr,user.e_type,user.status], function(err, res1) {
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
