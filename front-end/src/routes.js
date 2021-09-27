const Routes = {
    // Pages
    LandingPage: { path: "/" },
    LoginPage: { path: "/dang-nhap/" },
    RegisterPage: { path: "/dang-ky/" },
    ViewPostPage: { path: "/danh-sach-viec-lam/" },
    PostDetailPage: {path: "/chi-tiet-viec-lam/"},
    HiringDetailPage: {path: "/chi-tiet-nha-tuyen-dung/"},
    NotFoundPage: {path: "/404-not-found/"},
    ServerError: {path: "/500-internal-server-error/"},
    AboutPage: {path: "/gioi-thieu/"},
    HiringDashboardPage: {path: "/nha-tuyen-dung/dashboard"},
    ApplicantDashboardPage: {path: "/ung-vien/dashboard"},
    QuanTriVienPage: {path: "/quan-tri-vien/"},
    ForbiddenPage: {path: "/403-forbidden/"},
}

export default Routes;