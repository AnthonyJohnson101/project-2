if (document.getElementById('logoutButton')) {
  const logoutButton = document.getElementById('logoutButton');
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/'); //replace('/login')
  } else {
    alert('You are not currently logged in');
  }
};

document.querySelector('#logoutButton').addEventListener('click', logout);

};