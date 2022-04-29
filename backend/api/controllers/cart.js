const client = require("../../connectDB").client;

exports.get_cart = function (req, res) {
    var id = req.params.id;
    if ((req.session.role != 'customer') || (req.session.pid != id)) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'select cart.quantity,dish.* from cart,dish where c_id=$1::int and cart.dish_id=dish.dish_id';
        client.query(pgquery, [id], function (err, res1) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                if (res1.rows.length < 1) {
                    res.status(500).send({
                        success: false,
                        message: 'Nothing in the cart'
                    });
                }
                else {
                    console.log(res1.rows);
                    res.status(200).send({
                        success: true,
                        data: res1.rows
                    });
                }
            }
        })
    }
}

exports.delete_cart = function (req, res) {
    var id = req.params.id;
    if ((req.session.role != 'customer') || (req.session.pid != id)) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'delete from cart where c_id=$1 returning c_id';

        client.query(pgquery, [id], function (err, res1) {
            if (err) {
                console.log(err.message)
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            } else {
                var rows = res1.rows;
                if (rows.length == 0) {
                    console.log('Nothing in cart');
                    res.status(500).send({
                        success: false,
                        message: 'Nothing in cart'
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

exports.add_dish_cart = function (req, res) {
    var cart = req.body;
    if ((req.session.role != 'customer') || (req.session.pid != cart.c_id)) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else if (cart.quantity == 0) {
        pgquery = 'delete from cart where c_id=$1::int and dish_id=$2::int';
        client.query(pgquery, [cart.c_id, cart.dish_id], function (err, res1) {
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
    else {
        pgquery = 'update cart set quantity=$3::int where c_id=$1::int and dish_id=$2::int returning c_id,dish_id';
        client.query(pgquery, [cart.c_id, cart.dish_id, cart.quantity], function (err, res1) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            }
            else {
                if (res1.rows.length < 1) {
                    var pgquery1 = 'insert into cart(c_id,dish_id,quantity) values($1::int,$2::int,$3::int) returning c_id,dish_id';
                    client.query(pgquery1, [cart.c_id, cart.dish_id, cart.quantity], function (err2, res2) {
                        if (err2) {
                            console.log(err2.message);
                            res.status(500).send({
                                success: true,
                                message: err2.message
                            });
                        }
                        else {
                            if (res2.rows.length < 1) {
                                console.log("Not Inserted in Cart");
                                res.status(500).send({
                                    success: false,
                                    message: "Not Inserted in Cart"
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
                else {
                    res.status(200).send({
                        success: true
                    });
                }
            }
        });
    }
}

exports.edit_dish_cart = function (req, res) {
    var cart = req.body;
    if ((req.session.role != 'customer') || (req.session.pid != cart.c_id)) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'update cart set quantity = $3 where c_id = $1 and dish_id = $2';
        client.query(pgquery, [cart.c_id, cart.dish_id, cart.quantity], function (err, res1) {
            if (err) {
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
        })
    }
}