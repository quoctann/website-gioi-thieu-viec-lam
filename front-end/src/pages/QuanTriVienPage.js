import { connect } from "react-redux";
import { Redirect } from "react-router";
import { VAI_TRO } from "../utils/GlobalConstants"
import Routes from "../routes"
import { Card, Container, Row, Col, Form, Button, FloatingLabel, Alert, ListGroup, Image } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fakeTextGenerator } from "../utils/Placeholder";
import API, { endpoints, baseURL } from "../utils/API";

const QuanTriVienPage = (props) => {
    const user = props.store.userReducer;

    // Lấy danh sách nhà tuyển dụng đợi duyệt
    const [dsXetDuyet, setDsXetDuyet] = useState([]);
    const getDsXetDuyet = async () => {
        const res = await API.get(endpoints["nha-tuyen-dung-doi-xet-duyet"]);
        setDsXetDuyet(res.data)
    };

    // Cập nhật trạng thái nhà tuyển dụng được duyệt
    const duyetNhaTuyenDung = async (nhatuyendungId) => {
        console.log(nhatuyendungId)
        const res = await API.patch(endpoints["kich-hoat"](nhatuyendungId))
        // console.log(res.data)
        if (res.status === 200) {
            getDsXetDuyet();
            alert("Duyệt hồ sơ nhà tuyển dụng này thành công!");
        }    
        else alert("Lỗi!")
    };

    // Lấy thông tin thống kê
    const [thongKe, setThongKe] = useState({});
    const thongKeTheoQuy = async (quy, nam) => {
        const res = await API.get(endpoints['thong-ke-theo-quy'](quy, nam));
            setThongKe(res.data)
            console.log(res.data)
    };

    const thongKeTheoNam = async (nam) => {
        const res = await API.get(endpoints['thong-ke-theo-nam'](nam));
        setThongKe(res.data)
        console.log(res.data)
    };

    const [barData, setBardata] = useState({
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    });

    const [pieData, setPieData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: [65, 59, 80, 81, 56]
            }
        ]
    });

    useEffect(() => {
        getDsXetDuyet();
    }, [])

    // Chỉ có vai_tro quản lý mới xem được trang này
    if (user.nguoi_dung.vai_tro !== VAI_TRO.QUAN_LY)
        return <Redirect to={Routes.ForbiddenPage.path} />
    return (
        <>
            <Container>
                <Row className="my-5">
                    <Col md={8} sm={12}>
                        <Card className="p-4 mb-4" border="dark">
                            <Row className="my-2">
                                <Col>
                                    <h4 className="text-center">Tieu de bieu do</h4>
                                    <Bar className="my-2" data={barData} />
                                    <p className="text-justify">{fakeTextGenerator(1)}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="my-2">
                                <Col><Doughnut data={pieData} /></Col>
                                <Col>
                                    <h4 className="text-center">Tieu de bieu do</h4>
                                    <p className="text-justify">{fakeTextGenerator(1)}</p>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="p-4 mb-4" border="dark">
                            <Card.Title><h3 className="p-3 fw-bold">Tài khoản nhà tuyển dụng đợi duyệt</h3></Card.Title>
                            <Card.Body>
                                {dsXetDuyet.length > 0 ? dsXetDuyet.map((item, index) => (
                                    <Card className="p-3 mb-3 shadow">
                                        <Row>
                                            <Col sm={3}>
                                                <Image src={ baseURL + item.nguoi_dung.anh_dai_dien } fluid rounded />
                                            </Col>
                                            <Col sm={9}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>Email: {item.nguoi_dung.email}</ListGroup.Item>
                                                    <ListGroup.Item>Số điện thoại: {item.nguoi_dung.so_dien_thoai}</ListGroup.Item>
                                                    <ListGroup.Item>Tên công ty: {item.ten_cong_ty}</ListGroup.Item>
                                                    <ListGroup.Item>Địa chỉ: {item.dia_chi}</ListGroup.Item>
                                                    <ListGroup.Item>Quy mô: {item.quy_mo} nhân viên</ListGroup.Item>
                                                    <ListGroup.Item>Giới thiệu: {item.gioi_thieu}</ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Button 
                                            variant="success" 
                                            className="my-2"
                                            type="button"
                                            onClick={() => duyetNhaTuyenDung(item.nguoi_dung.id) }
                                        >Duyệt nhà tuyển dụng này</Button>
                                    </Card>
                                )) : (
                                    <Alert variant="secondary">Không có nhà tuyển dụng đợi duyệt</Alert>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12}>
                        <Card className="p-4 mb-4" border="dark">
                            <h4 className="text-center fw-bold">Bảng điều khiển</h4>
                            <Card className="p-2 mb-3 shadow">
                                {/* Lọc ứng viên nộp đơn theo ngành nghề theo quý hoặc năm */}
                                <p>Thống kê ứng viên nộp đơn theo ngành nghề (hàng quý)</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Quý">
                                            <Form.Select>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Năm">
                                            <Form.Select>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className="mt-2">Lọc kết quả</Button>
                                </Form>
                            </Card>

                            <Card className="p-2 mb-3 shadow">
                                {/* Lọc ứng viên nộp đơn theo ngành nghề theo quý hoặc năm */}
                                <p>Thống kê ứng viên nộp đơn theo ngành nghề (hàng năm)</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Năm">
                                            <Form.Select>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className="mt-2">Lọc kết quả</Button>
                                </Form>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default connect(
    (state) => {
        return {
            store: state
        }
    }
)(QuanTriVienPage);