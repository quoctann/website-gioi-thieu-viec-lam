import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Image, Button, FloatingLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import useSubmitForm from "../utils/CustomHooks"
import API, { endpoints } from "../utils/API"
import { VAI_TRO } from "../utils/GlobalConstants"
import { faAddressCard, faBuilding, faEnvelope, faKey, faMapMarkerAlt, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";

const UserDashboardPage = (props) => {
	const updateUserInfo = () => {};
	const avatar = React.createRef();
	const cv = React.createRef();
	const [birthday, setBirthday] = useState(new Date());
	const [filterData, setFilterData] = useState({});
	// Get thông tin có sẵn trên server các danh mục để lọc
	const [degrees, setDegrees] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [careers, setCareers] = useState([]);
	const { handleSubmit, handleInputChange, inputs } = useSubmitForm(updateUserInfo);
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
	useEffect(() => {
		getFilterCategory();
	}, []);

	// Nếu user đã đăng nhập mới render, không thì redirect đến trang đăng nhập
	if (props.userInfo.userReducer.hasOwnProperty("nguoi_dung")) {

		const handleSelectChange = (event) => {
			var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
			setFilterData({
				...filterData, 
				[event.target.name]: value
			})
			console.log(filterData)
		}

		const selectedStyle = (arr, id) => {
			let style="";
			for (let i = 0; i < arr.length; i++)
				if (arr[i].id == id) {
					style="text-success fw-bold"
				}
			return style;
		}

		let user = props.userInfo.userReducer;
		let rating;
		let accountType;
		let extraInfo;
		if (user.nguoi_dung.vai_tro === VAI_TRO.TUYEN_DUNG) {
			rating = <p className="mb-2 text-center">Điểm đánh giá: {user.diem_danh_gia_tb}</p>
			accountType = "Nhà tuyển dụng"
			extraInfo = (
				<>
					<SimpleInput
						label="Tên công ty"
						faIcon={faBuilding}
						type="text"
						placeholder={user.ten_cong_ty}
						value={inputs.ten_cong_ty}
						onChange={handleInputChange}
						name="ten_cong_ty"
					/>
					<SimpleInput
						label="Số lượng nhân viên"
						faIcon={faUsers}
						type="text"
						placeholder={user.quy_mo}
						value={inputs.quy_mo}
						onChange={handleInputChange}
						name="quy_mo"
					/>
				</>
			)						
		}
		if (user.nguoi_dung.vai_tro === VAI_TRO.UNG_VIEN) {
			accountType = "Ứng viên"
			extraInfo = (
				<>
					
					<Form.Group>
						<Form.Label>Ngày sinh</Form.Label>
						<DatePicker 
							className="form-control"
							selected={birthday} 
							onChange={(date) => setBirthday(date)}
						/>
					</Form.Group>
					<Form.Group className="my-4" controlId="avatar">
						<Form.Label>CV</Form.Label>
						<Form.Control
							type="file"
							ref={cv}
						/>
					</Form.Group>
					<hr />
					<Form.Group className="my-4">
						<Form.Label>Ngành nghề</Form.Label>
						<Form.Select name="nganh_nghe" onChange={handleSelectChange} multiple>
							{careers.map((career, index) => {
								let style = selectedStyle(user.nganh_nghe, career.id)
								return (
									<option value={career.id} className={style}>{career.ten}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group className="my-4">
						<Form.Label>Kỹ năng</Form.Label>
						<Form.Select name="ky_nang" onChange={handleSelectChange} multiple>
							{skills.map((skill, index) => {
								let style = selectedStyle(user.ky_nang, skill.id)
								return (
									<option value={skill.id} className={style}>{skill.ten}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group className="my-4">
						<Form.Label>Kinh nghiệm</Form.Label>
						<Form.Select name="kinh_nghiem" onChange={handleSelectChange} multiple>
							{experiences.map((exp, index) => {
								let style = selectedStyle(user.kinh_nghiem, exp.id)
								return (
									<option value={exp.id} className={style}>{exp.ten}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group className="my-4">
						<Form.Label>Bằng cấp</Form.Label>
						<Form.Select name="bang_cap" onChange={handleSelectChange} multiple>
							{degrees.map((deg, index) => {
								let style = selectedStyle(user.bang_cap, deg.id)	
								return (
									<option value={deg.id} className={style}>{deg.ten}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
				</>
			)
		}

		return (
			<>
				<Container>
					<Row className="my-5">
						<Col md={8} sm={12}>
							<Row className="mb-4">
								<Col>
									<Card className="p-3" border="dark">
										<Card.Title>
											<h3 className="p-3 fw-bold">Thông tin chi tiết</h3>
										</Card.Title>
										<Card.Body>
											<div>Loại tài khoản: {accountType}</div>
											<Form>
												<SimpleInput
													label="Tên của bạn"
													faIcon={faAddressCard}
													type="text"
													placeholder={user.nguoi_dung.first_name}
													value={inputs.first_name}
													onChange={handleInputChange}
													name="first_name"
												/>

												<SimpleInput
													label="Họ của bạn"
													faIcon={faAddressCard}
													type="text"
													placeholder={user.nguoi_dung.last_name}
													value={inputs.last_name}
													onChange={handleInputChange}
													name="last_name"
												/>

												<SimpleInput
													label="Email"
													faIcon={faEnvelope}
													type="email"
													placeholder={user.nguoi_dung.email}
													value={inputs.email}
													onChange={handleInputChange}
													name="email"
												/>

												<SimpleInput
													label="Số điện thoại"
													faIcon={faPhone}
													type="text"
													placeholder={user.nguoi_dung.so_dien_thoai}
													value={inputs.so_dien_thoai}
													onChange={handleInputChange}
													name="so_dien_thoai"
												/>

												<SimpleInput
													label="Mật khẩu"
													faIcon={faKey}
													type="password"
													placeholder="********"
													value={inputs.password}
													onChange={handleInputChange}
													name="password"
												/>

												<SimpleInput
													label="Nhập lại mật khẩu"
													faIcon={faKey}
													type="password"
													placeholder="********"
													value={inputs.confirm_password}
													onChange={handleInputChange}
													name="confirm_password"
												/>
												<Form.Group className="my-4" controlId="avatar">
													<Form.Label>Ảnh đại diện</Form.Label>
													<Form.Control
														type="file"
														ref={avatar}
													/>
												</Form.Group>
												<hr />
												<SimpleInput
													label="Địa chỉ"
													faIcon={faMapMarkerAlt}
													type="text"
													placeholder={user.dia_chi}
													value={inputs.dia_chi}
													onChange={handleInputChange}
													name="dia_chi"
												/>
												<Form.Group className="my-4">
													<Form.Label>Giới thiệu</Form.Label>
													<Form.Control
														as="textarea"
														name="gioi_thieu"
														placeholder={user.gioi_thieu}
														value={inputs.gioi_thieu}
														onChange={handleInputChange}
													/>
												</Form.Group>
												{extraInfo}
												<Button>Lưu thông tin cá nhân</Button>
											</Form>
										</Card.Body>
									</Card>
								</Col>
							</Row>
							<Row className="mb-4">
								<Col>
									<Card className="p-3" border="dark">
										<Card.Title>
											<h3 className="p-3 fw-bold">Thong bao tuyen dung</h3>
										</Card.Title>
										<Card.Body>
											<Card className="p-3 mb-3">
												<p className="text-justify">Nguyen Van An vua ung tuyen vi tri Chuyen vien phat trien san pham cong viec chuyen vien nghien cuu san pham</p>
												<div className="d-flex flex-row align-items-center">
												<Button variant="primary me-2">Xem ho so chi tiet</Button>
													<Button variant="success">Da nhan ho so</Button>
												</div>
											</Card>
											<Card className="p-3 mb-3">
												<p className="text-justify">Nguyen Van An vua ung tuyen vi tri Chuyen vien phat trien san pham cong viec chuyen vien nghien cuu san pham</p>
												<div className="d-flex flex-row align-items-center">
												<Button variant="primary me-2">Xem ho so chi tiet</Button>
													<Button variant="success">Da nhan ho so</Button>
												</div>
											</Card>
											<Card className="p-3 mb-3">
												<p className="text-justify">Nguyen Van An vua ung tuyen vi tri Chuyen vien phat trien san pham cong viec chuyen vien nghien cuu san pham</p>
												<div className="d-flex flex-row align-items-center">
												<Button variant="primary me-2">Xem ho so chi tiet</Button>
													<Button variant="success">Da nhan ho so</Button>
												</div>
											</Card>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col md={4} sm={12}>
							<Row className="mb-4">
								<Col>
									<Card className="p-4" border="dark">
										<div className="mb-2">
											<Image src={user.nguoi_dung.anh_dai_dien} rounded fluid />
										</div>
										<h4 className="mb-2 text-center">{user.nguoi_dung.last_name} {user.nguoi_dung.first_name}</h4>
										<p className="mb-2 text-center">{user.nguoi_dung.email}</p>
										<p className="mb-2 text-center">{user.nguoi_dung.so_dien_thoai}</p>
										{rating}
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
	else return <Redirect to="/login" />;
};

export default connect((state) => {
	return {
		userInfo: state,
	};
})(UserDashboardPage);
