// client/src/api/user.js
import axios from 'axios'

const API_URL = '/api/users'

export const getUserList = () => {
  return axios.get(API_URL)
}

export const createUser = (userData) => {
  return axios.post(API_URL, userData)
}