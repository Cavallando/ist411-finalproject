import axios from 'axios';
const DEV_BASE_URL = 'http://localhost:3333';

export { getUserByEmail, getUserById, insertNewUser};

function getUserById(id) {
  const url = `${DEV_BASE_URL}/api/users/id/${id}`;
  return axios.get(url).then(response => response.data);
}

function getUserByEmail(email) {
  const url = `${DEV_BASE_URL}/api/users/email/${email}`;
  return axios.get(url).then(response => response.data);
}

function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/newuser`;
  return axios.post(url, user).then(response => response.data);
}

/*
function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/newuser`;
  return axios.post(url, user, {headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}
*/

