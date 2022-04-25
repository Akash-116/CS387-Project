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
    .then(data => data.json())
  // .then(data => console.log("data is : ", data))
}


export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
      <h1>Log In</h1>
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
        <br />
        <label>
          <p className='text-danger' >{errorMsg}</p>
        </label>
        <br />
        <div>
          <button className=' btn btn-primary' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}