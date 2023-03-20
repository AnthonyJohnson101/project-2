const router = require('express').Router();
const { User, Recipe } = require('../../models');
const multer = require('multer');
const bcrypt = require('bcrypt');

//new multer stuff
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './uploads')
  },
  filename: function (req, res, cb) {
    cb(null, file.originalname)
  }

});

const upload = multer({ storage: storage });



router.post('/signup', async (req, res) => {
//create table row based on form submission
   if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400)
      .json({ message: 'Please provide all required information.' });
    console.info(`${req.method} request received but failed to create new user`);
  } else {
    await User.create(req.body);

    res.status(200);
    res.send();
  // TODO write a catch

  //log it:
    console.info(`${req.method} request received to create new user`);
  };
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.pass);

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



// route to post recipe from form (must submit as json)
router.post('/postrecipe', async (req, res) => {

//create table row based on form submission
    await Recipe.create(req.body);
    res.status(200);
    res.send();
// TODO write a catch

    //log it:
    console.info(`${req.method} request received to post new recipe`);
});


// Route to get all the user's recipes based on submitted user ID from front end logic
router.get('/userrecipes', async (req, res) => { 

    // grab recipes from db based on user ID
    const userRecipes = await Recipe.findAll({
      where: {
        submitteduser: req.body.userid
      }
    });
    res.json(JSON.stringify(userRecipes));

    //log it:
    console.info(`${req.method} request received to get user's recipes`);    
});

// route to get single user recipe
router.get('/singlerecipe', async (req, res) => {

  const singleRecipe = await Recipe.findOne({
    where: {
      recipename: req.body.recipename
    }
  })
  res.json(JSON.stringify(singleRecipe));
  console.info(`${req.method} request received to get single recipe`);  


});


// Route to get all recipes
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
    // receive req.body 
    let changedFields = req.body;
    // go through and find all things undefined (loop through keys)
    Object.keys(changedFields).forEach(key => {
      if (changedFields[key] === null) {
        delete changedFields[key];
      } 
      // output object of things that changed
    });


    const result = await Recipe.update(
      
        changedFields,

      { 
        where: {
          // recipeid: req.body.recipeid
          recipeid: req.body.recipeid
        }
      }

    );

    res.status(200);
    res.json(result);
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
    let upvotedRecipe = await Recipe.findOne(
      {
        where: { 
          recipeid: req.body.recipeid
        },
      });


    //grab the recipe's upvotes
    upvoteArray = upvotedRecipe.numUpvotes;

    if (!upvoteArray.includes(req.body.userid.toString())) {
        upvoteArray.push(req.body.userid)
    //put to the upvote count +1 AND prevent user from re-upvoting
    const update = Recipe.update(
      {
        upvotes: upvoteArray.toString()
      },
      { 
        where: {
          recipeid: req.body.recipeid
        }
      }
    );

    res.status(200); 
    console.info(update);
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
    let downvotedRecipe = await Recipe.findOne(
      {
        where: { 
          recipeid: req.body.recipeid
        },
      });

    //grab the recipe's upvotes
    downvoteArray = downvotedRecipe.numDownvotes;
      console.info("user id: ", req.body.userid);
      console.info("downvote array: ", downvoteArray);

    if (!downvoteArray.includes(req.body.userid.toString())) {
      downvoteArray.push(req.body.userid)
    //put to the upvote count +1 AND prevent user from re-upvoting
    Recipe.update(
      {
        downvotes: downvoteArray.toString()
      },
      { 
        where: {
          recipeid: req.body.recipeid
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


// router.post('/recipe-photo', upload.single('recipe-photo-file'), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// });

router.post('/recipeuploadphoto', upload.single('recipephoto'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  let response = `<img src="${req.file.path}" />`
  return res.send(response)
})


module.exports = router;