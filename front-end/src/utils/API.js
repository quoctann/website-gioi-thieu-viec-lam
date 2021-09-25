import axios from "axios";
// import cookies from "react-cookies";

export let endpoints = {
    "nguoi-dung": "/nguoi-dung/",
    "dang-nhap": "/o/token/",
    "nguoi-dung-hien-tai": "/nguoi-dung/hien-tai/",
    "oauth2-info": "/oauth2-info/",
    "viec-lam": "/viec-lam/",
    "viec-lam-loc": (nganhNghe, bangCap, kinhNghiem, kyNang) => {
        let url = "/viec-lam/?";
        if(nganhNghe)
            url += `nganh-nghe=${nganhNghe}&`;
        if(bangCap)
            url += `bang-cap=${bangCap}&`;
        if(kinhNghiem)
            url += `kinh-nghiem=${kinhNghiem}&`;
        if(kyNang)
            url += `ky-nang=${kyNang}&`;
        return url;
    },
    "viec-lam-chi-tiet": (postId) => `/viec-lam/${postId}/`,
    "ung-tuyen": "/ung-tuyen/",
    "nha-tuyen-dung": "/nha-tuyen-dung/",
    "nha-tuyen-dung-danh-gia": (hiringId) => `/nha-tuyen-dung/${hiringId}/danh-gia/`,
    "nha-tuyen-dung-viec-lam": (hiringId) => `/nha-tuyen-dung/${hiringId}/viec-lam/`,
    "nha-tuyen-dung-chi-tiet": (hiringId) => `/nha-tuyen-dung/${hiringId}/`,
    "nha-tuyen-dung-tim-kiem": (text) => `/nha-tuyen-dung/?tim-kiem=${text}`,
    "bang-cap": "/bang-cap/",
    "ky-nang": "/ky-nang/",
    "kinh-nghiem": "/kinh-nghiem/",
    "nganh-nghe": "/nganh-nghe/",
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})