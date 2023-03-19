const router = require('express').Router();
const { User, Recipe } = require('../models');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll();
    const plainRecipes = allRecipes.map(recipe => recipe.get({plain: true}))
    console.log(plainRecipes);
    res.render('homepage', { plainRecipes });
  });
  

  module.exports = router;

  // sign up post request to create user 
