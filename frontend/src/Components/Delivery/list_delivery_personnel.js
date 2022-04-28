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
						<th>{deliveryPerson.id}</th>
						<th>{deliveryPerson.name}</th>
						<th>{deliveryPerson.primary_area}</th>
						<th>{deliveryPerson.secondary_area}</th>
						<th><button class='btn btn-warning'>Edit</button></th>
						<th><button class='btn btn-danger'>Edit</button></th>

					</tr>
				</table>
			</div>
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

			<h2>Delivery Persons List Page</h2>

			{deliveryPersonsList.map(deliveryPerson => (
				createDeliveryPersonElem(deliveryPerson)
			))}

		</div>
	);
};



export default DeliveryPersons;
