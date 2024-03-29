import { basePATH } from './config';

export function auth(user,pass) {
  var axios = require('axios');
  return axios({
      method: "post",
      url: `${basePATH}/user/login`,
      timeout: 1000 * 5, // Wait for 5 seconds
      headers: {
          "Content-Type": "application/json",
          Accept: 'application/json'
      },
      data: JSON.stringify({"email": user,"password": pass})
      })
      .then((response) => {
          return response;
      })
      .catch((err) => {
          return err;
      });
}