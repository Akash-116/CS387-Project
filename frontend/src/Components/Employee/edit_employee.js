import React, { Fragment, useState, useEffect } from 'react';



// const select_area = (area) => {
// 	return (
// 		<option value={area.area_id}>{area.loc}, {area.city}</option>
// 	)
// }


const EditEmployee = ({token,setToken}) => {

	// const [selectedImage, setSelectedImage] = useState(null);
	console.log("sup?");
	console.log(token);

	const user = token.data;

	const [username, setusername] = useState(user.username);
	const [name, setname] = useState(user.name);
	// const [role, setrole] = useState(user.role);
	const [phno, setphno] = useState(user.ph_no);
	// const [pswd, setpswd] = useState(user.pswd);
	// const [primareaid, setprimareaid] = useState(user.prim_area_id);
	// const [secareaid, setsecareaid] = useState(user.sec_area_id);
	const [addr, setaddr] = useState(user.addr);
	const [editDetails, setEditDetails] = useState(false);


	const [newid, setnewid] = useState(null);
	// const [areas, setareas] = useState([]);

	// let newDish = {
	//     dish_name: null,
	//     recipe: null,
	//     time_taken: null,
	//     dish_type: null,
	//     cost: null,
	//     rating: null,
	//     photo: null,
	// };

	// const FetchAreas = async () => {
	// 	try {
	// 		// console.log(process.env.REACT_APP_BACKEND_SERVER)
	// 		const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/areas/all", { credentials: 'include' });
	// 		// Here, fetch defualt is GET. So, no further input
	// 		const jsonData = await response.json();
	// 		if (jsonData.success) {
	// 			setareas(jsonData.data);
	// 		}
	// 		else {
	// 			alert(jsonData.message + "");
	// 			console.log(jsonData.message);
	// 			// window.location.reload();
	// 		}

	// 	} catch (error) {
	// 		console.error(error.message);
	// 	}
	// }

	const SaveEditDetails = async (e) => {
		// const onSubmitForm = (e) => {
		var new_employee = {
			username: username,
			name: name,
			ph_no: phno,
			addr: addr,
			e_id:user.e_id
		}
		try {
			// console.log("need to add :", newDish);
			// console.log("type of offerList :", typeof (offersList));
			// console.log("offersList : ", offersList);
			// console.log("type of setOffersList :", typeof (setOffersList));
			// setDishesList(prevState => [...prevState, newDish])
			// offersList.push(newDish);
			// console.log("offersList : ", offersList);
			

			const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/edit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(new_employee),
				credentials: 'include'
			});

			const jsonData = await response.json();
			if (jsonData.success) {
				setnewid(jsonData.data);
				alert("Success");
				setEditDetails(false);
				var new_token = {
					success: token.success,
					token: token.token,
					data: new_employee,
					userrole: token.userrole
				}
				setToken(new_token);
			}
			else {
				alert(jsonData.message + "");
				console.log(jsonData.message);
			}
			window.location.reload();

		} catch (error) {
			console.error(error.message);
		}

		// window.location = "/"; // This is to reload website?

	};

	





	return (
		<Fragment>
			<div>
				<h2>Your Details</h2>
			</div>

			<div className='container border pt-5 pb-5'>
				<form onSubmit={SaveEditDetails}>

					<div class="row mb-3">
						<label for="username" class="col-sm-3 col-form-label">Username : </label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id="username"
								value={username}
								onChange={e => setusername(e.target.value)} disabled={!editDetails} >
							</input>
						</div>
					</div>
					<div class="row mb-3">
						<label for="name" class="col-sm-3 col-form-label">Name : </label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id="name"
								value={name}
								onChange={e => { setname(e.target.value) }} disabled={!editDetails}>
							</input>
						</div>
					</div>
					<div class="row mb-3">
						<label for="phno" class="col-sm-3 col-form-label">Ph. No : </label>
						<div class="col-sm-7">
							<input type="tel" class="form-control" id="phno"
								value={phno}
								onChange={e => setphno(e.target.value)} disabled={!editDetails}>
							</input>
						</div>
					</div>


					
					{/* {(role === "Delivery") &&
						<div>
							<div class="row mb-3">
								<label for="primdelarea" class="col-sm-3 col-form-label">Primary Delivery Area : </label>
								<div class="col-sm-7">
									<select className='form-select' onChange={e => setprimareaid(e.target.value)} disabled={!editDetails}>
										<option hidden disabled selected value={primareaid}> {primareaid}</option>
										{areas.map(area => (
											select_area(area)
										))}
									</select>
								</div>
							</div>
							<div class="row mb-3">
								<label for="secdelarea" class="col-sm-3 col-form-label">Secondary Delivery Area : </label>
								<div class="col-sm-7">
									<select className='form-select' onChange={e => setsecareaid(e.target.value)} disabled={!editDetails}>
										<option hidden disabled selected value={secareaid}> {secareaid}</option>
										{areas.map(area => (
											select_area(area)
										))}
									</select>
								</div>
							</div>
						</div>
					} */}

					<div class="row mb-3">
						<label for="address" class="col-sm-3 col-form-label">Address : </label>
						<div class="col-sm-7">
							<textarea class="form-control" id="address"
								value={addr}
								onChange={e => { setaddr(e.target.value) }} disabled={!editDetails}>
							</textarea>
						</div>
					</div>



					<button disabled={editDetails} class="btn btn-primary m-3" onClick={e => { e.preventDefault(); setEditDetails(true) }} >Edit</button>
					<button disabled={!editDetails} class="btn btn-primary m-3" onClick={e => { e.preventDefault(); SaveEditDetails() }} >Save</button>
				</form>
			</div>


		</Fragment>
	);
};



export default EditEmployee;
