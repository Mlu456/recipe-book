const axios = require('axios');

const recipeController = {};

recipeController.getRecipe = (req, res, next) => {
  let YUM_KEY= '6b1d513aedbeea9f27ace38ae4bce109';
  let YUM_ID = 'b748a53f';
  let url = `http://api.yummly.com/v1/api/recipes?_app_id=${YUM_ID}&_app_key=${YUM_KEY}&q=${req.body.ingredientList.join('+')}&maxResult=30`;
  axios.get(url)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {console.log(err)})
  // next();
}

module.exports = recipeController;