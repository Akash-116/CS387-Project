const dotenv = require("dotenv");
const bcrypt = require('bcrypt')
const saltRounds = 10

const client = require("../../connectDB").client;

exports.create_customer = function (req, res) {
    var user = req.body;

    if (!user.pswd) {
        console.log('Password Not given')
        res.status(500).send({
            success: false,
            message: 'Password Not given'
        });
    }
    else {
        bcrypt.hash(user.pswd, saltRounds, function (err1, hash) {
            if (err1) {
                res.status(500).send({
                    success: false,
                    message: err1.message
                });
            }
            else {
                user.pswd = hash;
                pgquery = 'insert into customer(name,username,pswd,ph_no,addr) values($1,$2,$3,$4::bigint,$5) RETURNING c_id';

                client.query(pgquery, [user.name, user.username, user.pswd, user.ph_no, user.addr], function (err, res1) {
                    if (err) {
                        console.log(err.message);
                        res.status(500).send({
                            success: false,
                            message: err.message
                        });
                    }
                    else {
                        console.log(res1.rows);
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

exports.get_customer = function (req, res) {
    var username = req.body.username;
    var pswd = req.body.pswd;
    console.log(username);
    console.log(req.session);
    pgquery = 'select * from customer where username=$1::text';

    client.query(pgquery, [username], function (err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                token: 'ERROR',
                message: err.message
            });
        } else {
            var rows = res1.rows;
            if (rows.length == 0) {
                console.log('No user with that UserName');
                res.status(500).send({
                    success: false,
                    token: 'ERROR',
                    message: 'No user with that UserName'
                });
            }
            else {
                var pass_hash = rows[0].pswd;
                console.log(pass_hash);
                bcrypt.compare(pswd, pass_hash, function (err1, res2) {
                    if (err1) {
                        console.log(err1.message)
                        res.status(500).send({
                            success: false,
                            token: 'ERROR',
                            message: err1.message
                        });
                    }
                    else {
                        if (res2 == false) {
                            console.log('Incorrect Password')
                            res.status(500).send({
                                success: false,
                                token: 'ERROR',
                                message: 'Incorrect Password'
                            });
                        }
                        else {
                            req.session.login = true;
                            req.session.pid = rows[0].c_id;
                            req.session.role = 'customer';

                            console.log(req.session);
                            res.status(200).send({
                                success: true,
                                token: 'VALID',
                                data: rows[0]
                            });
                        }
                    }
                });
            }
        }
    });

}

exports.get_all_customers = function (req, res) {
    if ((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'select * from customer order by c_id';
        client.query(pgquery, function (err, res1) {
            if (err) {
                console.log(err.message);
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    data: res1.rows
                });
            }
        });
    }
}

exports.edit_customer = function (req, res) {
    var user = req.body;
    if ((req.session.role != 'customer') || (req.session.pid != user.c_id)) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'update customer set username=$1, name = $2,ph_no=$3::bigint,addr=$4 where c_id=$5::int';

        client.query(pgquery, [user.username, user.name, user.ph_no, user.addr, user.c_id], function (err, res1) {
            if (err) {
                console.log(err.message);
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                res.status(200).send({
                    success: true
                });
            }
        });
    }
}

exports.get_customer_previous = function (req, res) {
    var c_id = req.params.c_id;
    if ((req.session.pid != c_id) || ((req.session.role != 'customer') && (req.session.role != 'Manager'))) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = `with tbl1 as (select A.*,B.dish_id,B.quantity,B.rating,C.dish_name,C.recipe,C.time_taken,C.dish_type,C.cost,C.photo from orders as A,order_dishes as B,dish as C where A.c_id=$1::int and A.order_id=B.order_id and B.dish_id=C.dish_id)
        (select *, 1 as statusrank from tbl1
            where (status='Preparing') or (status='Out for delivery')
            )
            union
            (select *, 2 as  statusrank from tbl1
            where (status='Delivered') or (status='Served') or (status='Completed')
            )
            order by statusrank,order_id`

        client.query(pgquery, [c_id], function (err, res1) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    data: res1.rows
                });
            }
        });
    }
}

exports.give_dish_rating = function (req, res) {
    var data = req.body;
    console.log(data);
    if (req.session.role != 'customer') {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'update order_dishes set rating=$3::int where order_id=$2::int and dish_id=$1::int returning order_id,dish_id';

        pgquery1 = 'update dish set rating=(rating*num_ratings+$2::real)/(num_ratings+1) , num_ratings=num_ratings+1 where dish_id=$1::int returning dish_id';

        client.query(pgquery, [data.dish_id, data.order_id, data.rating], function (err, res1) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                if (res1.rows.length < 1) {
                    console.log("No order,dish pair with those ids");
                    res.status(500).send({
                        success: false,
                        message: "No order,dish pair with those ids"
                    })
                }
                else {
                    client.query(pgquery1, [data.dish_id, data.rating], function (err1, res2) {
                        if (err1) {
                            res.status(500).send({
                                success: false,
                                message: err1.message
                            });
                        }
                        else {
                            if (res2.rows.length < 1) {
                                console.log("No dish with that ID");
                                res.status(500).send({
                                    success: false,
                                    message: "No dish with that ID"
                                });
                            }
                            else {
                                res.status(200).send({
                                    success: true
                                });
                            }

                        }
                    });
                }

            }
        });
    }
}