const router = require('express').Router();
const { User, Recipe } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



// route to post recipe
router.post('/postrecipe', async (req, res) => {

//create table row based on form submission
    await Recipe.create(req.body);

    res.status(200);
    res.send();
// TODO write a catch

    //log it:
    console.info(`${req.method} request received to post new recipe`);
});


// Route to get the user's recipes
router.get('/userrecipes', async (req, res) => { 

    // grab recipes from db based on user ID
    const allRecipes = await Recipe.findAll(req.user_id);
    res.json(JSON.stringify(allRecipes));

    //log it:
    console.info(`${req.method} request received to get user's recipes`);    
});

// Route to get all recipes (or one route to get recipes based on different criteria)
router.get('/recipes', async (req, res) => {
    // grab ALL recipes based on search criteria or specified criteria

    const allRecipes = await Recipe.findAll();
    res.json(JSON.stringify(allRecipes));
    //ensure front end displays first 30 or whatever number

    //log it:
    console.info(`${req.method} request received to get all recipes`);
});

// Route to put edit user's recipe
router.put('/editrecipe', async (req, res) => {
    // put to specified recipe ID applicable changes with form
    Recipe.update(
      {
        // probably for loop to loop through all items from the body of the request
      },
      { 
        where: {
          recipe_id: req.recipe_id
        }
      }
    );
    res.status(200);
    res.send();
// TODO write a catch

    
    //log it:
    console.info(`${req.method} request received to edit recipe`);
});

// Route to post comment on other users' recipes 
router.post('/comment', async (req, res) => {
    // post to recipe comment with username of author
// 03/13 BUILDING COMMENTS LATER AS STRETCH GOAL
    //log it:
    console.info(`${req.method} request received to post comment`);
});

// Route to put upvote
router.put('/upvote', async (req, res) => {

    // grab the row OF the recipe
    let upvotedRecipe = Recipe.findOne(
      {
        where: { 
          recipe_id: req.recipe_id
        },
      });

    //grab the recipe's upvotes
    upvoteArray = JSON.parse(upvotedRecipe.upvotes);
    if (!upvoteArray.includes(req.user_id)) {

    //put to the upvote count +1 AND prevent user from re-upvoting
    Recipe.update(
      {
        upvotes: JSON.stringify(upvoteArray.push(req.user_id))
      },
      { 
        where: {
          recipe_id: req.recipe_id
        }
      }
    );

    res.status(200); 

  } else { 

    res.status(400); 
  }

  res.send();

    //log it:
    console.info(`${req.method} request received to add to upvote counter`);
});

// Route to put downvote
router.put('/downvote', async (req, res) => {

    // grab the row OF the recipe
    let downvotedRecipe = Recipe.findOne(
      {
        where: { 
          recipe_id: req.recipe_id
        },
      });

    //grab the recipe's upvotes
    downvoteArray = JSON.parse(downvotedRecipe.downvotes);
    if (!downvoteArray.includes(req.user_id)) {

    //put to the upvote count +1 AND prevent user from re-upvoting
    Recipe.update(
      {
        downvotes: JSON.stringify(downvoteArray.push(req.user_id))
      },
      { 
        where: {
          recipe_id: req.recipe_id
        }
      }
    );

    res.status(200); 

  } else { 

    res.status(400); 
  }

  res.send();

    //log it:
    console.info(`${req.method} request received to add to downvote counter`);
});


module.exports = router;