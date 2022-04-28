const client=require("../../connectDB").client;


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