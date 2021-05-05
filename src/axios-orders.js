import axios from 'axios'

let token = sessionStorage.getItem('token');
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }
})

instance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response)
    }),
  (error) => {
    console.log(error.response.status);
    if(error.response.status === 401){
      sessionStorage.clear();
      window.location.href = 'sign-in';
      return ;
    }
    return Promise.reject(error);
  }
)

export default instance
