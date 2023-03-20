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

  router.get('/postrecipe', async (req, res) => {
    // console.log("success!");
    res.render('post');
  });

  router.get('/signup-page', async (req, res) => {
    // console.log("success!");
    res.render('signup'); 
  });

  router.get('/login-page', async (req, res) => {
    // console.log("success!");
    res.render('login');
  });

  // sign up post request to create user 
