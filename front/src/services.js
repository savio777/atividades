import axios from 'axios'

const url = 'http://localhost/modelo/'

const api = axios.create({ baseURL: url })

export default api
