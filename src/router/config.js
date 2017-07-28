/**
 * Created by Administrator on 2017/7/28.
 */
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3000';
const axios = (method, path, data, callback) => {
  if (method === 'get') {
    Axios.get(path, {
      params: data
    }).then((response) => {
      callback(response.data);
    }).catch(function (err) {
      callback(err);
    });
  } else if (method === 'post') {
    Axios.post(path, data).then((response) => {
      callback(response.data);
    }).catch(function (err) {
      callback(err);
    });
  }
};
export { axios };
