import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar, faUsers} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons"
import Rating from "react-rating";
import API, { endpoints } from "../utils/API";
import LoadingOverlay from "../components/LoadingOverlay";
import Routes from "../routes";
import { VAI_TRO } from "../utils/GlobalConstants";
import { xemChiTietUngVien } from "../redux/actions"
// import PaginationBar from "../components/PaginationBar"

const HiringDetailPage = (props) => {
    // Thông tin người dùng đang đăng nhập hiện tại
    const nguoidung = props.store.userReducer;
    // Lấy thông tin chi tiết của nhà tuyển dụng (bảng nha_tuyen_dung)
    const [detail, setDetail] = useState({})
    // Các bài đánh giá của nhà tuyển dụng
    const [ratings, setRatings] = useState([])
    // Id của trang nhà tuyển dụng đang xem
    const hiringid = props.store.commonReducer.hiringId;

    // Phương thức lấy dữ liệu các bài đánh giá theo id nhà tuyển dụng
    const getRating = async(hiringId = hiringid, page = 1) => {
        const rating = await API.get(endpoints["nha-tuyen-dung-danh-gia"](hiringId) + `?page=${page}`)
        // console.log(rating.data)
        // setCount(rating.data.count);
        // setNext(rating.data.next);
        // setPrevious(rating.data.previous);
        setRatings(rating.data)
    };

    // Phương thức lấy thông tin chi tiết nhà tuyển dụng
    const getDetail = async () => {
        const detail = await API.get(endpoints["nha-tuyen-dung-chi-tiet"](props.store.commonReducer.hiringId))
        // console.log(detail.data)
        setDetail(detail.data)
    };

    // Lấy các việc làm dựa của nhà tuyển dụng này (gợi ý)
	const [goiYViecLam, setgoiYViecLam] = useState([])
	const getGoiYViecLam = async () => {
		const res = await API.get(endpoints["nha-tuyen-dung-viec-lam"](hiringid));
		setgoiYViecLam(res.data)
	}
    const [diemDanhGia, setDiemDanhGia] = useState(5)

    // Lấy bài đánh giá của ứng viên đang đăng nhập ở trang công việc hiện tại
    const [danhGiaCuaUngVien, setDanhGiaCuaUngVien] = useState({})
    const getUngVienDanhGia = async () => {
        const res = await API.get(endpoints['ung-vien-danh-gia'](nguoidung.nguoi_dung.id, hiringid, ))
        setDanhGiaCuaUngVien(res.data)
        setDiemDanhGia(res.data.diem_danh_gia)
    }

    // Format tiền lương ra định dạng VNĐ đẹp hơn
	const currency = (number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
	}

    useEffect(() => {
        getDetail();
        getRating(); 
        getGoiYViecLam();
        getUngVienDanhGia();
    }, [])

    // Nếu như lấy thành công thông tin chi tiết nhà tuyển dụng
    if (detail.hasOwnProperty('ten_cong_ty'))
        return (
            <>
                <Container>
                    <Row className="my-5">
                        <Col sm={12} md={8} className="mb-2">
                            <Card className="p-4 mb-4" border="dark">
                                <Card.Title>
                                    <Row className="d-flex align-items-center">
                                        <Col sm={2}><h2><Image src={detail.nguoi_dung.anh_dai_dien} rounded fluid /></h2></Col>
                                        <Col sm={10}><h2 className="fw-bold">{detail.ten_cong_ty}</h2></Col>
                                    </Row>
                                </Card.Title>
                                <hr />
                                <Card.Body>
                                    <Card.Text className="text-justify">{detail.gioi_thieu}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="p-2 mb-4" border="dark">
                                <Card.Body>
                                    <h3 className="my-4 fw-bold">
                                        Điểm đánh giá trung bình:  
                                        <span className="text-warning mx-1">{detail.diem_danh_gia_tb}</span>
                                        <FontAwesomeIcon icon={faStar} className="fa-warning" />
                                    </h3>
                                    {/* 
                                    diem_danh_gia: 5
                                    id: 1
                                    ngay_tao: "2021-09-25"
                                    nha_tuyen_dung: {,…}
                                    noi_dung: "Việc làm tuyệt vời"
                                    ung_vien: {nguoi_dung: {id: 2, username: "uv", email: "uv@mail.com", first_name: "Tấn", last_name: "Trần",…},…}
                                    viec_lam: {id: 1, phuc_loi: [{id: 1, ten: "Bảo hiểm y tế"}, {id: 3, ten: "Teambuilding"}],…}
                                    */}
                                    {nguoidung.nguoi_dung.vai_tro === VAI_TRO.UNG_VIEN ? (
                                        <>  
                                            <h5 className="fw-bold">Đánh giá của bạn</h5>
                                            {danhGiaCuaUngVien.length > 0 ? danhGiaCuaUngVien.map((item, index) =>(
                                                <Card className="p-3 mb-3">
                                                    <Rating
                                                        emptySymbol={<FontAwesomeIcon className="fa-warning" icon={faStarReg} />}
                                                        fullSymbol={<FontAwesomeIcon className="fa-warning" icon={faStar} />}
                                                        initialRating={item.diem_danh_gia}
                                                        className="fs-5"
                                                        readonly
                                                    />
                                                    <small className="text-secondary mb-3">Đã ứng tuyển cho vị trí: {item.viec_lam.tieu_de}</small>
                                                    <p>{item.noi_dung}</p>
                                                </Card>
                                            )) : (
                                                "bạn chưa đánh giá"
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <h5 className="fw-bold mt-4">Đánh giá ứng viên khác</h5>
                                    {ratings.length > 0 
                                    ? ratings.map((rating, index) => {
                                        return ( 
                                            <Card className="p-3 mb-3">
                                                <Row>
                                                    <Col sm={3} className="fw-bold">
                                                        <span className="text-primary" style={{cursor: "pointer"}} onClick={() => {
                                                            props.emit(rating.ung_vien.nguoi_dung.id, 0, "")
                                                            props.history.push(Routes.UngVienChiTietPage.path)
                                                        }}>
                                                            {rating.ung_vien.nguoi_dung.last_name} {rating.ung_vien.nguoi_dung.first_name}
                                                        </span>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <span>Đánh giá: </span>
                                                        <Rating
                                                            emptySymbol={<FontAwesomeIcon className="fa-warning" icon={faStarReg} />}
                                                            fullSymbol={<FontAwesomeIcon className="fa-warning" icon={faStar} />}
                                                            initialRating={rating.diem_danh_gia}
                                                            readonly
                                                        />
                                                    </Col>
                                                    <p className="small text-secondary">Đã ứng tuyển cho vị trí: {rating.viec_lam.tieu_de}</p>
                                                </Row>
                                                <p className="text-justify">{rating.noi_dung}</p>
                                            </Card>
                                        )
                                    })
                                    : (
                                        <Alert variant="secondary">Chưa có đánh giá</Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={4} className="mb-2">
                            <Card className="p-4 mb-3" border="dark">
                                <Card.Body>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faMapMarkerAlt} /></Col>
                                        <Col>Địa chỉ: {detail.dia_chi}</Col>
                                    </Row>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faUsers} /></Col>
                                        <Col>Quy mô công ty: {detail.quy_mo} nhân viên</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            
                            <Card className="p-4" border="dark">
                                <h3 className="fw-bold">Việc làm từ nhà tuyển dụng này</h3>
                                    {goiYViecLam.length > 0 ? goiYViecLam.map((vieclam, index) => (
                                        <Card className="p-2 my-2 shadow">
                                        <p className="fw-bold mb-1">{goiYViecLam[index].tieu_de}</p>
                                        <p className="fw-bold mb-1 text-danger">Lương:{" "}
                                            {goiYViecLam[index].luong === 0 ? "Thương lượng" : currency(goiYViecLam[index].luong)}
                                        </p>
                                        <hr />
                                        <p>{goiYViecLam[index].noi_dung.substr(0, 80)}...</p>
                                        <Button 
                                            className="me-1"
                                            onClick={() =>props.history.push(Routes.PostDetailPage.path + "?id=" + goiYViecLam[index].id)}
                                        >Xem chi tiết</Button>
                                    </Card>
                                    )) : (
                                        <Alert variant="secondary">Không có bản ghi</Alert>
                                    )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    else
        return (
            <LoadingOverlay />
        )
}

export default connect(
    (state) => {
        return {
            store: state
        }
    },
    (dispatch) => {
        return {
            emit: (ungvienId, vieclamId, tenViecLam) => dispatch(xemChiTietUngVien(ungvienId, vieclamId, tenViecLam))
        }
    }
)(HiringDetailPage);