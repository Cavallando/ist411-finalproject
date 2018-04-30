import axios from 'axios';
const DEV_BASE_URL = 'http://localhost:3333';

export { getUserPaintingsById,getUserByEmail, getUserById, insertNewUser};

function getUserById(user) {
  const url = `${DEV_BASE_URL}/api/users/id/${user._id}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}

function getUserByEmail(user) {
  const url = `${DEV_BASE_URL}/api/users/email/${user.email}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}

function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/newuser`;
  return axios.post(url, user,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

function getUserPaintingsById(id) {
  const url = `${DEV_BASE_URL}/api/users/paintings/${id}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

/*
function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/newuser`;
  return axios.post(url, user, {headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}
*/

