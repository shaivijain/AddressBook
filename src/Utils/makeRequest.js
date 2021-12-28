import Axios from "axios";
const REACT_APP_API_URL = 'http://localhost:4000/'

const makeRequest = {
    getUsers(url,data) {
      let userData = {}
      return new Promise((resolve, reject) => {
        Axios.get(`${REACT_APP_API_URL}${url}`)
        .then(resp => {
            resp.data.map(item=>{
              if(item.username === data.username && item.password === data.password){
                userData = {...item}
              }
              return '';
            })
            resolve(userData);
        })
        .catch(error => {
          reject(error);
        });
      })
    },
    get(url) {
      return new Promise((resolve, reject) => {
        Axios.get(`${REACT_APP_API_URL}${url}`)
        .then(resp => {
            resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    })
    },
    post(url,data) {
      return new Promise((resolve, reject) => {
        Axios.post(`${REACT_APP_API_URL}${url}`,data)
        .then(resp => {
            resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    })
    },
    put(url,data) {
      return new Promise((resolve, reject) => {
        Axios.put(`${REACT_APP_API_URL}${url}`,data)
        .then(resp => {
            resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    })
    },
    delete(url) {
      return new Promise((resolve, reject) => {
        Axios.delete(`${REACT_APP_API_URL}${url}`)
        .then(resp => {
            resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    })
    }
}
export default makeRequest;