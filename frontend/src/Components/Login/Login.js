import React, { useState } from 'react';
import PropTypes from "prop-types";
import './Login.css';


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
      // console.log("data is : ", data);
      return data.json();
    })
}


export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userRole, setUserRole] = useState("none");
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    let ermg = setToken(token);
    setErrorMsg(ermg);
    // console.log("token is : ", token)
  }


  return (
    <div className="login-wrapper mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className='form-control' type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          <p>Password</p>
          <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          <p>Role</p>
          <select className='form-select' onChange={e => setUserRole(e.target.value)}>
            <option hidden disabled selected value="none"> -- select an option -- </option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="delivery">Delivery</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <br />
        <label>
          <p className='text-danger' >{errorMsg}</p>
        </label>
        <br />
        <div>
          <button className='btn btn-primary' type="submit" disabled={username === "" || password === "" || userRole === "none"} >Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}