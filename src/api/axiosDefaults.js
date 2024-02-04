import axios from "axios";
axios.defaults.baseURL = "https://hutchihols-4c93c52221af.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

const accessToken = localStorage.getItem('access_token');

export const axiosRes = axios.create();
export const axiosReq = axios.create({
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }
});