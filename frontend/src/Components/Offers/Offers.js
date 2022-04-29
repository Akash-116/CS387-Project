import React, { Fragment as tr, useState, useEffect } from 'react';
import AddOffer from './add_offer';

// import offersList from "./offersListTest";


const createOfferElem = (offer) => {
    const onDelete = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/delete/" + offer.offer_id, {
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
        <tr className='table-row'>
            {/* <div className='d-flex justify-content-between border  m-0  p-1  rounded'> */}
            <td>
                <h5>{offer.name} </h5>

            </td>
            <td>

                <p>Discount : {offer.discount}%</p>
            </td>
            <td>
                <button className='btn btn-danger' onClick={onDelete}>Delete</button>

            </td>
            {/* <p>{offer.description} </p> */}
            {/* </div> */}
            {/* <p>{offer.name}</p> */}

        </tr>
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

            <div className='border rounded-15 shadow pt-5 mb-5' >

                <AddOffer offersList={offersList} setOffersList={setOffersList} > </AddOffer>
            </div>
            <h2 className='mb-5'>Offers List</h2>

            <div className='p-3 border rounded-7 shadow' >

                <table className='table table-hover ' >

                    <tbody>

                        {offersList.map(offer => (
                            createOfferElem(offer)
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};



export default Offers;
