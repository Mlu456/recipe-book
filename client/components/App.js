import React, { Component } from 'react';
import Ingredients from './Ingredients.jsx'
import Recipes from './Recipes.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    }
  }

  render() {

    return (
      <div>
        <Ingredients />
        <Recipes />
      </div>
    );
  }
}

export default App;
