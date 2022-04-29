const client = require("../../connectDB").client;


exports.get_all = function (req, res) {
    var pgquery = 'select * from offer order by offer_id';

    client.query(pgquery, function (err, res1) {
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

exports.get_offer = function (req, res) {
    var id = req.params.id;

    pgquery = 'select * from offer where offer_id=$1::int';
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
                    message: 'No offer with that ID'
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    data: res1.rows[0]
                });
            }
        }
    });
}

exports.add_offer = function (req, res) {
    var offer = req.body;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'insert into offer(name, discount) values($1,$2::int) returning offer_id';
        client.query(pgquery, [offer.name, offer.discount], function (err, res1) {
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
                    data: res1.rows[0].offer_id
                });
            }
        });
    }
}

exports.add_dishes_offer = function (req, res) {
    var offer = req.body;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'insert into offer_valid(offer_id, dat, dish_id) values($1::int,$2,$3::int)';
        client.query(pgquery, [offer.offer_id, offer.dat, offer.dish_id], function (err, res1) {
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

exports.delete_offer = function (req, res) {
    var id = req.params.id;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        pgquery = 'delete from offer where offer_id=$1::int returning offer_id';

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
                    console.log('No offer with that id');
                    res.status(500).send({
                        success: false,
                        message: 'No offer with that id'
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