const client = require("../../connectDB").client;


exports.get_all = function (req, res) {
    if ((req.session.role != 'Manager') && (req.session.role != 'Billing Manager') && (req.session.role != 'Delivery')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = "select * from employee where e_type='Delivery' and left_date is null";

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
}

exports.change_delivery_codes = function (req, res) {
    var data = req.body;
    if ((req.session.role != 'Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = "update employee set prim_area_id=$1::int, sec_area_id=$2::int where e_id=$3::int and e_type='Delivery' returning e_id";

        client.query(pgquery, [data.prim_area_id, data.sec_area_id, data.e_id], function (err, res1) {
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
                        message: 'No Delivey Person with that ID'
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

exports.free_delivery_persons_prim = function (req, res) {
    var area_id = req.params.area_id;
    if ((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = "select * from employee where prim_area_id=$1::int and e_type='Delivery' and d_status='Free'";

        client.query(pgquery, [area_id], function (err, res1) {
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

exports.free_delivery_persons_sec = function (req, res) {
    var area_id = req.params.area_id;
    if ((req.session.role != 'Manager') && (req.session.role != 'Billing Manager')) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = "select * from employee where sec_area_id=$1::int and e_type='Delivery' and d_status='Free'";

        client.query(pgquery, [area_id], function (err, res1) {
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