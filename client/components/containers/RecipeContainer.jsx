import React, { Component } from 'react';
import RecipeItem from '../RecipeItem.jsx';

const RecipesContainer = (props) => {

  let recipeList = [];
  if (Object.keys(props.currentRecipes).length){
    recipeList = props.currentRecipes.matches.map((el, id = 0) => <RecipeItem info={el} addToFavorites={props.addToFavorites} id={id++}/>);
  }

  return (
    <div>
      {/* <button onClick={props.updateRecipes}>Update Recipes</button> */}
      <h4>Recipes you can make</h4>
      <ul className="recipes-list">
        {recipeList}
      </ul>
    </div>
  ); 
}

export default RecipesContainer;
// class RecipesContainer extends Component {
//   constructor(props) {
//     super(props);
    
//   }

//   render() {
//     let recipeList;
//     if (Object.keys(this.props.currentRecipes).length){
//       console.log('a recipe', this.props.currentRecipes.matches[0])
//       recipeList = this.props.currentRecipes.matches.map((el, id = 0) => <RecipeItem info={el}/>);
//       console.log('recipeList', recipeList);
//     }
//     return (
//       <div>
//         <button onClick={this.props.updateRecipes}>Update Recipes</button>
//         <h4>Recipes you can make</h4>
//         <ul className="recipes-list">
//           {recipeList}
//         </ul>
//       </div>
//     );
//   }
// }

