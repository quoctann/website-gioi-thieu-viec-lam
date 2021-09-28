import { Card, Container, ListGroup } from "react-bootstrap";

const GioiThieuPage = () => {
    return (
        <>
            <Container>
                <Card border="dark" className="shadow p-4 my-5">
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
                            <li>Tên đề tài: Website Giới thiệu việc làm</li>
                            <li>Tên đề tài: Website Giới thiệu việc làm</li>
                            <li>Tên đề tài: Website Giới thiệu việc làm</li>
                            <li>Tên đề tài: Website Giới thiệu việc làm</li>
                            <li>Tên đề tài: Website Giới thiệu việc làm</li>
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default GioiThieuPage;