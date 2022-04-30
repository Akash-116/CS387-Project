import React from 'react';
import ListDishes from '../Dishes/list_dish';
import { useEffect } from 'react';

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
const CustomerHome = ({ token, cart, setCart }) => {

    // const [cart, setCart] = useState({})
    // console.log(token);

    const FetchCart = async () => {
        try {
            console.log("Token : ", token)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/cart/all/" + token.data.c_id, { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log(jsonData);
            if (jsonData.success) {
                var tcart = {};
                jsonData.data.forEach(dish => {
                    if (!(tcart[dish.dish_id])) { tcart[dish.dish_id] = {} }
                    // var temp_dish = dish;
                    // temp_dish.quantity = null;
                    tcart[dish.dish_id]["dish"] = { dish_id: dish.dish_id, dish_name: dish.dish_name, recipe: dish.recipe, time_taken: dish.time_taken, dish_type: dish.dish_type, cost: dish.cost, rating: dish.rating, num_ratings: dish.num_ratings, photo: dish.photo };
                    tcart[dish.dish_id]["count"] = dish.quantity;

                    if (dish.quantity === 0) { delete tcart[dish.dish_id] }
                });
                setCart(tcart);
            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        FetchCart();
    }, []);




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
                    <ListDishes token={token} enableOrdering={true} cart={cart} setCart={setCart} ></ListDishes>
                </div>
            </div>

        </div>
    );
};



export default CustomerHome;