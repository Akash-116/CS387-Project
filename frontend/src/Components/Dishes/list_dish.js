import React, { Fragment, useEffect, useState } from 'react';

import testDishes from '../TestData/testDishes';


const name2acronym = (str) => {
    const strArr = str.split(' ');
    let res = '';
    strArr.forEach(el => {
        const [char] = el;
        res += char;
    });
    return res;
}

const countFromCart = (dish, cart, enableOrdering) => {
    if (!enableOrdering) { return 0 }
    if (!cart[dish.dish_id]) { return 0 }
    else {
        return cart[dish.dish_id]["count"];
    }
}

const EachDish = ({ dish, enableOrdering = false, cart = null, setCart = null }) => {

    const [counter, setCounter] = useState(countFromCart(dish, cart, enableOrdering))


    const decrementCount = (dish) => {
        var tcounter = counter;
        if (counter > 0) {
            setCounter(counter => (counter - 1))
            tcounter--;
        }
        var tcart = { ...cart };

        if (!(tcart[dish.dish_id])) { tcart[dish.dish_id] = {} }
        tcart[dish.dish_id]["dish"] = dish;
        tcart[dish.dish_id]["count"] = tcounter;

        if (tcounter === 0) { delete tcart[dish.dish_id] }

        setCart(tcart);
    }

    const incrementCount = (dish) => {
        var tcounter = counter;
        setCounter(counter => (counter + 1))
        tcounter++;
        var tcart = { ...cart };
        if (!(tcart[dish.dish_id])) { tcart[dish.dish_id] = {} }
        tcart[dish.dish_id]["dish"] = dish;
        tcart[dish.dish_id]["count"] = tcounter;
        setCart(tcart);
    }

    return (
        <Fragment>
            <div className='row border  m-3 shadow rounded'>
                {/* Acronym */}
                <div className='col-sm-3 border bg-info fs-1 text-uppercase d-flex justify-content-center
                 align-items-center'>{name2acronym(dish.dish_name)}</div>
                {/* Remaining body */}
                <div className='col-sm-9 '>
                    <div className='d-flex justify-content-between'>
                        <h5 className='text-capitalize '>{dish.dish_id} - {dish.dish_name}</h5>
                        <h4>₹{dish.cost}</h4>
                    </div>
                    <div className='d-flex'>
                        <p>Time Taken : {dish.time_taken} | Dish Type : {dish.dish_type} </p>
                    </div>
                    {/* Ratings */}
                    <div className='d-flex'>
                        <p> {[...Array(dish.rating)].map(e => <i className='text-warning fa fa-star'></i>)}   </p>
                    </div>

                    {(enableOrdering) &&
                        <div>
                            <button className='m-2 btn btn-primary' onClick={e => { decrementCount(dish); }}><i className='fa fa-minus'></i> </button>
                            <span>
                                {counter}
                            </span>
                            <button className='m-2 btn btn-primary' onClick={e => { incrementCount(dish); }}><i className='fa fa-plus'></i> </button>
                        </div>
                    }

                </div>
            </div>


        </Fragment>
    );
}


const ListDishes = ({ enableOrdering = false, cart = null, setCart = null }) => {

    const [allDishes, setAllDishes] = useState(testDishes)
    const [cart2, setCart2] = useState({ 1: "initial" })

    const getDishesList = async () => {
        try {

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/dishes/all")
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json()

            setAllDishes(jsonData.data);

        } catch (error) {

            console.error(error.message);

        }

    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        getDishesList();
    }, []);


    return (
        <div className=' container'>

            <h2>Dishes Page</h2>
            <p>{cart2[1]}</p>

            {/* <AddDish dishesList={dishesList} setDishesList={setDishesList} > </AddDish> */}

            {allDishes.map(dish => (
                <EachDish dish={dish} enableOrdering={enableOrdering} cart={cart} setCart={setCart} ></EachDish>
            ))}
            {/* <EachDish dish={allDishes[0]} enableOrdering={enableOrdering} cart={cart} setCart={setCart} ></EachDish> */}

        </div>
    );
};



export default ListDishes;
