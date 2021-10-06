import {
    faBriefcase,
	faBuilding,
	faCalendar,
    faCalendarTimes,
    faCheckDouble,
    faCogs,
    faCommentDollar,
    faGraduationCap,
    faMapMarkerAlt,
    faMedal,
    faStar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import API, { endpoints } from "../utils/API";
import { TRANG_THAI_UNG_TUYEN, VAI_TRO } from "../utils/GlobalConstants";
import Routes from "../routes";
import { viewHiringPage } from "../redux/actions"

const PostDetailPage = (props) => {
	// Đối tượng của react router lưu thông tin param
	const params = new URLSearchParams(useLocation().search);
    // Lấy id tin tuyển dụng (id việc làm) từ query param 
	const postId = params.get("id");
    // Biến lưu giá trị của một tin tuyển dụng
	const [post, setPost] = useState();
    // Lấy thông tin chi tiết của một tin tuyển dụng (từ bảng việc làm)
	const getPostDetail = async (id = postId) => {
		try {
			const res = await API.get(endpoints["viec-lam-chi-tiet"](id));
			setPost(res.data);
			// console.log(typeof res.data, res.data);
		} catch (err) {
			console.log(err);
		}
	};

    // Đổi định dạng yyyy/mm/dd thành dd/mm/yyyy (dùng momentjs tiện hơn)
    const formatDate = (date) => {
        /* Sử dụng regex:
            \d : lấy giá trị là digit 0-9
            /c/g : tìm global ký tự c
            n+ : với n là bất kỳ, lấy nguyên chuỗi nếu thỏa đk, kết hợp với /n+/g
        */
		let datePart = date.match(/\d+/g),
			year = datePart[0],
			month = datePart[1],
			day = datePart[2];

		return day + "/" + month + "/" + year;
	};

    // Render ra các yêu cầu ngành nghề bằng cấp này kia cho đỡ lặp code phức tạp
    const infoDetail = (item) => {
        return (
            <div className="text-center">
                <p><FontAwesomeIcon icon={item.icon} /> {item.title}</p>
                {(item.arr).length > 0 
                ?   (item.arr).map(i => {
                        return <Badge pill className="m-1 p-1" bg={item.bg}>{i.ten}</Badge>
                    })
                :   <span className="text-muted">Không có yêu cầu</span>
                }
            </div>
        );
    }

    // Lấy từ redux thông tin ứng viên (người dùng) hiện tại đang sử dụng web
    const user = props.store.userReducer;

    // Gọi khi nút Nộp đơn ứng tuyển được nhấn
    const applyOffer = (jobId = postId, userId = 0) => {
        // Kiểm tra trạng thái đăng nhập có hợp lệ hay không
        if (!user.hasOwnProperty("nguoi_dung")) {
            alert("Bạn cần đăng nhập tài khoản Ứng viên để thực hiện nộp đơn ứng tuyển!");
            return;
        } else if (user.nguoi_dung.vai_tro === VAI_TRO.TUYEN_DUNG) {
            alert("Nhà tuyển dụng không được thực hiện thao tác này!")
            return;
        } else if (user.nguoi_dung.vai_tro === VAI_TRO.QUAN_LY) {
            alert("Quản lý không được thực hiện thao tác này!")
            return;
        }

        userId = user.nguoi_dung.id
        
        // Nếu hợp lệ thì tiến hành request tạo dữ liệu dưới csdl
        const apply = async () => {
            try {
                const create = await API.post(endpoints["ung-tuyen"], {
                    viec_lam: jobId,
                    ung_vien: userId,
                    trang_thai_ho_so: TRANG_THAI_UNG_TUYEN.CHO_XU_LY,
                    ung_vien_nop_don: true,
                    nguoi_yeu_cau: VAI_TRO.UNG_VIEN,
                })
                // Nếu tạo bản ghi dưới csdl thành công
                if (create.status === 201)
                    alert("Nộp đơn ứng tuyển thành công!");
                else if (create.status === 200) {
                    alert("Xác nhận đã nhận công việc thành công!");
                    props.history.push(Routes.ApplicantDashboardPage.path);
                } else if (create.status === 409)
                    alert("Bạn đã nộp đơn ứng tuyển công việc này trước đó rồi, hoặc công việc đã được gửi đến bạn!")
                    
            } catch (ex) {
                // console.log(ex.response.status)
                if (ex.response.status === 409)
                    alert("Bạn đã nộp đơn ứng tuyển công việc này trước đó rồi, hoặc công việc đã được gửi đến bạn!")
            } 
		};
        
        apply()
    }

	useEffect(() => {
		getPostDetail();
	}, []);

    // Nếu như lấy được chi tiết tin tuyển dụng thành công thì render nội dung, chưa lấy được thì render spinner xoay xoay
	if (post)
		return (
			<>
				<Container>
					<Row className="my-5">
						<Col sm={12} md={8} className="mb-2">
							<Card className="p-4" border="dark">
								<Card.Title>
									<h2 className="fw-bold">{post.tieu_de}</h2>
								</Card.Title>
								<Card.Subtitle>
                                    <Row as="h5" className="fw-bold">
                                        <Col sm={1}><FontAwesomeIcon icon={faBuilding} /></Col>
                                        <Col>
                                            <span style={{cursor: "pointer"}} onClick={() => {
                                                props.emit(post.nha_tuyen_dung.nguoi_dung.id);
                                                props.history.push(Routes.HiringDetailPage.path)
                                            }}>{post.nha_tuyen_dung.ten_cong_ty}</span>
                                        </Col>
                                    </Row>
                                    <Row as="h5" className=" fw-bold">
                                        <Col sm={1}><FontAwesomeIcon icon={faCommentDollar}/></Col>
                                        <Col>
                                            Mức lương:{" "}
                                            <span className="text-danger">
                                                {post.luong === 0
                                                    ? "Thương lượng"
                                                    : new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                    ).format(post.luong)}
                                            </span>
                                        </Col>
                                    </Row>
								</Card.Subtitle>
								<hr />
								<Card.Body>
                                    <Card.Text className="text-justify">{post.noi_dung}</Card.Text>
                                </Card.Body>
                                <hr />
                                <Button onClick={() => applyOffer()} variant="success">Nộp đơn ứng tuyển</Button>
                                {/* <u style={{cursor: "pointer"}} className="text-primary text-center mt-1">Báo cáo vi phạm</u> */}
                            </Card>
						</Col>
						<Col sm={12} md={4} className="mb-2">
							<Card className="p-4" border="dark">
								<Card.Body>
									<Row as="p">
										<Col sm={1}><FontAwesomeIcon icon={faCalendar} /></Col>
										<Col>Ngày đăng: {formatDate(post.ngay_tao)}</Col>
									</Row>
									<Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faCalendarTimes} /></Col>
                                        <Col>Ngày hết hạn: {formatDate(post.ngay_het_han)}</Col>
                                    </Row>
									<Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faMapMarkerAlt} /></Col>
                                        <Col>Địa chỉ: {post.nha_tuyen_dung.dia_chi}</Col>
                                    </Row>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faUsers} /></Col>
                                        <Col>Quy mô công ty: {post.nha_tuyen_dung.quy_mo} nhân viên</Col>
                                    </Row>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faStar} /></Col>
                                        <Col>Điểm đánh giá công ty: {post.nha_tuyen_dung.diem_danh_gia_tb}</Col> 
                                    </Row>
									<hr />
                                    {infoDetail({
                                        icon: faCheckDouble,
                                        title: "Phúc lợi",
                                        arr: post.phuc_loi,
                                        bg: "primary"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faGraduationCap,
                                        title: "Bằng cấp",
                                        arr: post.bang_cap,
                                        bg: "danger"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faBriefcase,
                                        title: "Ngành nghề",
                                        arr: post.nganh_nghe,
                                        bg: "info"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faMedal,
                                        title: "Kinh nghiệm",
                                        arr: post.kinh_nghiem,
                                        bg: "warning"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faCogs,
                                        title: "Kỹ năng",
                                        arr: post.ky_nang,
                                        bg: "secondary"
                                    })}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	else return <LoadingOverlay />;
};

export default connect(
    (state) => {
        return {
            store: state
        }
    },
    (dispatch) => {
        return {
            emit: (nhatuyendungId) => dispatch(viewHiringPage(nhatuyendungId))
        }
    }
)(PostDetailPage);
