import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`
})

instance.interceptors.response.use(
  (response) => {
    new Promise((resolve, reject) => {
      resolve(response)
    }),
      (error) => {
        if(!error.response){
          return new Promise((resolve, reject) => {
            reject(error)
          });
        }

        if(error.response.status === 404 || error.response.status === 401){
          sessionStorage.removeItem('token');
          window.location('sign-in')
        }else{
          return new Promise((resolve, reject) => {
            reject(error)
          })
        }
      }
  }
)

export default instance
