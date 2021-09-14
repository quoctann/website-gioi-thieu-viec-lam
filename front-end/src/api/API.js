import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "login": "/o/token/",
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})