import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import API, { baseURL, endpoints } from "../utils/API"
import { VAI_TRO } from "../utils/GlobalConstants"
import { faAddressCard, faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import cookies from "react-cookies";
import Routes from "../routes"
import Select from 'react-select';
import moment from "moment";
import { login } from "../redux/actions";

const ApplicantDashboardPage = (props) => {
	// Người dùng lưu trong cookies được gắn lên redux, convert array để tương thích với react-select
    const [user, setUser] = useState({
		...props.store.userReducer,
		nganh_nghe: (props.store.userReducer.nganh_nghe).map(item => ({value: item.id, label: item.ten})),
		bang_cap: (props.store.userReducer.bang_cap).map(item => ({value: item.id, label: item.ten})),
		ky_nang: (props.store.userReducer.ky_nang).map(item => ({value: item.id, label: item.ten})),
		kinh_nghiem: (props.store.userReducer.kinh_nghiem).map(item => ({value: item.id, label: item.ten})),
	});

	// Các ô input chứa dữ liệu file, ngày tháng khác với thông thường
    const avatar = React.createRef();
    const cv = React.createRef();
    const [ngaySinh, setNgaySinh] = useState(new Date(user.ngay_sinh));

	// Onchange thông tin thuộc bảng ứng viên
	const thongTinUngVien = (event) => {
		event.persist();
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	}

	// Onchange thông tin thuộc bảng người dùng
	const thongTinNguoiDung = (event) => {
		event.persist();
		setUser({
			...user,
			nguoi_dung: {
				...user.nguoi_dung,
				[event.target.name]: event.target.value
			}
		})
	}
	
	// Tiến hàng gửi request lên server để cập nhật dữ liệu
	const capNhatThongTin = async () => {
		// console.log(user)
		const formData = new FormData()
		// Duyệt qua người dùng lưu trong redux đã chỉnh sửa (nếu có) xong gán vào form data 
		for (let u in user) {
			// console.log(u)
			if (u === "nguoi_dung") {
				for (let i in user.nguoi_dung) {
					// console.log(i)
					if (i !== "anh_dai_dien")
						formData.append(i, user.nguoi_dung[i]);
				}
			} 
			else if (u === "nganh_nghe" || u === "bang_cap" || u === "ky_nang" || u === "kinh_nghiem") {
				formData.append(u, JSON.stringify(user[u]));
			}
			else if (u !== "cv")
				formData.append(u, user[u]);
		}

		if (avatar.current.files[0])
			formData.append("anh_dai_dien", avatar.current.files[0]);
		
		if (cv.current.files[0])
			formData.append("cv", cv.current.files[0]);
		
		// for (var key of formData.keys()) {
		// 	if (key === "nganh_nghe")
		// 		console.log(formData.get(key).nganh_nghe)
		// 	console.log(key, formData.get(key));
		// }

		const capNhat = await API.put(endpoints["ung-vien-cap-nhat"], formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})

		if (capNhat.status === 200) {
			console.log(capNhat.status)
			cookies.save("user", capNhat.data)
			props.capNhatThanhCong(capNhat.data)
			alert("Cập nhật thông tin thành công!")
			window.location.reload()
		} else if (capNhat.status === 400) {
			alert("Thông tin không hợp lệ!")
		}
	}

    // Get thông tin có sẵn trên server các danh mục để lọc
    const [degrees, setDegrees] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [careers, setCareers] = useState([]);

    // Gửi request để lấy dữ liệu
    const getFilterCategory = async () => {
        const degreesRes = await API.get(endpoints["bang-cap"]);
        const skillsRes = await API.get(endpoints["ky-nang"]);
        const expRes = await API.get(endpoints["kinh-nghiem"]);
        const careersRes = await API.get(endpoints["nganh-nghe"]);
        setDegrees(degreesRes.data);
        setSkills(skillsRes.data);
        setExperiences(expRes.data);
        setCareers(careersRes.data);
    };

	// Lấy các gợi ý việc làm dựa trên ngành nghề
	const [suggestion, setSuggestion] = useState([])
	const getSuggestion = async () => {
		const res = await API.get(endpoints["viec-lam-goi-y"](user.nguoi_dung.id));
		setSuggestion(res.data)
	}

	// Lấy các việc làm được nhà tuyển dụng gửi đến
	const [offer, setOffer] = useState([])
	const getOffer = async () => {
		const res = await API.get(endpoints["de-xuat-viec-lam"](user.nguoi_dung.id))
		// console.log(res.data)
		setOffer(res.data)
	}

	// Bấm nút xem chi tiết công việc để đến trang chi tiết việc làm
	const denTrangChiTietViecLam = (postId) => {
		props.history.push(Routes.PostDetailPage.path + "?id=" + postId);
	};

	// Format tiền lương ra định dạng VNĐ đẹp hơn
	const currency = (number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
	}

	// Parse dữ liệu đổ ra ô multi select trong đăng tin tuyển dụng (tạm thời theo format của react-select)
	let options = {}
	let arr = []
	degrees.map(item => arr.push({value: item.id, label: item.ten}))
	options['degrees'] = arr;
	arr = []
	experiences.map(item => arr.push({value: item.id, label: item.ten}))
	options['experiences'] = arr;
	arr = []
	skills.map(item => arr.push({value: item.id, label: item.ten}))
	options['skills'] = arr;
	arr = []
	careers.map(item => arr.push({value: item.id, label: item.ten}))
	options['careers'] = arr;

	// Vừa nạp trang thì lấy danh mục, thông tin tuyển dụng, việc làm gợi ý
    useEffect(() => {
        getFilterCategory();
		getSuggestion();
		getOffer();
    }, []);

	// Chỉ người dùng đã đăng nhập mới xem được
    if (!cookies.load("user"))
        return <Redirect to={Routes.LoginPage.path} />
		
	// Nhưng đăng nhập với vai trò ứng viên hoặc khác thì trả về 404
    if (user.nguoi_dung.vai_tro !== VAI_TRO.UNG_VIEN)
        return <Redirect to={Routes.NotFoundPage.path} />

	// Trả về template chính
    return (
		<>
			<Container>
				<Row className="my-5">
					<Col md={8} sm={12}>
						<Row className="mb-4">
							<Col>
								<Card className="p-3" border="dark">
									<Card.Title>
										<h3 className="p-3 fw-bold">
											Thông tin chi tiết
										</h3>
									</Card.Title>
									<Card.Body>
										<div>Loại tài khoản: Ứng viên</div>
										<Form>
											<SimpleInput
												label="Tên của bạn"
												faIcon={faAddressCard}
												type="text"
												value={user.nguoi_dung.first_name}
												onChange={thongTinNguoiDung}
												name="first_name"
											/>

											<SimpleInput
												label="Họ của bạn"
												faIcon={faAddressCard}
												type="text"
												value={user.nguoi_dung.last_name}
												onChange={thongTinNguoiDung}
												name="last_name"
											/>

											<SimpleInput
												label="Email"
												faIcon={faEnvelope}
												type="email"
												value={user.nguoi_dung.email}
												onChange={thongTinNguoiDung}
												name="email"
											/>

											<SimpleInput
												label="Số điện thoại"
												faIcon={faPhone}
												type="text"
												value={user.nguoi_dung.so_dien_thoai}
												onChange={thongTinNguoiDung}
												name="so_dien_thoai"
											/>
											<Form.Group className="my-4" controlId="avatar" >
												<Form.Label>Ảnh đại diện</Form.Label>
												<Form.Control type="file" ref={avatar}/>
											</Form.Group>
											<SimpleInput
												label="Địa chỉ"
												faIcon={faMapMarkerAlt}
												type="text"
												value={user.dia_chi}
												onChange={thongTinUngVien}
												name="dia_chi"
											/>
											<Form.Group className="my-4">
												<Form.Label>Giới thiệu</Form.Label>
												<Form.Control
													as="textarea"
													name="gioi_thieu"
													value={user.gioi_thieu}
													onChange={thongTinUngVien}
												/>
											</Form.Group>
                                            <Form.Group>
                                                <Form.Label>Ngày sinh (Tháng - Ngày - Năm)</Form.Label>
                                                <DatePicker 
                                                    className="form-control"
                                                    selected={ngaySinh} 
                                                    onChange={(date) => {
														setNgaySinh(date)
														setUser({...user, ngay_sinh: moment(date).format("YYYY-MM-DD").toString()})
													}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="my-4" controlId="cv">
                                                <Form.Label>CV {user.cv ? <a href={user.cv}>Đã upload</a> : "(Chưa upload)"}</Form.Label>
                                                <Form.Control type="file" ref={cv} />
                                            </Form.Group>
                                            <Form.Group className="my-4">
                                                <Form.Label>Ngành nghề</Form.Label>
												<Select
													closeMenuOnSelect={false}
													isMulti
													name="nganh_nghe"
													options={options.careers}
													value={user.nganh_nghe}
													onChange={(e) => setUser({...user, nganh_nghe: e})}
												/>
                                            </Form.Group>
                                            <Form.Group className="my-4">
                                                <Form.Label>Kỹ năng</Form.Label>
                                                <Select
													closeMenuOnSelect={false}
													isMulti
													name="ky_nang"
													options={options.skills}
													value={user.ky_nang}
													onChange={(e) => setUser({...user, ky_nang: e})}
												/>
                                            </Form.Group>
                                            <Form.Group className="my-4">
                                                <Form.Label>Kinh nghiệm</Form.Label>
                                                <Select
													closeMenuOnSelect={false}
													isMulti
													name="kinh_nghiem"
													options={options.experiences}
													value={user.kinh_nghiem}
													onChange={(e) => setUser({...user, kinh_nghiem: e})}
												/>
                                            </Form.Group>
                                            <Form.Group className="my-4">
                                                <Form.Label>Bằng cấp</Form.Label>
                                                <Select
													closeMenuOnSelect={false}
													isMulti
													name="bang_cap"
													options={options.degrees}
													value={user.bang_cap}
													onChange={(e) => setUser({...user, bang_cap: e})}
												/>
                                            </Form.Group>
											<Button 
												variant="success"
												onClick={() => capNhatThongTin()}
											>Lưu những thay đổi</Button>
										</Form>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col>
								<Card className="p-3" border="dark">
									<Card.Title>
										<h3 className="p-3 fw-bold">Thông báo tuyển dụng</h3>
									</Card.Title>
									<Card.Body>
										{offer.length > 0 ? offer.map((item, index) => (
											<Card className="p-3 mb-3 shadow">
												<p className="text-justify">
													<span className="fw-bold text-primary">{item.viec_lam.nha_tuyen_dung.ten_cong_ty}</span>
													{" "}vừa gửi cho bạn một đề nghị việc làm ở vị trí{" "}
													<span className="fw-bold">{item.viec_lam.tieu_de}</span>
													{" "}với mức lương{" "}
													<span className="text-danger">
														{item.viec_lam.luong === 0 ? "Thương lượng" : currency(item.viec_lam.luong)}
													</span>
												</p>
												<Button 
													variant="primary me-2"
													onClick={() => denTrangChiTietViecLam(item.viec_lam.id)}
												>Xem việc làm</Button>
											</Card>
										)) : (
											<Alert variant="secondary">Chưa có yêu cầu việc làm gửi cho bạn</Alert>
										)}
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col md={4} sm={12}>
						<Row className="mb-4">
							<Col>
								<Card className="p-4" border="dark">
									<Card.Img className="shadow" variant="top" src={
										(user.nguoi_dung.anh_dai_dien).substr(0, 4) !== "http" ? (baseURL + user.nguoi_dung.anh_dai_dien) : user.nguoi_dung.anh_dai_dien
									} />
									<h4 className="mt-4 mb-2 text-center">
										{user.nguoi_dung.last_name}{" "}
										{user.nguoi_dung.first_name}
									</h4>
									<p className="mb-2 text-center">
										{user.nguoi_dung.email}
									</p>
									<p className="mb-2 text-center">
										{user.nguoi_dung.so_dien_thoai}
									</p>
								</Card>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col>
								<Card className="p-4" border="dark">
									<h3 className="fw-bold">Gợi ý công việc</h3>
									{suggestion.length > 0 ? suggestion.map((item, index) => (
										<Card className="p-2 my-2 shadow">
											<p className="fw-bold mb-1">{suggestion[index].tieu_de}</p>
											<p className="fw-bold mb-1 text-secondary">{suggestion[index].nha_tuyen_dung.ten_cong_ty}</p>
											<p className="fw-bold mb-1 text-danger">Lương:{" "}
												{suggestion[index].luong === 0 ? "Thương lượng" : currency(suggestion[index].luong)}
											</p>
											<hr />
											<p>{(suggestion[index].noi_dung).substr(0, 100)}...</p>
											<Button 
												className="me-1"
												onClick={() => denTrangChiTietViecLam(suggestion[index].id)}
											>Xem chi tiết</Button>
										</Card>
									)) : (
										<Alert variant="secondary">Không có gợi ý phù hợp</Alert>
									)}
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default connect(
    (state) => {
        return {
            store: state,
        };
    },
	(dispatch) => {
		return {
			capNhatThanhCong: (nguoidung) => dispatch(login(nguoidung))
		}
	}
)(ApplicantDashboardPage);