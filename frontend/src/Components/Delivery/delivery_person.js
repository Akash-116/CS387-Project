import React, { Fragment, useState, useEffect } from 'react';
import AddDeliveryPerson from './add_deliveryPerson';

import deliveryPersonsListTest from "./deliveryPersonsListTest";
// import deliveryPersonsList from "./deliveryPersonsListTest";


const createDeliveryPersonElem = (deliveryPerson) => {
	return (
		<Fragment>
			<div className=' border  m-3 shadow rounded'>
				<table>
					<tr>
						<th>Date</th>
						<th>Customer</th>
						<th>Order ID</th>
						<th>Bill</th>
						<th>Address</th>
					</tr>
					<tr>
						<th>{deliveryPerson.date}</th>
						<th>deliveryPerson.customer</th>
						<th>deliveryPerson.order_id</th>
						<th>deliveryPerson.bill</th>
						<th>deliveryPerson.address</th>
					</tr>
				</table>
			</div>
			<button class='btn btn-Primary'>Out for delivery</button>
			<button class='btn btn-Success'>Delivered</button>
			{/* <p>{deliveryPerson.name}</p> */}

		</Fragment>
	);
};


const DeliveryPersons = () => {




	const [deliveryPersonsList, setDeliveryPersonsList] = useState(deliveryPersonsListTest);
	// var deliveryPersonsList = tempDeliveryPersonsList;

	const updateDeliveryPersonsList = (t) => {
		setDeliveryPersonsList(t);
	}
	console.log("type of deliveryPersonList :", typeof (deliveryPersonsList));
	console.log("deliveryPersonsList : ", deliveryPersonsList);
	// deliveryPersonsList.push("Asaks");

	useEffect(() => {
		console.log("DeliveryPersonsList changed")
	}, [deliveryPersonsList])


	return (
		<div className=' container'>

			<h2>DeliveryPersons Page</h2>


			{deliveryPersonsList.map(deliveryPerson => (
				createDeliveryPersonElem(deliveryPerson)
			))}

		</div>
	);
};



export default DeliveryPersons;
