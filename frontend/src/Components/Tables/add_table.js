import React, { Fragment } from 'react';
// import PropTypes from "prop-types";



const AddTable = ({ tablesList, setTablesList }) => {

	let newTable = { location: null };


	// const onSubmitForm = async (e) => {
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			// console.log("need to add :", newTable);
			// console.log("type of tableList :", typeof (tablesList));
			// console.log("tablesList : ", tablesList);
			// console.log("type of setTablesList :", typeof (setTablesList));
			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/tables/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTable)
			});
			const jsonData = await response.json();

			if (jsonData.success) {
				setTablesList(prevState => [...prevState, newTable]);

			}
			else {
				alert("Something Went Wrong");
				console.log(jsonData.message);
			}
			// tablesList.push(newTable);
			console.log("tablesList : ", tablesList);
			window.location.reload();


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

				<table className="table">
					<th className='fs-5'>Location</th>
					<th><input type="text"
						className="form-control"
						value={newTable.location}
						onChange={e => newTable.location = e.target.value}
					/></th>
					<th><button className="btn btn-success">Add</button></th>
					
				</table>
				
				
			</form>


		</Fragment>
	);
};



export default AddTable;
