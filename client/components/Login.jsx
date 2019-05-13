import React, { Component } from 'react';
import Signup from './Signup.jsx';

const Login = (props) => {
  return (
    <div>
      <br></br>
      <h2>Login</h2>
      <form className='login' onSubmit={props.handleLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" onChange={props.handleLoginUsername}></input>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={props.handleLoginPassword}></input>
        <input type="submit" value="Submit"></input>
      </form>
      {/* <Signup handleSignup={props.handleSignup} handleSignupUsername={props.handleSignupUsername} handleSignupPassword={props.handleSignupPassword}/> */}
    </div>
  )
}

export default Login;