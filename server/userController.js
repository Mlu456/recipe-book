const { Client } = require('pg');

let userController = {};

userController.createUser = (req, res, next) => {
  // Connect to db
  const client = new Client({
    host: 'isilo.db.elephantsql.com',
    port: 5432,
    user: 'kjozompw',
    password: 'XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM',
    database: 'kjozompw',
    connectionString: 'postgres://kjozompw:XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM@isilo.db.elephantsql.com:5432/kjozompw',
  })
  client.connect()
  .then(() => console.log('connected to db to signup'))
  .catch(e => console.log('error with connection', e.stack))

  // Validate user input
  let {signupUsername, signupPassword} = req.body;
  // if (!signupUsername.trim() || !signupPassword.trim()) {
  //   res.send({status: 'Invalid username or password'});  
  //   client.end();
  // } 
  // client.query(`SELECT username FROM users`)
  client.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [signupUsername, signupPassword], (err, result) => {
    if (err) {
      // console.log(err);
      res.send({status: 'Signup Failed'});
      // client.end();
    } else {
      res.send({status: 'Signup Success'});      
    }
    client.end();
  })

}

userController.verifyUser = (req, res, next) => {
  const client = new Client({
    host: 'isilo.db.elephantsql.com',
    port: 5432,
    user: 'kjozompw',
    password: 'XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM',
    database: 'kjozompw',
    connectionString: 'postgres://kjozompw:XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM@isilo.db.elephantsql.com:5432/kjozompw',
  })
  client.connect()
  .then(() => console.log('connected to db to login'))
  .catch(e => console.log('error with connection', e.stack))

  // Validate user input
  let {loginUsername, loginPassword} = req.body;

  client.query(`SELECT * FROM users WHERE username='${loginUsername}' AND password='${loginPassword}'`, (err, result) => {
    // console.log(result.rows[0].user_id);
    let id = result.rows[0].user_id;
    if (result.rowCount > 0) {
      res.send({status: 'Login Success', user: {username: loginUsername, id: id, verified: true}})
    } else {
      res.send({status: 'Login Failed', user: {username: loginUsername, id: id, verified: false}});
    }
    client.end();
  })
}

userController.addToFavorite = (req, res, next) => {
  const client = new Client({
    host: 'isilo.db.elephantsql.com',
    port: 5432,
    user: 'kjozompw',
    password: 'XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM',
    database: 'kjozompw',
    connectionString: 'postgres://kjozompw:XRgkKzhqZbVu7P0dxDiyVxsybLyruRLM@isilo.db.elephantsql.com:5432/kjozompw',
  })

  client.connect()
  .then(() => console.log('connected to db to favorite'))
  .catch(e => console.log('error with connection', e.stack))
  let {recipeName, url, curUserID} = req.body;

  client.query(`INSERT INTO recipes (recipe_name, url) VALUES ($1, $2)`, [recipeName, url], (err, result) => {
    if(err){
      console.log(err)
    } else {
      console.log(result);
    }
  })

  client.query(`SELECT "recipe_id" from recipes WHERE recipe_name='${recipeName}'`)
    .then(res => res.rows[0].recipe_id)
    .then(data => client.query(`INSERT INTO favorites (recipe_id, user_id) VALUES ($1, $2)`, [data, curUserID]))
    .then(result => console.log(result))
    .catch(e => console.error(e.stack))
    .then(() => client.end())

}

userController.getFave = (req, res, next) => {
  // console.log('req.body', req.body)
  const client = new Client({
    host: 'isilo.db.elephantsql.com',
    port: 5432,
    user: process.end.user,
    password: process.env.pw,
    database: process.env.db,
    connectionString: process.env.connectionString,
  })
  client.connect()
  .then(() => console.log('connected to db to login'))
  .catch(e => console.log('error with connection', e.stack))

  let {userID} = req.body;
  
  client.query(`SELECT * FROM recipes INNER JOIN favorites ON favorites.recipe_id=recipes.recipe_id WHERE favorites.user_id='${userID}'`, (err, result) =>{
    if(err){
      console.log(err)
    } else {
      let recipeNames = [];
      result.rows.forEach(el => recipeNames.push(el.recipe_name))
      res.send(recipeNames)
    }
    client.end();
  })

}

module.exports = userController;