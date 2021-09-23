import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "user": "/nguoi-dung/",
    "login": "/o/token/",
    "current-user": "/nguoi-dung/hien-tai/",
    "oauth2-info": "/oauth2-info/",
    "posts": "/viec-lam/?page=",
    "post-detail": "/viec-lam/",
    "apply-offer": "/ung-tuyen/",
    "apply-valid": "/ung-tuyen/hop-le/",
    "search-hiring-by-name": "/nha-tuyen-dung/tim-kiem-theo-ten/",
    "hiring": "/nha-tuyen-dung/",
    "hiring-rating": "/danh-gia-nha-tuyen-dung/chi-tiet/",
    "degree": "/bang-cap/",
    "skill": "/ky-nang/",
    "experience": "/kinh-nghiem/",
    "career": "/nganh-nghe/",
    "job-filter": "/viec-lam/loc-dieu-kien/",

}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})