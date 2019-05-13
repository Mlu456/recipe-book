import React, { Component } from 'react';
import IngredientItem from '../IngredientItem.jsx';

const IngredientContainer = props => {
  let ingredientList = props.ingredientList.map((el, id = 0) => <IngredientItem item={el} deleteIngredient={props.deleteIngredient} id={id++} />);

  return (
    <div>
      <h4>My Ingredients</h4>
      <ul className="ingredient-list">
        {ingredientList}
      </ul>
    </div>
  );
}

export default IngredientContainer;

// class IngredientContainer extends Component {
//   constructor(props) {
//     super(props);
    
//   }

//   render() {
//     let ingredientList = this.props.ingredientList.map((el, id = 0) => <IngredientItem item={el} deleteIngredient={this.props.deleteIngredient} id={id++} />);

//     return (
//       <div>
//         <h4>My Ingredients</h4>
//         <ul className="ingredient-list">
//           {ingredientList}
//         </ul>
//       </div>
//     );
//   }
// }
