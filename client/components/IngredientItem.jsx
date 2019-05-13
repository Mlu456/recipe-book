import React, { Component } from 'react';

const IngredientItem = props => {
    return (
        <li className="ingredient-item" value={props.item}>{props.item} <button onClick={props.deleteIngredient} id={props.id}>x</button></li>
    );
}

export default IngredientItem;

// class IngredientItem extends Component {
//   constructor(props) {
//     super(props);
    
//   }

//   render() {

//     return (
//         <li className="ingredient-item" value={this.props.item}>{this.props.item} <button onClick={this.props.deleteIngredient} id={this.props.id}>x</button></li>
//     );
//   }
// }

