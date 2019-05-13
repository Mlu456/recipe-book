import React, { Component } from 'react';

const RecipeItem = (props) => {

  let separatedIngredients = [];
  for (let i = 0; i < props.info.ingredients.length - 2; i++) {
    separatedIngredients.push(props.info.ingredients[i] + ', ');
  }
  separatedIngredients.push(props.info.ingredients[props.info.ingredients.length - 1]);

  return (
    <li className="recipe-item" >
      <a href={`https://www.yummly.com/recipe/${props.info.id}`}>
        <p className="recipe-title">{props.info.recipeName}</p>
        <p className="recipe-image"><img src={props.info.smallImageUrls}></img></p>
      </a>
        <p className="recipe-rating"><b className="bold-gray">Dank Meter:</b> {props.info.rating}/5</p>
        <p className="recipe-ingredients"><b className="bold-gray">Ingredients Needed: </b>{separatedIngredients}</p>
        <button onClick={props.addToFavorites} id={props.id}>Favorite</button>
    </li>
  );
}

export default RecipeItem;
// class RecipeItem extends Component {
//   constructor(props) {
//     super(props);
    
//   }

//   render() {
//     let separatedIngredients = [];
//     for(let i = 0; i < this.props.info.ingredients.length - 2; i++) {
//       separatedIngredients.push(this.props.info.ingredients[i] + ', ');
//     }

//     return (
//       <li className="recipe-item" >
//         <a href={`https://www.yummly.com/recipe/${this.props.info.id}`}>
//           <p className="recipe-title">{this.props.info.recipeName}</p>
//           <p className="recipe-image"><img src={this.props.info.smallImageUrls}></img></p>
//         </a>
//           <p className="recipe-rating"><b className="bold-gray">Dank Meter:</b> {this.props.info.rating}/5</p>
//           <p className="recipe-ingredients"><b className="bold-gray">Ingredients Needed: </b>{separatedIngredients}</p>
//           <button>Favorite</button>
//       </li>
//     );
//   }
// }

