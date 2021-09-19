import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "user": "/nguoi-dung/",
    "login": "/o/token/",
    "current-user": "/nguoi-dung/current-user/",
    "oauth2-info": "/oauth2-info/",
    "posts": "/viec-lam/?page="
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})