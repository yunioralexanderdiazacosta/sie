import axios from 'axios';

export default axios.create({
  // baseURL: '',
  baseURL: 'https://api-visitas-sie.herokuapp.com',
  headers: {
    //'Content-Type': 'application/x-www-form-urlencoded',
    'Content-type': 'application/json',
  },
});
