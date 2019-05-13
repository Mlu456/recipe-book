import React, { Component } from 'react';
import IngredientContainer from './containers/IngredientContainer.jsx';
import RecipesContainer from './containers/RecipeContainer.jsx';

const Home = (props) => {
  return (
    <div className="content">
      <div className="ingredients">
        <form onSubmit={props.addIngredient}>
            <input type="text" value={props.ingredientTextValue} onChange={props.handleTextChange} placeholder="Add an ingredient"></input>
        </form>
        <IngredientContainer ingredientList={props.ingredientList} deleteIngredient={props.deleteIngredient} />
      </div>

      <div className="recipes">
        <RecipesContainer addToFavorites={props.addToFavorites} currentRecipes={props.currentRecipes} updateRecipes={props.updateRecipes}/>
      </div>
    </div>
  )
}

export default Home;