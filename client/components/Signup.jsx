import React, { Component } from 'react';

const Signup = (props) => {
  return (
    <div>
      <br></br>
      <h2>Signup</h2>
      <form className='signup' onSubmit={props.handleSignup}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" onChange={props.handleSignupUsername}></input>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={props.handleSignupPassword}></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default Signup;