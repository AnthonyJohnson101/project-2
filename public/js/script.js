const { response } = require("express");

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


//FETCH for LOGIN
fetch('/api/userRoutes.js', {
    method:'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify({
        email: '',
        password: ''
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});

//FETCH for LOGOUT





//FETCH for POST RECIPE
fetch('/api/userRoutes.js', {
    method:'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify({
        userRecipes:''
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});