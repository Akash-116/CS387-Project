const client=require("../../connectDB").client;

exports.get_cart=function(req,res){
    var id=req.params.id;

    pgquery='select * from cart where c_id=$1';
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
                    message : 'Nothing in the cart'
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    data : res1.rows
                });
            }
        }
    })
}

exports.delete_cart=function(req,res){
    var id=req.params.id;
    
    pgquery='delete from cart where c_id=$1 returning c_id';

    client.query(pgquery, [id], function(err, res1) {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: err.message
            });
        } else {
            var rows=res1.rows;
            if(rows.length==0){
                console.log('Nothing in cart');
                res.status(500).send({
                    success: false,
                    message: 'Nothing in cart'
                });
            }
            else{
                res.status(200).send({
                    message : true
                });
            }
        }
    });
}

exports.add_dish_cart=function(req,res){
    var cart = req.body;

    pgquery='insert into cart(c_id, dish_id,quantity) values($1::int,$2::int,1)';
    client.query(pgquery,[cart.c_id, cart.dish_id],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            res.status(200).send({
                success: true
            });
        }
    })
}

exports.edit_dish_cart=function(req,res){
    var cart = req.body;
    
    pgquery='update cart set quantity = $3 where c_id = $1 and dish_id = $2';
    client.query(pgquery,[cart.c_id, cart.dish_id, cart.quantity],function(err,res1){
        if(err){
            res.status(500).send({
                success : false,
                message : err.message
            });
        }
        else{
            res.status(200).send({
                success: true
            });
        }
    })
}