const { response } = require("express");

const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('userUsername').value;
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  const data = { name, email, password };
    method: 'POST'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
const result = await response.json();


// put here what we need done with data
