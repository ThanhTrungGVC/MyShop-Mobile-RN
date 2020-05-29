const checkToken = (token) => (
  fetch('http://192.168.1.239/app-server/check_login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token})
  }).then(res => res.json())
);
module.exports = checkToken;
