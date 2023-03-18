const { response } = require("express");
const fileInput = document.querySelector('recipe-photo-input');
const submitButton = document.querySelector('submitPhoto');

// fetch for login.handlebars
const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('userUsername').value;
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  const data = { name, email, password };
  const response = await fetch('/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
const result = await response.json();

// unknown what goes here now

});



//FETCH for POST RECIPE
fetch('/api/postrecipe', {
    method:'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify({
        recipeid: document.getElementById('recipeid'),
        recipename: document.getElementById('recipename'),
        category: document.getElementById('category'),
        recipephoto: document.getElementById('recipephoto'),
        ingredients: document.getElementById('ingredients'),
        preptime: document.getElementById('preptime'),
        cooktime: document.getElementById('cooktime'),
        instructions: document.getElementById('instructions'),
        submitteduser: document.getElementById('submitteduser'),  // grab user ID from login
        timesubmitstamp: "time",  // ignore for now, stretch goal
        upvotes: "", // set to nothing as later userid will be added when upvoted by the user
        downvotes: "", // same as above
        vegan: document.getElementById('vegan'),
        glutenfree: document.getElementById('glutenfree'),
        vegetarian: document.getElementById('vegetarian'),
        pescatarian: document.getElementById('pescatarian'),
        spicy: document.getElementById('spicy'),
        lowcarb: document.getElementById('lowcarb'),
        nuts: document.getElementById('nuts'),
        dairy: document.getElementById('dairy'),
        seafood: document.getElementById('seafood'),
        alcohol: document.getElementById('alcohol')
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});

//FETCH for USER RECIPES
const loggedInUserId = document.getElementById('users').value;

fetch('/api/users/${loggedInUserId}', {
    method:'GET',
    headers: {
    'Content-Type': 'application/json'
}
})
.then(response => response.json())
.then(data => {
    console.log(data);
    // figure out how to print it all to the page
})
.catch(error => {
    console.error(error);
});


//FETCH for ALL RECIPE
fetch('/api/recipes', {
    method:'GET',
    headers: {
    'Content-Type': 'application/json'
},
// no body required
})
.then(response => response.json())
.then(data => {
        // figure out how to print it all to the page
    console.log(data);
})
.catch(error => {
    console.error(error);
});

//FETCH for EDIT RECIPES
fetch('/api/editrecipe', {
    method:'PUT',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify({
        recipeid: document.getElementById('recipeid'),
        recipename: document.getElementById('recipename'),
        category: document.getElementById('category'),
        recipephoto: document.getElementById('recipephoto'),
        ingredients: document.getElementById('ingredients'),
        preptime: document.getElementById('preptime'),
        cooktime: document.getElementById('cooktime'),
        instructions: document.getElementById('instructions'),
        submitteduser: document.getElementById('submitteduser'),  // grab user ID from login
        timesubmitstamp: "time",  // ignore for now, stretch goal
        upvotes: "", // set to nothing as later userid will be added when upvoted by the user
        downvotes: "", // same as above
        vegan: document.getElementById('vegan'),
        glutenfree: document.getElementById('glutenfree'),
        vegetarian: document.getElementById('vegetarian'),
        pescatarian: document.getElementById('pescatarian'),
        spicy: document.getElementById('spicy'),
        lowcarb: document.getElementById('lowcarb'),
        nuts: document.getElementById('nuts'),
        dairy: document.getElementById('dairy'),
        seafood: document.getElementById('seafood'),
        alcohol: document.getElementById('alcohol')
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});
//FETCH for COMMENT (STRETCH GOAL)

//FETCH for UPVOTE (STRETCH GOAL)

//FETCH for DOWNVOTE (STRETCH GOAL)

//FETCH for RECIPE PHOTO

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const FormData = new FormData();
    FormData.append('recipe-photo', fileInput.files[0]);

    const response = await fetch('/recipeuploadphoto', {
    body: FormData
    });
if (response.ok) {
    const imageElement = document.createElement('img');
    imageElement.src = await response.text();
    document.querySelector('#image-container').appendChild(imageElement);
} else {
    console.error('Cannot upload photo');
}
});