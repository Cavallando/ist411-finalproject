import axios from 'axios';
const DEV_BASE_URL = 'http://localhost:3333';

export function getUserById(userId) {
  const url = `${DEV_BASE_URL}/api/users/id/${userId}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}

export function getUserByEmail(email) {
  const url = `${DEV_BASE_URL}/api/users/email/${email}`;
  return axios.get(url, {headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}

export function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/users/newuser`;
  return axios.post(url, user,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

export function getUserPaintingsById(id) {
  const url = `${DEV_BASE_URL}/api/users/paintings/${id}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

export function getPaintingById(paintId) {
  const url = `${DEV_BASE_URL}/api/paintings/${paintId}`;
  return axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

export function updatePaintingById(paintId, paintData, userId) {
  const url = `${DEV_BASE_URL}/api/paintings/update/${paintId}/${userId}`;
  return axios.post(url,paintData,{headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

export function insertNewPainting(userId, paintingName, paintData) {
  const url = `${DEV_BASE_URL}/api/paintings/newpainting/${userId}`;
  return axios.post(url, {"painting_name": paintingName, "paint_data":paintData},{headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data)
}

/*
function insertNewUser(user) {
  const url = `${DEV_BASE_URL}/api/newuser`;
  return axios.post(url, user, {headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(response => response.data);
}
*/

