import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { xemChiTietUngVien } from "../redux/actions";
import API, { endpoints } from "../utils/API";
import  LoadingOverlay from "../components/LoadingOverlay"
import Routes from "../routes";
import { Card, Container, Row, Col, Badge, Button, Image, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCogs, faDownload, faGraduationCap, faMedal } from "@fortawesome/free-solid-svg-icons";
import { TRANG_THAI_UNG_TUYEN, VAI_TRO } from "../utils/GlobalConstants"

const UngVienChiTietPage = (props) => {
    const nguoidung = props.store.userReducer;
	// Lấy id ứng viên & id việc làm từ trang nhà tuyển dụng dispatch ra
	const ungvienId = props.store.commonReducer.ungvienId;
    const vieclamId = props.store.commonReducer.vieclamId;
    const tenViecLam = props.store.commonReducer.tenViecLam;
    
	// Lấy thông tin chi tiết một ứng viên
    const [ungvien, setUngvien] = useState({})
	const getChiTietUngVien = async () => {
		const res = await API.get(endpoints["ung-vien-chi-tiet"](ungvienId));
        setUngvien(res.data);
		console.log(res.data);
	};

    // Lấy thông tin việc làm của nhà tuyển dụng hiện tại (gửi yêu cầu công việc cho ứng viên)
    const [danhSachViecLam, setDanhSachViecLam] = useState([])
    const getViecLam = async () => {
        const res = await API.get(endpoints["nha-tuyen-dung-viec-lam"](nguoidung.nguoi_dung.id))
        setDanhSachViecLam(res.data)
        // console.log(res.data)
    }

    // Ô select để gửi việc làm cho ứng viên (xem trang ứng viên từ bộ lọc)
    const [selectGuiViecLam, setSelectGuiViecLam] = useState(0)

    // Render icon ngành nghề này kia gọn hơn
    const infoDetail = (item) => {
        return (
            <div className="text-center">
                <p><FontAwesomeIcon icon={item.icon} /> {item.title}</p>
                {(item.arr).length > 0 
                ?   (item.arr).map(i => {
                        return <Badge pill className="m-1 p-1" bg={item.bg}>{i.ten}</Badge>
                    })
                :   <span className="text-muted">Không có bản ghi</span>
                }
            </div>
        );
    }

    // Gọi khi nút chấp nhận hồ sơ hoặc gửi đề nghị việc làm được nhấn, ghi dữ liệu vào bảng ứng tuyển
    const ungTuyen = async (trangThaiHoSo = TRANG_THAI_UNG_TUYEN.DUOC_CHAP_NHAN, viecLamId = vieclamId, ungVienNopDon = true) => {
        try {
            // Nếu như nhà tuyển dụng đang xem từ bộ lọc (không phải từ thông báo)
            if (viecLamId === 0) {
                viecLamId = selectGuiViecLam;
                trangThaiHoSo = TRANG_THAI_UNG_TUYEN.CHO_XU_LY;
                ungVienNopDon = false;
            }

            // Tiến hàng gọi server ghi dữ liệu
            const create = await API.post(endpoints["ung-tuyen"], {
                viec_lam: viecLamId,
                ung_vien: ungvienId,
                trang_thai_ho_so: trangThaiHoSo,
                ung_vien_nop_don: ungVienNopDon,
                nguoi_yeu_cau: VAI_TRO.TUYEN_DUNG
            })

            // Nếu cập nhật bản ghi dưới csdl thành công
            if (create.status === 200) {
                alert("Cập nhật trạng thái thành công!");
                props.history.push(Routes.HiringDashboardPage.path)
            } else if (create.status === 201) {
                alert("Gửi đề nghị việc làm thành công!")
            } else if (create.status === 409)
                alert("Ứng viên đã ứng tuyển công việc này rồi, xem thông báo để cập nhật hồ sơ")
                
        } catch (ex) {
            // console.log(ex.response.status)
            if (ex.response.status === 409)
                alert("Ứng viên đã ứng tuyển công việc này rồi, xem thông báo để cập nhật hồ sơ")
        } 
    }

	useEffect(() => {
        // Test xem có fix được memory leak error không
        const ac = new AbortController();
        // Nếu vl id = 0 nghĩa là ntd vào trang chi tiết uv bằng bộ lọc
        if (vieclamId === 0)
            getViecLam()
		getChiTietUngVien();
        return () => ac.abort();
	}, []);

    // Chỉ có người dùng vai trò nhà tuyển dụng mới vào được trang này, ko phải thì về trang 403
    if (nguoidung.nguoi_dung.vai_tro !== VAI_TRO.TUYEN_DUNG)
        return <Redirect to={Routes.ForbiddenPage.path} />

    // Nếu truy cập trang khi mà ứng viên id = 0 trả về trang 404
	if (ungvienId === 0) return <Redirect to={Routes.NotFoundPage.path} />;
    
    // Lấy được đầy đủ thông tin ứng viên
    if (ungvien.hasOwnProperty("gioi_thieu"))
        return (
            <>
                <Container>
                    <Row className="my-5">
                        <Col md={8} sm={12}>
                            <Card border="dark" className="p-4">
                                <Card.Title><h2 className="fw-bold p-4">Thông tin chi tiết ứng viên</h2></Card.Title>
                                <Card.Body className="text-justify">
                                    <Row>
                                        <Col sm={4}>
                                            <Image src={ungvien.nguoi_dung.anh_dai_dien} rounded fluid />
                                        </Col>
                                        <Col sm={8}>
                                            <p>Tên ứng viên: {ungvien.nguoi_dung.last_name} {ungvien.nguoi_dung.first_name}</p>
                                            <p>Ngày sinh: {ungvien.nguoi_dung.ngay_sinh}</p>
                                            <p>Email: {ungvien.nguoi_dung.email}</p>
                                            <p>CV: <a href={ungvien.cv}><FontAwesomeIcon className="fa-link me-1" icon={faDownload} />Tải về</a></p>
                                            <p>Giới thiệu: {ungvien.gioi_thieu}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>
                                            <hr/>
                                            {infoDetail({
                                                icon: faGraduationCap,
                                                title: "Bằng cấp",
                                                arr: ungvien.bang_cap,
                                                bg: "danger"
                                            })}
                                            <hr />
                                            {infoDetail({
                                                icon: faBriefcase,
                                                title: "Ngành nghề",
                                                arr: ungvien.nganh_nghe,
                                                bg: "info"
                                            })}
                                            <hr />
                                            {infoDetail({
                                                icon: faMedal,
                                                title: "Kinh nghiệm",
                                                arr: ungvien.kinh_nghiem,
                                                bg: "warning"
                                            })}
                                            <hr />
                                            {infoDetail({
                                                icon: faCogs,
                                                title: "Kỹ năng",
                                                arr: ungvien.ky_nang,
                                                bg: "secondary"
                                            })}
                                        </p>
                                    </Row>
                                    
                                </Card.Body>
                            </Card> 
                        </Col>
                        <Col md={4} sm={12}>
                            <Card border="dark" className="p-4">
                                <h4 className="text-center mb-3 fw-bold">Bảng điều khiển</h4>
                                {vieclamId === 0 ? (
                                    <>  
                                        <p>Gửi đề nghị công việc cho ứng viên này</p>
                                        <Form.Select 
                                            className="mb-3"
                                            value={selectGuiViecLam} 
                                            onChange={(event) => setSelectGuiViecLam(event.target.value)}
                                        >
                                            {danhSachViecLam.map((vieclam, index) => (
                                                <option value={vieclam.id}>{vieclam.tieu_de}</option>
                                            ))}
                                        </Form.Select>
                                        <Button 
                                            className="mb-3"
                                            onClick={() => ungTuyen()}
                                        >Gửi đề nghị việc làm</Button>
                                    </>
                                ) : (
                                    <>  
                                        <p>Bạn có chấp nhận ứng viên này vào vị trí <span className="text-primary fw-bold">{tenViecLam}</span> không?</p>
                                        <Button 
                                            variant="success mb-3"
                                            onClick={() => ungTuyen()}
                                        >Chấp nhận hồ sơ ứng viên này</Button>
                                        <Button 
                                            variant="danger"
                                            onClick={() => ungTuyen(TRANG_THAI_UNG_TUYEN.BI_TU_CHOI)}
                                        >Từ chối hồ sơ này</Button>
                                    </>
                                )}
                                
                            </Card>
                        </Col>
                    </Row>
                    
                </Container>
            </>
        );
    else return <LoadingOverlay />
};

export default connect(
	(state) => {
		return {
			store: state,
		};
	},
	(dispatch) => {
		return {
			emit: (ungvienId) => dispatch(xemChiTietUngVien(ungvienId)),
		};
	}
)(UngVienChiTietPage);
