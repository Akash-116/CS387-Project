const client=require("../../connectDB");

exports.get_all_tables=function(req,res){
    pgquery='select * from table_status';

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

exports.get_table=function(req,res){
    var id=req.params.id;
    pgquery='select * from table_status where table_id = $1';

    client.query(pgquery,[id],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            if(res1.rows.length<1){
                res.status(500).send({
                    success : false,
                    message : 'No Table with that ID'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows[0]
                });
            }
        }
    });
}

exports.get_empty_tables=function(req,res){
    pgquery="select * from table_status where status='E'";

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

exports.edit_table_status=function(req,res){
    var id=req.body.table_id;
    var status = req.body.status;
                
    pgquery='update table_status set status = $2 where table_id = $1 returning table_id';

    client.query(pgquery, [id, status], function(err, res1) {
        if (err) {
            console.log(err.message);
            res.status(500).send({
                success: false,
                message: err.message
            });
        }
        else{
            if(res1.rows.length<1){
                res.status(500).send({
                    success : false,
                    message : 'No Table with that ID'
                });
            }
            else{
                res.status(200).send({
                    success: true
                });
            } 
        }
    });          
}

exports.add_table=function(req,res){
    var table=req.body;
    var pgquery='insert into table_status(loc,status) values($1,$2) returning table_id';

    client.query(pgquery,[table.location,table.status],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            res.status(200).send({
                success : true,
                data : res1.rows[0].table_id
            });
        }
    });
}