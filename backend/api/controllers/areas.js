const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()


exports.get_all_areas=function(req,res){
    var pgquery="select * from area";

    client.query(pgquery,function(err,res1){
        if(err){
            res.status(500).send({
                success:false,
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