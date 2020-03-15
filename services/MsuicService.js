import axios from 'axios'
const apiClient = axios.create({
  baseURL: `http://localhost:3333/api/v1/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getMusics() {
    return apiClient.get('https://reqres.in/api/users')
  },
  getMusic(id) {
    return apiClient.get('https://reqres.in/api/users/' + id)
  }
}
