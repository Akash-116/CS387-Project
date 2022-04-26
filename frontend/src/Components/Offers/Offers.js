import React, { Fragment, useState, useEffect } from 'react';
import AddOffer from './add_offer';

import offersListTest from "./offersListTest";
// import offersList from "./offersListTest";


const createOfferElem = (offer) => {
    return (
        <Fragment>
            <div className=' border  m-3 shadow rounded'>
                <h3><u>{offer.name}</u> </h3>
                <p>{offer.description} </p>
                <h4>Discount : {offer.percent}%</h4>
            </div>
            {/* <p>{offer.name}</p> */}

        </Fragment>
    );
};


const Offers = () => {




    const [offersList, setOffersList] = useState(offersListTest);
    // var offersList = tempOffersList;

    const updateOffersList = (t) => {
        setOffersList(t);
    }
    console.log("type of offerList :", typeof (offersList));
    console.log("offersList : ", offersList);
    // offersList.push("Asaks");

    useEffect(() => {
        console.log("OffersList changed")
    }, [offersList])


    return (
        <div className=' container'>
            <h2>Offers Page</h2>
            <AddOffer offersList={offersList} setOffersList={setOffersList} > </AddOffer>
            <button onClick={e => { setOffersList([]) }}>asda</button>
            {offersList.map(offer => (
                createOfferElem(offer)
            ))}
        </div>
    );
};



export default Offers;
