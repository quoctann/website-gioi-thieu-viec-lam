import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import useSubmitForm from "../utils/CustomHooks"
import API, { endpoints } from "../utils/API"
import { VAI_TRO } from "../utils/GlobalConstants"
import { faAddressCard, faBriefcase, faBuilding, faClock, faCogs, faEnvelope, faGraduationCap, faKey, faMapMarkerAlt, faMedal, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import cookies from "react-cookies";
import Routes from "../routes";
import { xemChiTietUngVien } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import 'moment-timezone';

const HiringDashboardPage = (props) => {
    const user = props.store.userReducer;
    const updateUserInfo = () => {};
    const avatar = React.createRef();
    const { handleSubmit, handleInputChange, inputs } = useSubmitForm(updateUserInfo);

	// Get thông tin có sẵn trên server các danh mục để lọc
	const [degrees, setDegrees] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [careers, setCareers] = useState([]);

	// Gửi request để lấy dữ liệu danh mục
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

	// Handle thay đổi giá trị select của người dùng
	const handleSelectChange = (event) => {
		setFilterData({
			...filterData,
			[event.target.name]: event.target.value
		})
	}

	useEffect(() => {
		const ac = new AbortController();
        getFilterCategory();
		getPendingApply();
		return () => ac.abort();
    }, []);

    if (!cookies.load("user"))
        return <Redirect to={Routes.LoginPage.path} />

    if (user.nguoi_dung.vai_tro === VAI_TRO.UNG_VIEN)
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
												placeholder={
													user.nguoi_dung.first_name
												}
												value={inputs.first_name}
												onChange={handleInputChange}
												name="first_name"
											/>

											<SimpleInput
												label="Họ của bạn"
												faIcon={faAddressCard}
												type="text"
												placeholder={
													user.nguoi_dung.last_name
												}
												value={inputs.last_name}
												onChange={handleInputChange}
												name="last_name"
											/>

											<SimpleInput
												label="Email"
												faIcon={faEnvelope}
												type="email"
												placeholder={
													user.nguoi_dung.email
												}
												value={inputs.email}
												onChange={handleInputChange}
												name="email"
											/>

											<SimpleInput
												label="Số điện thoại"
												faIcon={faPhone}
												type="text"
												placeholder={
													user.nguoi_dung
														.so_dien_thoai
												}
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
												<Form.Label>
													Giới thiệu
												</Form.Label>
												<Form.Control
													as="textarea"
													name="gioi_thieu"
													placeholder={
														user.gioi_thieu
													}
													value={inputs.gioi_thieu}
													onChange={handleInputChange}
												/>
											</Form.Group>
											<Button>
												Lưu thông tin cá nhân
											</Button>
										</Form>
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
														variant="primary me-2"
														onClick={() => {
															props.emit(applyInfo[index].ung_vien.nguoi_dung.id, applyInfo[index].viec_lam.id);
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
									<Card.Img variant="top" src={user.nguoi_dung.anh_dai_dien} />
									<h4 className="mt-4 mb-2 text-center">
										{user.nguoi_dung.last_name}{" "}
										{user.nguoi_dung.first_name}
									</h4>
									<p className="my-2 text-center">
										{user.nguoi_dung.email}
									</p>
									<Button variant="primary">Đăng tin tuyển dụng</Button>
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
								<Button>Lọc ứng viên</Button>
							</Card></Col>
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
            store: state
        }
    },
	(dispatch) => {
		return {
			emit: (ungvienId, vieclamId) => dispatch(xemChiTietUngVien(ungvienId, vieclamId))
		}
	}
)(HiringDashboardPage);