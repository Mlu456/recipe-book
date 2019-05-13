import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import Login from './Login.jsx';
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import Favorites from './Favorites.jsx';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientTextValue: '',
      ingredientList: ['oil', 'salt'],
      currentRecipes: {},
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: '',
      user: {
        username: '',
        id: 0,
        verified: false
      },
      faveItems : [],
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.updateRecipes = this.updateRecipes.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleSignupUsername = this.handleSignupUsername.bind(this);
    this.handleSignupPassword = this.handleSignupPassword.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.updateFaveItems = this.updateFaveItems.bind(this);
  }

  updateFaveItems(arr) {
    this.setState({faveItems: arr})
  }

  handleTextChange(e) {
    this.setState({ingredientTextValue: e.target.value});
  }

  addIngredient(e) {
    if(/\w+/.test(this.state.ingredientTextValue) && this.state.ingredientTextValue.length > 1 && !this.state.ingredientList.includes(this.state.ingredientTextValue)){
      let curList = this.state.ingredientList;
      curList.push(this.state.ingredientTextValue);
      this.setState({ingredientTextValue: '', ingredientList: curList});
    }
    event.preventDefault();
    this.updateRecipes();
  };

  deleteIngredient(e) {
    let copy = this.state.ingredientList;
    let index = e.target.id;
    if (index >= 0) {
      copy.splice(index, 1);
      this.setState({ingredientList: copy});
    }
    this.updateRecipes();
  }

  updateRecipes() {
    axios.post('http://localhost:3000/getrecipe', {ingredientList: this.state.ingredientList})
      .then(res => {
        this.setState({currentRecipes: res.data})
      })
      .catch(error => console.log(error))
  }

  //---------LOGIN-----------------
  handleLogin(e) {
    console.log('logging in');
    event.preventDefault();
    axios.post('http://localhost:3000/login', {loginUsername: this.state.loginUsername, loginPassword: this.state.loginPassword})
      .then(res => {
        this.setState({user: res.data.user})// loginPassword: '', loginUsername: ''
        // console.log(res.data.status);
      })
      .catch(err => console.log(err))
  }
  
  handleLoginUsername(e) {
    this.setState({loginUsername: e.target.value});
  }
  
  handleLoginPassword(e) {
    this.setState({loginPassword: e.target.value});
  }

  //---------SIGNUP-----------------

  handleSignup(e) {
    event.preventDefault();
    console.log('signing up');
    axios.post('http://localhost:3000/signup', {signupUsername: this.state.signupUsername, signupPassword: this.state.signupPassword})
      .then(res => console.log(res.data.status))
      .catch(err => console.log(err));
  }

  handleSignupUsername(e) {
    this.setState({signupUsername: e.target.value});
  }
  
  handleSignupPassword(e) {
    this.setState({signupPassword: e.target.value});
  }

  // Favorites
  addToFavorites(e){
    if (this.state.user.verified) {
      console.log('adding to favorites')
      let item = {}
      item.recipeName = this.state.currentRecipes.matches[e.target.id].recipeName;
      item.url = this.state.currentRecipes.matches[e.target.id].smallImageUrls[0];
      item.curUserID = this.state.user.id;
      axios.post('http://localhost:3000/add', item)
        .then(res => console.log(`added ${item.recipeName} to favorites`))
        .catch(err => console.log(err));        
    }

    else{
      console.log('Please Login');
    }
  }

  componentDidMount() {
    this.updateRecipes();
  }

  render() {
    if (this.state.user.verified) {
      return (
        <div className='main'>
          <h2>Welcome {this.state.user.username}</h2>
          <Router>
            <div>
              <Link to='/home'><h2> Home</h2></Link>
              <Link to='favorites'><h2> Favorites</h2></Link>
              <Switch>
                <Route path='/home' render={() => <Home addIngredient={this.addIngredient} addToFavorites={this.addToFavorites} ingredientTextValue={this.state.ingredientTextValue} handleTextChange={this.handleTextChange} ingredientList={this.state.ingredientList} deleteIngredient={this.deleteIngredient} currentRecipes={this.state.currentRecipes} updateRecipes={this.updateRecipes}/>} />
                <Route path='/favorites' render={() => <Favorites user={this.state.user} updateFaveItems={this.updateFaveItems} faveItems={this.state.faveItems}/> }/>
              </Switch>
            </div>
          </Router>
        </div>
      )
    }

    else {
      return ( 
        <div className="main">
          <Router>
            <div className="user-profile">

              <Link to='/signup'><h2>Signup</h2></Link>
              <Link to='/login'><h2> Login</h2></Link>
              {/* <Link to='/home'><h2> Home</h2></Link> */}

              <Switch>
                <Route path='/signup' render={() => <Signup handleSignup={this.handleSignup} handleSignupUsername={this.handleSignupUsername} handleSignupPassword={this.handleSignupPassword}/>} />
                <Route path='/login' render={() => <Login handleLogin={this.handleLogin} handleLoginUsername={this.handleLoginUsername} handleLoginPassword={this.handleLoginPassword} handleSignup={this.handleSignup} handleSignupUsername={this.handleSignupUsername} handleSignupPassword={this.handleSignupPassword}/>} />
                {/* <Route path='/home' render={() => <Home addIngredient={this.addIngredient} ingredientTextValue={this.state.ingredientTextValue} handleTextChange={this.handleTextChange} ingredientList={this.state.ingredientList} deleteIngredient={this.deleteIngredient} currentRecipes={this.state.currentRecipes} updateRecipes={this.updateRecipes}/>} /> */}
              </Switch>
              <br></br>
              <br></br>
              <Home addIngredient={this.addIngredient} ingredientTextValue={this.state.ingredientTextValue} addToFavorites={this.addToFavorites} handleTextChange={this.handleTextChange} ingredientList={this.state.ingredientList} deleteIngredient={this.deleteIngredient} currentRecipes={this.state.currentRecipes} updateRecipes={this.updateRecipes}/>
            </div>
          </Router>
        </div>
      );
    }
  }
}
export default App;