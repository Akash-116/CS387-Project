import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';


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
/* Build elements */
const buildDishInCart = (dish) => {

    if (dish.count === 0) { return }

    return (

        <div className='d-flex justify-content-between m-2'>
            <p>{dish.dish.dish_name} x{dish.count}</p>
            <p>{(dish.count) * (dish.dish.cost)}</p>
        </div>
    )
}
const createOfferElem = (offer) => {
    return (
        <Fragment>
            <h5>{offer.name} : {offer.discount}% Off!</h5>
            {/* <p>{offer.name}</p> */}

        </Fragment>
    );
};


/* Offers Modal */
const OffersModal = ({ offer, setOffer }) => {

    const [offersList, setOffersList] = useState([]);

    const getOffersList = async () => {

        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/all", { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOffersList(jsonData.data);
            }
            else {
                alert(jsonData.message + "");

            }

        } catch (error) {
            console.error(error.message);

        }

    }

    useEffect(() => {
        console.log("OffersList changed");
        getOffersList();
    }, [])

    return (
        <Fragment>

            {/* <!-- Button to Open the Modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModalOffersModalCart">
                Select Offer
            </button>

            {/* <!-- The Modal --> */}
            <div class="modal" id="myModalOffersModalCart">
                <div class="modal-dialog">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title">Offers : </h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <div>
                                <h4>offer value : {offer.name}</h4>
                                <div>
                                    <div className='m-2 border rounded-15 shadow p-2'>

                                        <Form.Check
                                            type={"radio"}
                                            label={createOfferElem({ offer_id: null, name: "None", discount: 0 })}
                                            id={-1}
                                            value={JSON.stringify({ offer_id: null, name: "None", discount: 0 })}
                                            name="chooseOffer"
                                            onChange={e => setOffer(JSON.parse(e.target.value))}
                                        />
                                    </div>
                                    {offersList.map(offer => (
                                        <div className='m-2 border mt-3 rounded-15 shadow p-2'>

                                            <Form.Check
                                                type={"radio"}
                                                label={createOfferElem(offer)}
                                                id={offer.offer_id}
                                                value={JSON.stringify(offer)}
                                                name="chooseOffer"
                                                onChange={e => setOffer(JSON.parse(e.target.value))}
                                            />
                                        </div>


                                    ))}

                                </div>
                            </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>


    );
}

const DeleteOrder = async (order_id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order_id }),
        credentials: 'include'
    });
    const jsonData = await response.json();
    if (!jsonData.success) {
        // alert(jsonData.message + "");
        console.log(jsonData.message);
    }
}

const Add_Order_Dish = async (order_dish) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add_order_dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order_dish),
        credentials: 'include'
    });
    const jsonData = await response.json();
    if (!jsonData.success) {
        alert(jsonData.message + "");
        console.log(jsonData.message);
        // DeleteOrder(order_dish.order_id);
        // alert('Ingrdients are not sufficient');
        // window.location.reload();
    }

}


const confirmOrder = async (cart, areaid, offer, token) => {
    console.log("Order Confirm, CART : ", cart);
    if (areaid == null) {
        alert("Area is Required");
    }
    else {
        try {
            var order = {
                c_id: token.data.c_id,
                area_id: areaid,
                order_type: "Online",
                offer_id: offer.offer_id
            }
            console.log(cart);
            // throw 500;


            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (jsonData.success) {
                var order_id = jsonData.data;
                // setNewid(order_id);
                // console.log(order_id);
                // console.log(orderDishes);
                console.log(cart)
                Object.values(cart).forEach(dishAndCount => {
                    // console.log(dish.dish_id, dish.dish_name);
                    var dish = dishAndCount.dish
                    var order_dish = {
                        dish_id: dish.dish_id,
                        order_id: order_id,
                        quantity: dishAndCount.count
                    }
                    Add_Order_Dish(order_dish);
                });
                try {
                    const response2 = await fetch(process.env.REACT_APP_BACKEND_SERVER + `/cart/clear/${token.data.c_id}`, {
                        method: "DELETE",
                        credentials: 'include',
                    });
                    const jsonData2 = await response2.json();
                    if (jsonData2.success) {
                        alert("Success");
                    }
                    else {
                        console.log(jsonData2.message);
                        alert(jsonData2.message);
                    }
                    window.location.reload();
                } catch (error) {
                    console.error(error.message);
                }

            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
            }

        } catch (error) {
            console.error(error.message);
            alert("Error connectin to backend");
        }
    }


}

const select_area = (area) => {
    return (
        <option value={area.area_id}>{area.loc}, {area.city}</option>
    )
}

const CustomerCart = ({ token, cart, setCart, offer, setOffer }) => {
    const [areas, setareas] = useState([]);
    const [areaid, setAreaid] = useState();

    const FetchAreas = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/areas/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setareas(jsonData.data);
                // console.log(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

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
        FetchAreas();
    }, []);

    return (
        <div className='container'>
            <div className=' border shadow rounded-15 p-5 m-4'>
                <h1>CART</h1>
                <hr></hr>
                <h6>DISHES</h6>
                {(json2array(cart)).map(dish => (
                    buildDishInCart(dish)
                ))}
                <hr></hr>
                <div className='d-flex justify-content-between m-2'>
                    <p>Area</p>
                    <div class="col-sm-6">
                        <select className='form-select' onChange={e => { e.preventDefault(); setAreaid(e.target.value) }}>
                            <option hidden disabled selected value="none"> -- select an option -- </option>
                            {areas.map(area => (
                                select_area(area)
                            ))}
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between m-2'>
                    <p>Total cost</p>
                    <b className='text-success'>{computeTotalCost(json2array(cart))}</b>
                </div>
                <div className='d-flex justify-content-between m-2'>
                    <p>Offer Selected :</p>
                    <p>{offer.name} - {offer.discount} % off </p>
                    <p><OffersModal offer={offer} setOffer={setOffer} ></OffersModal> </p>
                </div>

                <div className='d-flex justify-content-between m-2'>
                    <p>Net Discount : </p>
                    <b className='text-danger'>{(offer.discount / 100) * computeTotalCost(json2array(cart))}</b>
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between m-2'>
                    <p>Final Amount : </p>
                    <b className='text-success'>{((100 - offer.discount) / 100) * computeTotalCost(json2array(cart))}</b>
                </div>

                <button onClick={e => confirmOrder(cart, areaid, offer, token)} className='btn btn-primary'>Confirm</button>



            </div>
        </div>
    );
};



export default CustomerCart;