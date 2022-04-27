import React from 'react';


const buildDishInCart = (dish) => {

    if (dish.count === 0) { return }

    return (

        <div className='d-flex justify-content-between m-2'>
            <p>{dish.dish.dish_name} x{dish.count}</p>
            <p>{(dish.count) * (dish.dish.cost)}</p>
        </div>
    )
}

const computeTotalCost = (cart) => {
    var ans = 0;
    cart.forEach(dish => {
        ans += (dish.count) * (dish.dish.cost)
    });
    return ans;
}
function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}


const CustomerCart = ({ cart, setCart }) => {



    return (
        <div>
            <div className=' border shadow rounded-lg m-4'>
                <h1>CART</h1>
                <hr></hr>
                {/* <h1>{cart[2]["count"]}</h1>
                        <h1>{cart[1]["count"]}</h1> */}
                {(json2array(cart)).map(dish => (
                    buildDishInCart(dish)
                ))}
                <hr></hr>
                <div className='d-flex justify-content-between m-2'>
                    <p>Total cost</p>
                    <p>{computeTotalCost(json2array(cart))}</p>
                </div>

            </div>
        </div>
    );
};



export default CustomerCart;