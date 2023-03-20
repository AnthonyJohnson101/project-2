const router = require('express').Router();
const { User, Recipe } = require('../models');



router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll();
    const plainRecipes = allRecipes.map(recipe => recipe.get({plain: true}));
    if (req.session.logged_in) {
      console.info(req.session.user_id);
      const userData = await User.findOne({ where: { userid: req.session.user_id} });
      const plainUserData = userData.dataValues;
      res.render('homepage', { plainRecipes, plainUserData });
      return;
    };

    res.render('homepage', { plainRecipes });
  });
  

  module.exports = router;

  router.get('/postrecipe', async (req, res) => {
    // console.log("success!");
    if (req.session.logged_in) {
      console.info(req.session.user_id);
      const userData = await User.findOne({ where: { userid: req.session.user_id} });
      const plainUserData = userData.dataValues;
      res.render('post', { plainUserData });
      return;
    };
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

  router.get('/logout', async (req, res) => {
    // console.log("success!");
    res.render('logout'); 
  });

  // sign up post request to create user 
