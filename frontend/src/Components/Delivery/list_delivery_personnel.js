import React, { Fragment, useState, useEffect } from 'react';
// import AddDeliveryPerson from './add_deliveryPerson';
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";

// import deliveryPersonsListTest from "./deliveryPersonsListTest";
// import deliveryPersonsList from "./deliveryPersonsListTest";


const createDeliveryPersonElem = (deliveryPerson) => {
	const delp = { e_id: deliveryPerson.e_id };
	const onDelete = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/single",{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(delp)
			});
			// Here, fetch defualt is GET. So, no further input
			const jsonData = await response.json();
			if (!jsonData.success) {
				alert("Something Went Wrong");
			}
			window.location.reload();

		} catch (error) {
			console.error(error.message);

		}
		
	}
	return (
		<Fragment>
			
			<tr>
				<th>{deliveryPerson.e_id}</th>
				<th>{deliveryPerson.name}</th>
				<th>{deliveryPerson.prim_area_id}</th>
				<th>{deliveryPerson.sec_area_id}</th>
				<th>
					
					<Link to="/edit/employee" className="nav-link"><button class='btn btn-warning'>Edit</button></Link>
					
				</th>
				<th>
					
						<button class='btn btn-danger' onClick={ onDelete}>Remove</button>
					
				</th>

			</tr>
			{/* <p>{deliveryPerson.name}</p> */}

		</Fragment>
	);
};


const DeliveryPersons = () => {




	const [deliveryPersonsList, setDeliveryPersonsList] = useState([]);
	// var deliveryPersonsList = tempDeliveryPersonsList;
	const getDeliveryPersonsList = async () => {

		try {
			// console.log(process.env.REACT_APP_BACKEND_SERVER)
			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/delivery/all")
			// Here, fetch defualt is GET. So, no further input
			const jsonData = await response.json();
			if (jsonData.success) {
				console.log(jsonData.data);

				setDeliveryPersonsList(jsonData.data);
			}
			else {
				// console.log(jsonData.message);
				alert("Something Went Wrong");

			}

		} catch (error) {
			console.error(error.message);

		}
	}

	useEffect(() => {
		console.log("DeliveryPersonsList changed");
		getDeliveryPersonsList();
	}, [])


	return (
		<div className=' container'>

			<h2>Delivery Persons List Page</h2>
			<div className=' border  m-3 shadow rounded'><table className='table table-hover'>

				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Primary area ID</th>
						<th>Secondary area ID</th>
						<th></th>
						<th></th>
					</tr>

				</thead>

				<tbody>
					{deliveryPersonsList.map(deliveryPerson => (
						createDeliveryPersonElem(deliveryPerson)
					))}
				</tbody>

			</table></div>

		</div>
	);
};



export default DeliveryPersons;
