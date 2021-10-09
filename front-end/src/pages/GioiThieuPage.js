import { Card, Container, Image } from "react-bootstrap";
import usecase from "../assets/images/usecase.jpg";
import erd from "../assets/images/erd.jpg";

const GioiThieuPage = () => {
    return (
        <>
            <Container>
                <Card border="dark" className="shadow p-5 my-5">
                    <Card.Title>
                    <h2 className="text-center fw-bold">Đồ án ngành Công nghệ thông tin, Đại học Mở TP. HCM Khóa 2018</h2>
                    </Card.Title>
                    <hr />
                    <Card.Body>
                        <p>Tên đề tài: Website Giới thiệu việc làm</p>
                        <p>Năm thực hiện: 2021</p>
                        <p>Sinh viên thực hiện: Trần Quốc Tấn <a className="text-link" href="mailto:1851050127tan@ou.edu.vn">1851050127tan@ou.edu.vn</a></p>
                        <p>Giảng viên hướng dẫn: Ths. Hồ Quang Khải</p>
                        <hr />
                        <p>Mô tả vắn tắt chức năng của đồ án:</p>
                        <ul>
                            <li>Đăng nhập (người dùng website gồm: Quản trị viên, Nhà tuyển dụng, Ứng viên).</li>
                            <li>Đăng ký trở thành Nhà tuyển dụng hoặc Ứng viên. Riêng đối với Nhà tuyển dụng cần có xác nhận của Quản trị viên trước khi được phép hoạt động.</li>
                            <li>Xem danh sách việc làm đang tuyển dụng.</li>
                            <li>Nhà tuyển dụng: cập nhật thông tin của họ, đăng tin tuyển dụng, tìm kiếm ứng viên theo nhiều tiêu chí, gửi việc làm cho ứng viên ứng tuyển.</li>
                            <li>Ứng viên: cập nhật thông tin cá nhân, đăng tải CV, nhận gợi ý Nhà tuyển dụng dựa trên những thông tin lĩnh vực mình đang làm việc, tìm kiếm nhà tuyển dụng, tìm kiếm việc theo nhiều tiêu chí, nộp đơn ứng tuyển đến nhà tuyển dụng.</li>
                            <li>Ứng viên được phép đánh giá về Nhà tuyển dụng.</li>
                            <li>Quản trị viên được xem thống kê, báo cáo.</li>
                        </ul>
                        <hr />
                        <p className="mb-3">Lược đồ Usecase của đồ án</p>
                        <Image src={usecase} fluid />
                        <hr />
                        <p className="mb-3">Lược đồ Cơ sở dữ liệu của đồ án</p>
                        <Image src={erd} fluid />
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default GioiThieuPage;