const client = require("../../connectDB").client;


exports.get_all_areas = function (req, res) {
    if ((req.session.role != 'Manager') && (req.session.role != 'Billing Manager') && (req.session.role != "customer")) {
        res.status(500).send({
            success: false,
            message: 'no access'
        });
    }
    else {
        var pgquery = "select * from area order by area_id";
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