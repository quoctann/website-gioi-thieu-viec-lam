import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "nguoi-dung": "/nguoi-dung/",
    "login": "/o/token/",
    "current-user": "nguoi-dung/current-user/",
    "oauth2-info": "/oauth2-info/"
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})