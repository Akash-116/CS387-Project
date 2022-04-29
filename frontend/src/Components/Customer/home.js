import React from 'react';
import ListDishes from '../Dishes/list_dish';

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
const CustomerHome = ({ cart, setCart }) => {

    // const [cart, setCart] = useState({})



    return (
        <div>
            <h1>
                Order up!
            </h1>
            <div className='row'>
                <div className='col-4'>
                    <div className=' border shadow rounded-10 p-2 m-4'>
                        <h1><i className='fa fa-shopping-cart'></i></h1>
                        <hr></hr>
                        <b>DISHES</b>
                        {/* <h1>{cart[2]["count"]}</h1>
                        <h1>{cart[1]["count"]}</h1> */}
                        {(json2array(cart)).map(dish => (
                            buildDishInCart(dish)
                        ))}
                        <hr></hr>
                        <div className='d-flex justify-content-between m-2'>
                            <b>Total cost</b>
                            <p>{computeTotalCost(json2array(cart))}</p>
                        </div>

                    </div>
                </div>
                <div className='col-8'>
                    <ListDishes enableOrdering={true} cart={cart} setCart={setCart} ></ListDishes>
                </div>
            </div>

        </div>
    );
};



export default CustomerHome;