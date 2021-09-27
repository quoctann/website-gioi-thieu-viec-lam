import axios from "axios";

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
    "viec-lam-goi-y": (nguoidungId) => `/viec-lam/${nguoidungId}/goi-y/`,
    "ung-tuyen": "/ung-tuyen/",
    "ung-vien-doi-duyet": (nhatuyendungId) => `/ung-tuyen/${nhatuyendungId}/ung-vien-doi-duyet/`,
    "de-xuat-viec-lam": (ungvienId) => `/ung-tuyen/${ungvienId}/de-xuat-viec-lam/`,
    "thong-ke-theo-quy": (quy, nam) => `/ung-tuyen/thong-ke-theo-nam/?quy=${quy}&nam=${nam}`,
    "thong-ke-theo-nam": (nam) => `/ung-tuyen/thong-ke-theo-nam/?nam=${nam}`,
    "nha-tuyen-dung": "/nha-tuyen-dung/",
    "nha-tuyen-dung-danh-gia": (nhatuyendungId) => `/nha-tuyen-dung/${nhatuyendungId}/danh-gia/`,
    "nha-tuyen-dung-viec-lam": (nhatuyendungId) => `/nha-tuyen-dung/${nhatuyendungId}/viec-lam/`,
    "nha-tuyen-dung-chi-tiet": (nhatuyendungId) => `/nha-tuyen-dung/${nhatuyendungId}/`,
    "nha-tuyen-dung-tim-kiem": (text) => `/nha-tuyen-dung/?tim-kiem=${text}`,
    "nha-tuyen-dung-doi-xet-duyet": "/nha-tuyen-dung/doi-xet-duyet/",
    "kich-hoat": (nhatuyendungId) => `/nha-tuyen-dung/${nhatuyendungId}/duyet-nha-tuyen-dung/`,
    "bang-cap": "/bang-cap/",
    "ky-nang": "/ky-nang/",
    "kinh-nghiem": "/kinh-nghiem/",
    "nganh-nghe": "/nganh-nghe/",
}

export const baseURL = "http://127.0.0.1:8000";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})