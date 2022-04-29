import React, { Fragment, useState, useEffect } from 'react';
import AddOffer from './add_offer';
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";

import offersListTest from "./offersListTest";
// import offersList from "./offersListTest";


const createOfferElem = (offer) => {
    const onDelete = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/delete/"+offer.offer_id, {
                method: "DELETE",
                credentials: 'include'
            });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (!jsonData.success) {
                alert(jsonData.message + "");
            }
            window.location.reload();

        } catch (error) {
            console.error(error.message);

        }

    }
    return (
        <Fragment>
            <div className=' border  m-3 shadow rounded'>
                <h3><u>{offer.name}</u> </h3>
                {/* <p>{offer.description} </p> */}
                <table className='table'>
                    <th className='fs-5 ps-5 text-start'>Discount : {offer.discount}%</th>
                    <th className='text-end pe-5'><button className='btn btn-danger'onClick={onDelete}>Delete</button></th>

                </table>
            </div>
            {/* <p>{offer.name}</p> */}

        </Fragment>
    );
};


const Offers = () => {




    // const [offersList, setOffersList] = useState(offersListTest);
    // // var offersList = tempOffersList;

    // const updateOffersList = (t) => {
    //     setOffersList(t);
    // }
    const [offersList, setOffersList] = useState([]);

    const getOffersList = async () => {

        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/all", {credentials: 'include'})
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOffersList(jsonData.data);
            }
            else{
                alert(jsonData.message+"");

            }

        } catch (error) {
            console.error(error.message);

        }

    }

    // console.log("type of offerList :", typeof (offersList));
    // console.log("offersList : ", offersList);
    // offersList.push("Asaks");

    useEffect(() => {
        console.log("OffersList changed");
        getOffersList();
    }, [])


    return (
        <div className=' container'>

            <h2>Offers Page</h2>

            <AddOffer offersList={offersList} setOffersList={setOffersList} > </AddOffer>
            <h2>Offers List</h2>

            {offersList.map(offer => (
                createOfferElem(offer)
            ))}

        </div>
    );
};



export default Offers;
