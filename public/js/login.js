if (document.getElementById('loginButton')) {
  form = document.getElementById('loginButton');
  form.addEventListener('click', async (event) => {
      event.preventDefault();
 console.log("logging in...");
  const email = document.querySelector('#userEmail').value.trim();
  const password = document.querySelector('#userPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
});

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);
};

// module.exports({loginFormHandler});
