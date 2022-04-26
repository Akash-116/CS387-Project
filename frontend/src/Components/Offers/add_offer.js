import React, { Fragment } from 'react';
// import PropTypes from "prop-types";



const AddOffer = ({ offersList, setOffersList }) => {

    let newOffer = { name: null, percent: null, description: null };


    // const onSubmitForm = async (e) => {
    const onSubmitForm = (e) => {
        e.preventDefault();
        try {
            // console.log("need to add :", newOffer);
            // console.log("type of offerList :", typeof (offersList));
            // console.log("offersList : ", offersList);
            // console.log("type of setOffersList :", typeof (setOffersList));
            setOffersList(prevState => [...prevState, newOffer])
            // offersList.push(newOffer);
            console.log("offersList : ", offersList);

        } catch (error) {
            console.error(error.message);
        }

        // window.location = "/"; // This is to reload website?

    };


    return (
        <Fragment>
            <div>
                <h2>Add an offer here</h2>
            </div>

            <form className="d-flex m-5" onSubmit={onSubmitForm}>

                <label>
                    <p>Name</p>
                    <input type="text"
                        className="form-control"
                        value={newOffer.name}
                        onChange={e => newOffer.name = e.target.value}
                    />
                </label>
                <label>
                    <p>Description</p>
                    <input type="text"
                        className="form-control"
                        value={newOffer.description}
                        onChange={e => newOffer.description = e.target.value}
                    />
                </label>
                <label>
                    <p>Percent</p>
                    <input type="number"
                        className="form-control"
                        value={newOffer.percent}
                        onChange={e => newOffer.percent = e.target.value}
                    />
                </label>
                <button className="btn btn-success">Add</button>
            </form>


        </Fragment>
    );
};



export default AddOffer;
