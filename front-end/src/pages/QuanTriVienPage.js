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
        // console.log(nhatuyendungId)
        const res = await API.patch(endpoints["kich-hoat"](nhatuyendungId), {
            quanLyId: user.nguoi_dung.id
        })
        // console.log(res.data)
        if (res.status === 200) {
            getDsXetDuyet();
            alert("Duyệt hồ sơ nhà tuyển dụng này thành công!");
        }    
        else alert("Lỗi!")
    };

    // Xử lý ô select chọn dữ liệu lọc
    const [quyThongKe, setQuyThongKe] = useState(0)
    const [namThongKe, setNamThongKe] = useState(2018)
    const xuLySelect = (event) => {
        if (event.target.name === "nam") {
            setNamThongKe(event.target.value);
            setQuyThongKe(0)
        }
        if (event.target.name === "quy") {
            setQuyThongKe(event.target.value);
        }           
    };
    // Nếu server trả tra dữ liệu hợp lệ thì set = true
    const [coDuLieu, setCoDuLieu] = useState(false);
    // Lưu dữ liệu thô trả ra từ server để hiển thị tính toán
    const [duLieuTho, setDuLieuTho] = useState({})
    // Cấu trúc data đổ vào của chartjs-2
    const [duLieuThongKe, setDuLieuThongKe] = useState({
		labels: [],
		datasets: [
			{
				backgroundColor: ["#F5BFD2", "#E5DB9C", "#D0BCAC", "#BEB4C5", "#E6A57E", "#698396", "#A9C8C0", "#DBBC8E", "#AE8A8C", "#7C98AB"],
				data: [],
			},
		]
	});
    // Lấy dữ liệu thống kê từ server
    const thongKe = async () => {
        const res = await API.get(endpoints['thong-ke'](quyThongKe, namThongKe));
        // Kiểm tra xem res (array) trả về có giá trị không (tổng các value lớn hơn 0)
        if (Object.values(res.data).reduce((a, b) => a + b, 0) === 0) {
            setCoDuLieu(false);
        }
        else {
            setDuLieuTho(res.data)
            setDuLieuThongKe({
                ...duLieuThongKe,
                labels: Object.keys(res.data),
                datasets: [{
                    ...duLieuThongKe.datasets[0],
                    ...duLieuThongKe.datasets[1],
                    data: Object.values(res.data)
                }]
            })
            setCoDuLieu(true)
        }
    };

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
                                    <h3 className="text-center fw-bold my-4">Thống kê số lượng ứng viên ứng tuyển theo ngành nghề</h3>
                                    {coDuLieu ? (
                                        <>
                                            <Bar 
                                                className="my-2" 
                                                data={duLieuThongKe} 
                                                options={{
                                                    plugins: {
                                                        legend: {
                                                            display: false
                                                        }
                                                    }
                                                }}
                                            />
                                            <p className="text-justify">{fakeTextGenerator(1)}</p>
                                        </>
                                    ) : (
                                        <Alert variant="secondary">Không có dữ liệu</Alert>
                                    )}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="my-2">
                                {coDuLieu ? (
                                    <>
                                        <Col><Doughnut data={duLieuThongKe} /></Col>
                                        <Col>
                                            <h3 className="text-center">Thống kê dữ liệu</h3>
                                            <p className="text-justify">{fakeTextGenerator(1)}</p>
                                        </Col>
                                    </>
                                ) : (
                                    <Col><Alert variant="secondary">Không có dữ liệu</Alert></Col>
                                )}                               
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
                            <h3 className="text-center fw-bold">Bảng điều khiển</h3>
                            <Card className="p-2 mb-3 shadow">
                                {/* Lọc ứng viên nộp đơn theo ngành nghề theo quý hoặc năm */}
                                <p>Thống kê ứng viên nộp đơn theo ngành nghề (hàng quý)</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Quý">
                                            <Form.Select onChange={(e) => xuLySelect(e)} name="quy">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Năm">
                                            <Form.Select onChange={(e) => xuLySelect(e)} name="nam">
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className="mt-2" onClick={thongKe}>Lọc kết quả</Button>
                                </Form>
                            </Card>

                            <Card className="p-2 mb-3 shadow">
                                {/* Lọc ứng viên nộp đơn theo ngành nghề theo quý hoặc năm */}
                                <p>Thống kê ứng viên nộp đơn theo ngành nghề (hàng năm)</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel label="Năm">
                                            <Form.Select 
                                                onChange={(e) => xuLySelect(e)} 
                                                name="nam"
                                            >
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className="mt-2" onClick={thongKe}>Lọc kết quả</Button>
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