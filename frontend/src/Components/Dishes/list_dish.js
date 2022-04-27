import React, { Fragment, useState } from 'react';

import testDishes from '../TestData/testDishes';
import AddDish from './add_dish';


const name2acronym = (str) => {
    const strArr = str.split(' ');
    let res = '';
    strArr.forEach(el => {
        const [char] = el;
        res += char;
    });
    return res;
}

const createDishElem = (dish) => {
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

                </div>
            </div>


        </Fragment>
    );
};


const ListDishes = () => {

    const [dishesList, setDishesList] = useState([])
    const [allDishes, setAllDishes] = useState(testDishes)



    return (
        <div className=' container'>

            <h2>Dishes Page</h2>

            <AddDish dishesList={dishesList} setDishesList={setDishesList} > </AddDish>

            {allDishes.map(dish => (
                createDishElem(dish)
            ))}

        </div>
    );
};



export default ListDishes;
