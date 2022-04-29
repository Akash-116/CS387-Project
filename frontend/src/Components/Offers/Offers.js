import React, { Fragment, useState, useEffect } from 'react';
import AddOffer from './add_offer';

import offersListTest from "./offersListTest";
// import offersList from "./offersListTest";


const createOfferElem = (offer) => {
    return (
        <Fragment>
            <div className=' border  m-3 shadow rounded'>
                <h3><u>{offer.name}</u> </h3>
                {/* <p>{offer.description} </p> */}
                <h4>Discount : {offer.discount}%</h4>
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

            {offersList.map(offer => (
                createOfferElem(offer)
            ))}

        </div>
    );
};



export default Offers;
