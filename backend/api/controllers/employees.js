const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.create_employee=function(req,res){
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
                pgquery='insert into employee(name,username,pswd,salary,ph_no,addr,e_type,join_date,status) values($1,$2,$3,$4::int,$5::bigint,$6,$7,$8,$9)';

                client.query(pgquery, [user.name,user.username,user.pswd,user.salary,user.ph_no,user.addr,user.e_type,CURRENT_DATE,'Working'], function(err, res1) {
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
    var username=req.params.username;
    var pswd=req.params.pswd;
    pgquery='select * from employee where username=$1::text';

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