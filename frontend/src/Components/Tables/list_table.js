import React, { Fragment, useState, useEffect } from 'react';
import AddTable from './add_table';
//not done yet


// import tablesListTest from "./tablesListTest";
// import tablesList from "./tablesListTest";


const CreateTableElem = ({table}) => {

	const [status, setTableStatus] = useState(table.status);
	// console.log("tryna create");


	let newTableStatus = { table_id: table.table_id, status: status };
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/tables/edit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTableStatus)
			});
			const jsonData = await response.json();
			if (jsonData.success) {
				setTableStatus(prevState => [...prevState, newTableStatus]);

			}
			else {
				alert("Something Went Wrong");
				console.log(jsonData.message);
			}
			window.location.reload();


		} catch (error) {
			console.error(error.message);
		}
		// console.log("token is : ", token)
	}
	var st;
	if (table.status === "O") {
		st = "occupied";
	}
	else {
		st = "unoccupied";
	}
	// console.log("tryna return");
	return (
		<Fragment>
			<tr>
				<th>{table.table_id}</th>
				<th>{table.loc} </th>
				<th className='text-center'><form onSubmit={handleSubmit}>
					<table className='table'>
						<th>

						<select className='form-select' onChange={e => setTableStatus(e.target.value)}>
							<option hidden disabled selected value={table.status}> {st} </option>
							<option value="O">occupied</option>
							<option value="E">not occupied</option>
						</select>
						</th>
					<th>
						<button className='btn btn-warning' type="submit">Update</button>
						</th>
					</table>
						
				</form></th>
				
			</tr>
		</Fragment>
	);
};


const Tables = () => {




	const [tablesList, setTablesList] = useState([]);
	// var tablesList = tempTablesList;

	const getTablesList = async () => {

		try {
			// console.log(process.env.REACT_APP_BACKEND_SERVER)
			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/tables/all")
			// Here, fetch defualt is GET. So, no further input
			const jsonData = await response.json();
			if (jsonData.success) {
				setTablesList(jsonData.data);
			}
			else {
				// console.log(jsonData.message);
				alert("Something Went Wrong");

			}

		} catch (error) {
			console.error(error.message);

		}

	}
	console.log("type of tableList :", typeof (tablesList));
	console.log("tablesList : ", tablesList);
	// tablesList.push("Asaks");

	useEffect(() => {
		console.log("TablesList changed");
		getTablesList();
	}, [])


	return (
		<div className=' container'>

			<h2>Tables Page</h2>

			{/* <AddTable tablesList={tablesList} setTablesList={setTablesList} > </AddTable> */}
			<div className=' border  m-3 shadow rounded'><table className='table table-hover'>
				<thead>
					<tr>
					<th>ID</th>
					<th>Location</th>
					<th>Status</th>
					{/* <th></th> */}
				</tr>
				</thead>
				<tbody>{tablesList.map(table => {
					console.log(table);
					return <CreateTableElem table={table}></CreateTableElem>;
				}

				)}</tbody>
				
			</table></div>
			
			
			{/* <button className = 'btn btn-primary' type="submit" >Add new Table </button> */}

		</div>
	);
};



export default Tables;
