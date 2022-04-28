import React, { Fragment, useState, useEffect } from 'react';
import AddTable from './add_table';
//not done yet


import tablesListTest from "./tablesListTest";
// import tablesList from "./tablesListTest";
async function loginUser(credentials) {
	// console.log("Credentials stringfy : ", JSON.stringify(credentials));

	return fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(data => {
			console.log("data TYPE is : ", typeof (data));
			console.log("data is : ", data);
			return data.json();
		})
}
const handleSubmit = async e => {
	e.preventDefault();
	const token = await loginUser({
		username,
		password,
		userRole
	});
	let ermg = setToken(token);
	setErrorMsg(ermg);
	// console.log("token is : ", token)
}

const createTableElem = (table) => {
	return (
		<Fragment>
			<div className=' border  m-3 shadow rounded'>
				<h3><u>{table.id}</u> </h3>
				<p>{table.location} </p>
				<form onSubmit={handleSubmit}>
					<label>
						<p>Role</p>
						<select className='form-select' onChange={e => setTableStatus(e.target.value)}>
							<option hidden disabled selected value={table.status}> {table.status} </option>
							<option value="occupied">occupied</option>
							<option value="not occupied">not occupied</option>
						</select>
					</label>
					<div>
						<button className='btn btn-warning' type="submit">Update</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};


const Tables = () => {




	const [tablesList, setTablesList] = useState(tablesListTest);
	// var tablesList = tempTablesList;

	const updateTablesList = (t) => {
		setTablesList(t);
	}
	console.log("type of tableList :", typeof (tablesList));
	console.log("tablesList : ", tablesList);
	// tablesList.push("Asaks");

	useEffect(() => {
		console.log("TablesList changed")
	}, [tablesList])


	return (
		<div className=' container'>

			<h2>Tables Page</h2>


			{tablesList.map(table => (
				createTableElem(table)
			))}
			<button className = 'btn btn-primary' type="submit" >Add new Table </button>

		</div>
	);
};



export default Tables;
