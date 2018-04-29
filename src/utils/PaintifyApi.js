import axios from 'axios';
const DEV_BASE_URL = 'http://localhost:3333';

export { getUserId, getAllPaintingsByUserId, getPaintingById, savePaintings };

function getUserId(email) {
  const url = `${DEV_BASE_URL}/api/user`;
  return axios.get(url, { params: { email: email }, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(response => response.data);
}

function getAllPaintingsByUserId(_id) {
  const url = `${DEV_BASE_URL}/api/user/paintings`;
  return axios.get(url, { params: { id: _id }, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(response => response.data);
}

function getPaintingById(id) {
  const url = `${DEV_BASE_URL}/api/painting`;
  return axios.get(url, { params: { painting_id: id }, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(response => response.data);
}


function savePaintings() {
  const url = `${DEV_BASE_URL}/api/save/paintings`;
  return axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(response => response.data);
}
