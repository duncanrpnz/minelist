import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.api
});

export default instance;
