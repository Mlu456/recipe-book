import React, { Component } from 'react';

const UserContainer = props => {
  return (
    <button onClick={props.handleLogin}>
      Login
    </button>
  )
}

export default UserContainer;