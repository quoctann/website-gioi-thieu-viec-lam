import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "user": "/nguoi-dung/",
    "login": "/o/token/",
    "current-user": "/nguoi-dung/hien-tai/",
    "oauth2-info": "/oauth2-info/",
    "posts": "/viec-lam/",
    "posts-filter": (career, degree, experience, skill) => {
        let url = "/viec-lam/?";
        if(career)
            url += `nganh-nghe=${career}&`;
        if(degree)
            url += `bang-cap=${degree}&`;
        if(experience)
            url += `kinh-nghiem=${experience}&`;
        if(skill)
            url += `ky-nang=${skill}&`;
        return url;
    },
    "post-detail": (postId) => `/viec-lam/${postId}/`,
    "apply-offer": "/ung-tuyen/",
    "hiring": "/nha-tuyen-dung/",
    "hiring-ratings": (hiringId) => `/nha-tuyen-dung/${hiringId}/danh-gia/`,
    "hiring-posts": (hiringId) => `/nha-tuyen-dung/${hiringId}/viec-lam/`,
    "hiring-detail": (hiringId) => `/nha-tuyen-dung/${hiringId}/`,
    "hiring-search-by-name": (text) => `/nha-tuyen-dung/?search=${text}`,
    "degree": "/bang-cap/",
    "skill": "/ky-nang/",
    "experience": "/kinh-nghiem/",
    "career": "/nganh-nghe/",
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})