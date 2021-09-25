import { useState } from "react";
import { Container, Row, Col, Card, Form, Image, Button } from "react-bootstrap";
import cookies from "react-cookies";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import useSubmitForm from "../utils/CustomHooks"
import API, { endpoints } from "../utils/API"
import { VAI_TRO } from "../utils/GlobalConstants"
import { faAddressCard, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const UserDashboardPage = (props) => {
	const updateUserInfo = () => {}
	const updateSpecificInfo = () => {}
	const { handleSubmit, handleInputChange, inputs } = useSubmitForm(updateUserInfo);
	// Nếu user đã đăng nhập mới render, không thì redirect đến trang đăng nhập
	if (props.userInfo.userReducer.hasOwnProperty("nguoi_dung")) {

		let user = props.userInfo.userReducer;
		let danhGia;
		let loaiTaiKhoan;
		let extra;
		if (user.nguoi_dung.vai_tro === VAI_TRO.TUYEN_DUNG) {
			danhGia = <p className="mb-2 text-center">Điểm đánh giá: {user.diem_danh_gia_tb}</p>
			loaiTaiKhoan = "Nhà tuyển dụng"						
		}
		if (user.nguoi_dung.vai_tro === VAI_TRO.UNG_VIEN) {
			loaiTaiKhoan = "Ứng viên"	
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
											<div>Loại tài khoản: {loaiTaiKhoan}</div>
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
												<Button>Lưu thông tin cá nhân</Button>
											</Form>
											<hr />
											<Form>
												{extra}
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
										{danhGia}
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
