import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import useSubmitForm from "../utils/CustomHooks"
import API, { endpoints } from "../utils/API"
import { VAI_TRO } from "../utils/GlobalConstants"
import { faAddressCard, faEnvelope, faKey, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import cookies from "react-cookies";
import Routes from "../routes"

const ApplicantDashboardPage = (props) => {
	// Người dùng lưu trong cookies được gắn lên redux
    const user = props.store.userReducer;
	
	// Phương thức để cập nhật thông tin người dùng
    const updateUserInfo = () => {};

	// Các thông tin các ô input dạng text thông thường, handle form cơ bản, gọi callback để submit form
	const { handleSubmit, handleInputChange, inputs } = useSubmitForm(updateUserInfo);

	// Các ô input chứa dữ liệu file, ngày tháng khác với thông thường
    const avatar = React.createRef();
    const cv = React.createRef();
    const [birthday, setBirthday] = useState(new Date());

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
		console.log(res.data)
		setOffer(res.data)
	}
    
	// Các ô select của ngành nghề, bằng cấp,... lựa chọn nhiều
	const [filterData, setFilterData] = useState({});
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

	// Ô select nào đã được chọn (res trả ra) thì tô màu
    const selectedStyle = (arr, id) => {
        let style="";
        for (let i = 0; i < arr.length; i++)
            if (arr[i].id == id) {
                style="text-success fw-bold"
            }
        return style;
    }

	// Bấm nút xem chi tiết công việc để đến trang chi tiết việc làm
	const denTrangChiTietViecLam = (postId) => {
		props.history.push(Routes.PostDetailPage.path + "?id=" + postId);
	};

	// Format tiền lương ra định dạng VNĐ đẹp hơn
	const currency = (number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
	}

	// Vừa nạp trang thì lấy danh mục, thông tin tuyển dụng, việc làm gợi ý
    useEffect(() => {
        getFilterCategory();
		getSuggestion();
		getOffer();
    }, []);

	// Các trường hợp truy cập vào trang thông qua url sẽ được redirect đi nơi khác
    if (!cookies.load("user"))
        return <Redirect to={Routes.LoginPage.path} />

    if (user.nguoi_dung.vai_tro === VAI_TRO.TUYEN_DUNG)
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
                                            <hr />
                                            <Form.Group>
                                                <Form.Label>Ngày sinh</Form.Label>
                                                <DatePicker 
                                                    className="form-control"
                                                    selected={birthday} 
                                                    onChange={(date) => setBirthday(date)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="my-4" controlId="cv">
                                                <Form.Label>CV</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    ref={cv}
                                                />
                                            </Form.Group>
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
											<Button variant="success">Lưu những thay đổi</Button>
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
									<Card.Img className="shadow" variant="top" src={user.nguoi_dung.anh_dai_dien} />
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
    }
)(ApplicantDashboardPage);