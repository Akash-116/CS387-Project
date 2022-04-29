import React, { Fragment } from 'react';
// import PropTypes from "prop-types";



const AddOffer = ({ offersList, setOffersList }) => {

    let newOffer = { name: null, discount: null, description: null };


    // const onSubmitForm = async (e) => {
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("need to add :", newOffer);
            // console.log("type of offerList :", typeof (offersList));
            // console.log("offersList : ", offersList);
            // console.log("type of setOffersList :", typeof (setOffersList));

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/add",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(newOffer),
                credentials: 'include'
            });
            
            const jsonData = await response.json();
            if(jsonData.success){
                setOffersList(prevState => [...prevState, newOffer]);
                
            }
            else{
                alert(jsonData.message+"");
                console.log(jsonData.message);
            }
            
            // offersList.push(newOffer);
            console.log("offersList : ", offersList);

            window.location.reload();

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
                <table className='table table-borderless'>
                    <tbody>

                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Percentage Discount</th>
                        <th></th>
                        
                    </tr>
                    <tr>
                        <th><input type="text"
                            className="form-control"
                            value={newOffer.name}
                            onChange={e => newOffer.name = e.target.value}
                        /></th>
                        <th><input type="text"
                            className="form-control"
                            value={newOffer.description}
                            onChange={e => newOffer.description = e.target.value}
                        /></th>
                        <th>
                            <input type="number"
                                className="form-control"
                                value={newOffer.discount}
                                onChange={e => newOffer.discount = e.target.value}
                            />
                        </th>
                        <th>
                            <button className="btn btn-success">Add</button>
                        </th>
                        </tr>
                    </tbody>

                </table>
                
            </form>


        </Fragment>
    );
};



export default AddOffer;
