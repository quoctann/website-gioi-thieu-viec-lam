import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import API, { baseURL, endpoints } from "../utils/API";
import { VAI_TRO } from "../utils/GlobalConstants";
import { faAddressCard, faBriefcase, faBuilding, faClock, faCogs, faEnvelope, faGraduationCap, faHandHoldingUsd, faHeading, faKey, faMapMarkerAlt, faMedal, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import cookies from "react-cookies";
import Routes from "../routes";
import { xemChiTietUngVien, login } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import "moment-timezone";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginationBar from "../components/PaginationBar";
import moment from "moment";

const HiringDashboardPage = (props) => {
	// Lấy thông tin nhà tuyển dụng (người dùng) đang đăng nhập sử dụng web
    const [user, setUser] = useState(props.store.userReducer);
	// Đổ ra giao diện để xử lý chức năng cập nhật
	const thongTinNhaTuyenDung = (event) => {
		event.persist();
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	};

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

	// Phương thức cập nhật thông tin cá nhân nhà tuyển dụng
    const capNhatThongTin = async () => {
		// console.log(user)
		const formData = new FormData();
		// Duyệt qua người dùng lưu trong redux đã chỉnh sửa (nếu có) xong gán vào form data 
		for (let u in user) {
			if (u === "nguoi_dung")
				for (let i in user.nguoi_dung)
					if (i !==  "anh_dai_dien")
						formData.append(i, user.nguoi_dung[i]);
			else
				formData.append(u, user[u]);
		}

		if (avatar.current.files[0])
			formData.append("anh_dai_dien", avatar.current.files[0]);
		
		const capNhat = await API.put(endpoints["nha-tuyen-dung"], formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})

		if (capNhat.status === 200) {
			console.log(capNhat.data)
			cookies.save("user", capNhat.data)
			props.capNhatThanhCong(capNhat.data)
			alert("Cập nhật thông tin thành công!")
			window.location.reload()
		} else if (capNhat.status === 400) {
			alert("Thông tin không hợp lệ!")
		}
	};

	// Trường avatar lưu media file
    const avatar = React.createRef();

	// Get thông tin có sẵn trên server các danh mục để lọc (nên gom lại 1 object cho gọn)
	const [degrees, setDegrees] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [careers, setCareers] = useState([]);
	const [benefits, setBenefits] = useState([])

	// Gửi request để lấy dữ liệu danh mục
	const getFilterCategory = async () => {
		const degreesRes = await API.get(endpoints["bang-cap"]);
		const skillsRes = await API.get(endpoints["ky-nang"]);
		const expRes = await API.get(endpoints["kinh-nghiem"]);
		const careersRes = await API.get(endpoints["nganh-nghe"]);
		const benefitsRes = await API.get(endpoints["phuc-loi"])
		setDegrees(degreesRes.data);
		setSkills(skillsRes.data);
		setExperiences(expRes.data);
		setCareers(careersRes.data);
		setBenefits(benefitsRes.data);
	};

	// Thông tin các ứng viên đang đợi duyệt nhận đơn ứng tuyển (lưu trữ)
	const [applyInfo, setApplyInfo] = useState([])

	// Lấy danh sách các ứng viên đợi được chấp nhận đơn ứng tuyển
	const getPendingApply = async (hiringId = user.nguoi_dung.id) => {
		const res = await API.get(endpoints["ung-vien-doi-duyet"](hiringId));
		// console.log(res.data)
		setApplyInfo(res.data);
		// console.log(applyInfo)
	}

	// Dữ liệu lọc sẽ được gửi lên server
	const [filterData, setFilterData] = useState({
		"career": "1",
		"degree": "1",
		"experience": "1",
		"skill": "1",
	})

	// Xử lý thay đổi giá trị select của người dùng
	const handleSelectChange = (event) => {
		setFilterData({
			...filterData,
			[event.target.name]: event.target.value
		})
	}
	
	// Kết quả trả về có phân trang
	const [ketQua, setKetQua] = useState({
		count: 0,
		next: null,
		previous: null,
		results: []
	})

	// Lọc ứng viên và trả về kết quả khi người dùng nhấn nút
	const locUngVien = async (page = 1) => {
		const res = await API.get(endpoints["ung-vien"](filterData.career, filterData.degree, filterData.experience, filterData.skill))
		setKetQua(res.data)
		console.log(res.data, ketQua)
	}

	// Chức năng đăng tin tuyển dụng
	// Hiện modal đăng tin tuyển dụng tùy thuộc biến show này
	const [showDangTin, setShowDangTin] = useState(false)
	// Các dữ liệu để gửi lên server tạo bản ghi
	const [ngayHetHan, setNgayHetHan] = useState(new Date());
	const [tinTuyenDung, setTinTuyenDung] = useState({
		tieu_de: "",
		luong: "",
		noi_dung: "",
		bang_cap: [],
		ky_nang: [],
		kinh_nghiem: [],
		nganh_nghe: [],
		phuc_loi: [],
	})

	// Phương thức gửi dữ liệu lên server để tạo bản ghi
	const dangTinTuyenDung = async () => {
		// console.log(tinTuyenDung)
		const res = await API.post(endpoints["viec-lam"], tinTuyenDung)
		// console.log(res.data)
		if (res.data === 201) {
			alert("Tạo việc làm thành công!")
			setShowDangTin(false);
		} else if (res.data === 400) {
			alert("Hệ thống đang lỗi vui lòng thử lại sau!")
		}
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
	arr = []
	benefits.map(item => arr.push({value: item.id, label: item.ten}))
	options['benefits'] = arr;
	arr = []

	useEffect(() => {
		const ac = new AbortController();
        getFilterCategory();
		getPendingApply();
		return () => ac.abort();
    }, []);

	// Chỉ người dùng đã đăng nhập mới xem được
    if (!cookies.load("user"))
        return <Redirect to={Routes.LoginPage.path} />

	// Nhưng đăng nhập với vai trò ứng viên hoặc khác thì trả về 404
    if (user.nguoi_dung.vai_tro !== VAI_TRO.TUYEN_DUNG)
        return <Redirect to={Routes.NotFoundPage.path} />

    return (
		<>
			<Container>
				<Row className="my-5">
					<Col md={7} sm={12}>
						<Row className="mb-4">
							<Col>
								<Card className="p-3" border="dark">
									<Card.Title>
										<h3 className="p-3 fw-bold">
											Thông tin chi tiết
										</h3>
									</Card.Title>
									<Card.Body>
										<div>
											Loại tài khoản: Nhà tuyển dụng
										</div>
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
											<Form.Group
												className="my-4"
												controlId="avatar"
											>
												<Form.Label>
													Ảnh đại diện
												</Form.Label>
												<Form.Control
													type="file"
													ref={avatar}
												/>
											</Form.Group>
                                            <SimpleInput
                                                label="Tên công ty"
                                                faIcon={faBuilding}
                                                type="text"
                                                value={user.ten_cong_ty}
                                                onChange={thongTinNhaTuyenDung}
                                                name="ten_cong_ty"
                                            />
                                            <SimpleInput
                                                label="Số lượng nhân viên"
                                                faIcon={faUsers}
                                                type="text"
                                                value={user.quy_mo}
                                                onChange={thongTinNhaTuyenDung}
                                                name="quy_mo"
                                            />
											<SimpleInput
												label="Địa chỉ"
												faIcon={faMapMarkerAlt}
												type="text"
												value={user.dia_chi}
												onChange={thongTinNhaTuyenDung}
												name="dia_chi"
											/>
											<Form.Group className="my-4">
												<Form.Label>
													Giới thiệu
												</Form.Label>
												<Form.Control
													as="textarea"
													name="gioi_thieu"
													value={user.gioi_thieu}
													onChange={thongTinNhaTuyenDung}
												/>
											</Form.Group>
											<Button 
												variant="success"
												onClick={() => capNhatThongTin()}
											>Lưu thông tin cá nhân</Button>
										</Form>
										{/* <hr />
										<p>Đổi mật khẩu 3 ô input</p> */}
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col>
								<Card className="p-3" border="dark">
									<Card.Title>
										<h3 className="p-3 fw-bold">
											Thông báo tuyển dụng
										</h3>
									</Card.Title>
									<Card.Body>
										{applyInfo.length > 0 ? applyInfo.map((info, index) => (
											<Card className="p-3 mb-3">
												<p className="text-justify">
													<span className="fw-bold text-primary">
														{applyInfo[index].ung_vien.nguoi_dung.last_name} {applyInfo[index].ung_vien.nguoi_dung.first_name}
													</span>
													{" "}đã nộp đơn ứng tuyển vào vị trí{" "}
													<span className="fw-bold">{applyInfo[index].viec_lam.tieu_de}</span>
												</p>
												<p className="text-secondary">
													<FontAwesomeIcon icon={faClock} /> {" "}
													<Moment fromNow>{applyInfo[index].ngay_ung_tuyen}</Moment></p>
												
													<Button 
														variant="outline-primary me-2"
														onClick={() => {
															props.xemChiTietUngVien(applyInfo[index].ung_vien.nguoi_dung.id, 
																applyInfo[index].viec_lam.id, applyInfo[index].viec_lam.tieu_de);
															props.history.push(Routes.UngVienChiTietPage.path);
														}}
													>
														Xem hồ sơ chi tiết
													</Button>
												
											</Card>
										)) : (
											<div className="alert alert-secondary">Không có hồ sơ chờ duyệt</div>
										)}

									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col md={5} sm={12}>
						<Row className="mb-4">
							<Col>
								<Card className="p-4" border="dark">
									<Card.Img variant="top" src={
										(user.nguoi_dung.anh_dai_dien).substr(0, 4) !== "http" ? (baseURL + user.nguoi_dung.anh_dai_dien) : user.nguoi_dung.anh_dai_dien
									} />
									<h4 className="mt-4 mb-2 text-center">
										{user.nguoi_dung.last_name}{" "}
										{user.nguoi_dung.first_name}
									</h4>
									<p className="my-2 text-center">
										{user.nguoi_dung.email}
									</p>
									<Button onClick={() => setShowDangTin(true)} variant="primary">Đăng tin tuyển dụng</Button>
								</Card>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col><Card className="p-4" border="dark">
								<Row className="mb-4">
									<Col>
										<FloatingLabel
											controlId="floatingSelect" 
											label={
												<span>
													<FontAwesomeIcon icon={faGraduationCap}/> Bằng cấp
												</span>
											}
										>
											<Form.Select defaultValue={1} name="degree" onChange={(event) => handleSelectChange(event)}>
												{degrees.map((deg, index) => {
													return (
														<option value={deg.id}>{deg.ten}</option>
													)
												})}
											</Form.Select>
										</FloatingLabel>
									</Col>
									<Col>
										<FloatingLabel
											controlId="floatingSelect" 
											label={
												<span>
													<FontAwesomeIcon icon={faCogs}/> Kỹ năng
												</span>
											}
										>
											<Form.Select defaultValue={1} name="skill" onChange={(event) => handleSelectChange(event)}>
												{skills.map((skill, index) => {
													return (
														<option value={skill.id}>{skill.ten}</option>
													)
												})}
											</Form.Select>
										</FloatingLabel>
									</Col>
								</Row>
								<Row className="mb-4">
									<Col>
										<FloatingLabel
											controlId="floatingSelect" 
											label={
												<span>
													<FontAwesomeIcon icon={faBriefcase}/> Ngành nghề
												</span>
											}
										>
											<Form.Select defaultValue={1} name="career" onChange={(event) => handleSelectChange(event)}>
												{careers.map((career, index) => {
													return (
														<option value={career.id}>{career.ten}</option>
													)
												})}
											</Form.Select>
										</FloatingLabel>
									</Col>
									<Col>
										<FloatingLabel
											controlId="floatingSelect" 
											label={
												<span>
													<FontAwesomeIcon icon={faMedal}/> Kinh nghiệm
												</span>
											}
										>
											<Form.Select defaultValue={1} name="experience" onChange={(event) => handleSelectChange(event)}>
												{experiences.map((exp, index) => {
													return (
														<option value={exp.id}>{exp.ten}</option>
													)
												})}
											</Form.Select>
										</FloatingLabel>
									</Col>
								</Row>
								<Button
									onClick={() => locUngVien()}
									className="mb-4"
								>Lọc ứng viên</Button>
								{ketQua.results.length > 0 ? ketQua.results.map((uv, idx) => (
									<Card className="p-3 mb-3">
										<p className="fw-bold text-primary">{uv.nguoi_dung.last_name} {uv.nguoi_dung.first_name}</p>
										<p className="text-justify">{(uv.gioi_thieu).substr(0, 50)}</p>
										<Button 
											variant="outline-primary"
											onClick={() => {
												props.xemChiTietUngVien(uv.nguoi_dung.id, 0, "");
												props.history.push(Routes.UngVienChiTietPage.path);
											}}
										>Xem hồ sơ</Button>
									</Card>
								)) : (<></>)}
								{ketQua.count > 0 ? (
									<div className="mx-auto">
										<PaginationBar
											count={ketQua.count}
											next={ketQua.next}
											previous={ketQua.previous}
											defaultGet={6}
											getPost={locUngVien}
										/>
									</div>
								) : (<></>)}
							</Card></Col>

						</Row>
					</Col>
				</Row>
			</Container>
			{/* Modal của chức năng đăng tin */}
			<Modal 
				show={showDangTin} 
				onHide={() => setShowDangTin(false)} 
				centered 
				size="lg"
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Đăng tin tuyển dụng</Modal.Title>
				</Modal.Header>
				
				<Modal.Body>
					<Form onSubmit={dangTinTuyenDung}>
						<SimpleInput
							label="Tiêu đề bài viết tuyển dụng"
							faIcon={faHeading}
							type="text"
							placeholder="Nhập tiêu đề bài viết"
							value={tinTuyenDung.tieu_de}
							onChange={(e) => setTinTuyenDung({
								...tinTuyenDung, 
								tieu_de: e.target.value,
								nha_tuyen_dung_id: user.nguoi_dung.id,
							})}
							name="tieu_de"
							required={true}
						/>
						<SimpleInput
							label="Mức lương (VNĐ)"
							faIcon={faHandHoldingUsd}
							type="text"
							placeholder="Nhập mức lương (nhập 0 nếu lương là thương lượng)"
							value={tinTuyenDung.luong}
							onChange={(e) => setTinTuyenDung({...tinTuyenDung, luong: e.target.value})}
							name="luong"
							required={true}
						/>
						<Form.Group className="my-4">
							<Form.Label>Ngày hết hạn (Tháng - Ngày - Năm)</Form.Label>
							<DatePicker
								selected={ngayHetHan} 
								onChange={(date) => {
									setNgayHetHan(date)
									setTinTuyenDung({...tinTuyenDung, ngay_het_han: moment(date).format("YYYY-MM-DD").toString()})
								}}
								className="form-control"
								required
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Nội dung</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="Nội dung của bài viết tuyển dụng"
								name="noi_dung"
								value={tinTuyenDung.noi_dung}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, noi_dung: e.target.value})}
								required={true}
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Bằng cấp</Form.Label>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={options.degrees}
								name="bang_cap"
								value={tinTuyenDung.bang_cap}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, bang_cap: e}) }
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Kỹ năng</Form.Label>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={options.skills}
								name="ky_nang"
								value={tinTuyenDung.ky_nang}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, ky_nang: e}) }
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Kinh nghiệm</Form.Label>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={options.experiences}
								name="kinh_nghiem"
								value={tinTuyenDung.kinh_nghiem}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, kinh_nghiem: e}) }
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Ngành nghề</Form.Label>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={options.careers}
								name="nganh_nghe"
								value={tinTuyenDung.nganh_nghe}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, nganh_nghe: e}) }
							/>
						</Form.Group>
						<Form.Group className="my-4">
							<Form.Label>Phúc lợi</Form.Label>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={options.benefits}
								name="nganh_nghe"
								value={tinTuyenDung.benefits}
								onChange={(e) => setTinTuyenDung({...tinTuyenDung, phuc_loi: e}) }
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDangTin(false)}>
						Hủy
					</Button>
					<Button variant="primary" onClick={() => dangTinTuyenDung()}>
						Đăng tin
					</Button>
				</Modal.Footer>
				
			</Modal>
		</>
	);
}

export default connect(
    (state) => {
        return {
            store: state
        }
    },
	(dispatch) => {
		return {
			xemChiTietUngVien: (ungvienId, vieclamId, tenViecLam) => dispatch(xemChiTietUngVien(ungvienId, vieclamId, tenViecLam)),
			capNhatThanhCong: (user) => dispatch(login(user))
		}
	}
)(HiringDashboardPage);