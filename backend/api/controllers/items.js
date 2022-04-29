const client = require("../../connectDB").client;

exports.get_all_items = function (req, res) {
    pgquery = 'select * from item order by item_id';
    if ((req.session.role != 'Manager') && (req.session.role != 'Chef')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
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

exports.get_item = function (req, res) {
    var id = req.params.id;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'select * from item where item_id=$1';
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
                        message: 'No Item with that ID'
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        data: res1.rows[0]
                    });
                }
            }
        })
    }
}

exports.get_bought_items_today = function (req, res) {
    pgquery = 'select * from day_to_day_items where bought>0 and dat=CURRENT_DATE order by item_id';
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        client.query(pgquery, function (err, res1) {
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
                        message: 'No Items bought Today'
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        data: res1.rows
                    });
                }
            }
        });
    }
}

exports.update_item_bought = function (req, res) {
    var item_id = req.body.item_id;
    var quantity = req.body.quantity;
    var pgquery1 = 'insert into day_to_day_items(dat,item_id,bought) values(CURRENT_DATE,$1::int,$2::int) on conflict on constraint day_item_prim do update set bought=day_to_day_items.bought+$2::int returning item_id';
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        client.query(pgquery1, [item_id, quantity], function (err, res1) {
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
                        message: 'No Item with that id'
                    });
                }
                else {
                    var pgquery2 = 'update item set quan_inv=quan_inv+$2::int where item_id=$1::int returning item_id';
                    client.query(pgquery2, [item_id, quantity], function (err2, res2) {
                        if (err2) {
                            res.status(500).send({
                                success: false,
                                message: err2.message
                            });
                        }
                        else {
                            if (res2.rows.length < 1) {
                                res.status(500).send({
                                    success: false,
                                    message: 'No Item with that ID in items'
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

exports.add_item = function (req, res) {
    var item = req.body;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'insert into item(item_name,cost,unit) values($1,$2::int,$3) returning item_id';
        client.query(pgquery, [item.item_name, item.cost, item.unit], function (err, res1) {
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
                    data: res1.rows[0].item_id
                });
            }
        });
    }
}