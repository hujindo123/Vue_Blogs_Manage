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
      if (response.data.code === -400) {
        alert(response.data.message);
        window.location.href = '/login';
      } else {
        callback(response.data);
      }
    });
  } else if (method === 'post') {
    Axios.post(path, data).then((response) => {
      if (response.data.code === -400) {
        alert(response.data.message);
        window.location.href = '/login';
      } else {
        callback(response.data);
      }
    });
  }
};
export { axios };
