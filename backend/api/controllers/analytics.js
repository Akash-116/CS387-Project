const { Client } = require("pg")
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect()

exports.get_best_dish=function(req,res){
    pgquery='select dish_name from dish, (SELECT dish_id FROM order_dishes GROUP BY dish_id ORDER BY count(*) DESC limit 1) as a where dish.dish_id=a.dish_id;';

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
                data : res1.rows[0]
            });
        }
    });
}

exports.get_best_day=function(req,res){
    pgquery=`
    SELECT dat from orders
    GROUP BY dat
    ORDER BY count(*) DESC
    limit 1;
    `

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
                data : res1.rows[0]
            });
        }
    });
}

exports.get_freq_customers=function(req,res){
    pgquery=`
    SELECT *
    FROM customer,(SELECT c_id,count(*) as freq from orders group by c_id ORDER BY freq desc
    limit 1) as a1
    WHERE a1.c_id = customer.c_id;
    `

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

exports.get_best_delivery=function(req,res){
    pgquery=`
    select delivery_person,name
    from (SELECT delivery_person,count(*) as num_deliveries from orders where delivery_person is not null group by delivery_person
    order by num_deliveries desc limit 1) as A,employee where A.delivery_person=employee.e_id
    `

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
                data : res1.rows[0]
            });
        }
    });
}