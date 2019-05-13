import React, { Component } from 'react';
import FaveItem from './FaveItem.jsx'

const axios = require('axios');

class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userID = this.props.user.id;
    axios.post('http://localhost:3000/getfavorites', {userID: userID})
    .then(result => {
      // console.log(result.data)
      this.props.updateFaveItems(result.data);
      // return result.data
    }) 
    // .then(data => this.setState({faveItems: data}))
    .catch(err => console.log(err))
  }

  render() {
    let arr = this.props.faveItems.map(el => <FaveItem info={el} />)

    return (
      <div>
       <h3>Your Favorites</h3>
       {arr}
      </div>
    )
  }

}

export default Favorites;