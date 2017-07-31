/**
 * Created by Administrator on 2017/7/28.
 */
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3000';
const axios = (method, path, data, callback) => {
  data['token'] = sessionStorage.getItem('token');
  if (method === 'get') {
    Axios.get(path, {
      params: data
    }).then((response) => {
      callback(response.data);
    }).catch(function (err) {
      if (err.response.data.code === -400) {
        alert(err.response.data.message);
        window.location.href = '/login';
      }
      callback(err);
    });
  } else if (method === 'post') {
    Axios.post(path, data).then((response) => {
      callback(response.data);
    }).catch(function (err) {
      if (err.response.data.code === -400) {
        alert(err.response.data.message);
        window.location.href = '/login';
      }
      callback(err);
    });
  }
};
export { axios };
