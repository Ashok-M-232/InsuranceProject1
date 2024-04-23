// PracSer.js

import axios from 'axios';

const API_URL = 'http://localhost:9856/api/property'; // Update the URL according to your backend API

const PracSer = {
  createEmp: (empData) => {
    return axios.post(`${API_URL}/add`, empData);
  }
};

export default PracSer;
