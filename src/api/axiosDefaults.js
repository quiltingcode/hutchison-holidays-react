import axios from "axios";
axios.defaults.baseURL = "https://dvh-django-tiktak.ew.r.appspot.com/";
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