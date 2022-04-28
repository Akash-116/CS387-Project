import React, { Fragment } from 'react';
// import PropTypes from "prop-types";



const AddOffer = ({ tablesList, setTablesList }) => {

	let newTable = { name: null, percent: null, description: null };


	// const onSubmitForm = async (e) => {
	const onSubmitForm = (e) => {
		e.preventDefault();
		try {
			// console.log("need to add :", newTable);
			// console.log("type of offerList :", typeof (offersList));
			// console.log("offersList : ", offersList);
			// console.log("type of setOffersList :", typeof (setOffersList));
			setTablesList(prevState => [...prevState, newTable])
			// offersList.push(newTable);
			console.log("tablesList : ", tablesList);

		} catch (error) {
			console.error(error.message);
		}

		// window.location = "/"; // This is to reload website?

	};


	return (
		<Fragment>
			<div>
				<h2>Add a new Table here</h2>
			</div>

			<form className="d-flex m-5" onSubmit={onSubmitForm}>

				<label>
					<p>Location</p>
					<input type="text"
						className="form-control"
						value={newTable.name}
						onChange={e => newTable.name = e.target.value}
					/>
				</label>
				
				<button className="btn btn-success">Add</button>
			</form>


		</Fragment>
	);
};



export default AddTable;
