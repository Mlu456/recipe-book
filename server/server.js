const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const recipeController = require('./recipeController');
const userController = require('./userController');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/getrecipe', recipeController.getRecipe);

app.post('/login', userController.verifyUser);

app.post('/signup', userController.createUser);

app.post('/add', userController.addToFavorite);

app.post('/getfavorites', userController.getFave);

app.get('/signup', (req, res) =>{
  res.sendFile(path.join(__dirname,'./../index.html'))
})

app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname,'./../index.html'))
})

app.get('/home', (req, res) =>{
  res.sendFile(path.join(__dirname,'./../index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000);

module.exports = app;