import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

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



const createOfferElem = (offer) => {
    return (
        <Fragment>
            <h5>{offer.name} : {offer.discount}% Off!</h5>
            {/* <p>{offer.name}</p> */}

        </Fragment>
    );
};



const OffersModal = ({ offer, setOffer }) => {

    const [offersList, setOffersList] = useState([]);

    const getOffersList = async () => {

        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/all")
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOffersList(jsonData.data);
            }
            else {
                alert("Something Went Wrong");

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
                                    <div className='m-2 border rounded p-2'>

                                        <Form.Check
                                            type={"radio"}
                                            label={createOfferElem({ odder_id: -1, name: "None", discount: 0 })}
                                            id={-1}
                                            value={JSON.stringify({ odder_id: -1, name: "None", discount: 0 })}
                                            name="chooseOffer"
                                            onChange={e => setOffer(JSON.parse(e.target.value))}
                                        />
                                    </div>
                                    {offersList.map(offer => (
                                        <div className='m-2 border rounded p-2'>

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



const CustomerCart = ({ cart, setCart, offer, setOffer }) => {

    // const [offer, setOffer] = useState(cartOffer)

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
                    <p>Total cost</p>
                    <b className='text-success'>{computeTotalCost(json2array(cart))}</b>
                </div>
                <div className='d-flex justify-content-between m-2'>
                    <p>Offer Selected :</p>
                    {(Object.keys(offer).length === 0) && <p>None</p>} {!(Object.keys(offer).length === 0) && <p>{offer.name} - {offer.discount} % off </p>}
                    <p><OffersModal offer={offer} setOffer={setOffer} ></OffersModal> </p>
                </div>
                {!(Object.keys(offer).length === 0) &&

                    <div>


                        <div className='d-flex justify-content-between m-2'>
                            <p>Net Discount : </p>
                            <b className='text-danger'>{(offer.discount / 100) * computeTotalCost(json2array(cart))}</b>
                        </div>
                        <hr></hr>
                        <div className='d-flex justify-content-between m-2'>
                            <p>Final Amount : </p>
                            <b className='text-success'>{((100 - offer.discount) / 100) * computeTotalCost(json2array(cart))}</b>
                        </div>
                    </div>
                }



            </div>
        </div>
    );
};



export default CustomerCart;