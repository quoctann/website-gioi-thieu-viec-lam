import { useState } from "react";
import { Container, Row, Col, Card, Form, Image, Button } from "react-bootstrap";
import cookies from "react-cookies";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleInput from "../components/SimpleInput"
import { useSubmitForm } from "../utils/CustomHooks"
import pic from "../assets/images/python.jpg"

const UserDetailPage = (props) => {
	/*
		anh_dai_dien: "/static/upload/2021/09/usecase_TmdZgWU.jpg"
		email: "uv@mail.com"
		first_name: "Quốc"
		id: 3
		last_name: "Tấn"
		username: "uv"
		vai_tro: "UNG VIEN"
		kiểu object
	*/

	// Nếu user đã đăng nhập mới render, không thì redirect đến trang đăng nhập
	if (cookies.load("user") || props.userInfo.userReducer.hasOwnProperty("username")) {
		return (
			<>
				<Container>
					<Row className="my-5">
						<Col md={8} sm={12}>
							<Row className="mb-4">
								<Col>
									<Card className="p-3" border="dark">
										<Card.Title>
											<h3 className="p-3 fw-bold">Thong tin chi tiet</h3>
										</Card.Title>
										<Card.Body>
											<div>Loai tai khoan: Nha tuyen dung</div>
											<Form>
												<SimpleInput
													label="Ten cong ty"
													type="text"
													placeholder="Ten cong ty" 
													required={true}
													value=""
													onChange=""
													name="ten cong ty"
												/>
											</Form>
											<Form>
												<SimpleInput
													label="Ten cong ty"
													type="text"
													placeholder="Ten cong ty" 
													required={true}
													value=""
													onChange=""
													name="ten cong ty"
												/>
												<SimpleInput
													label="Ten cong ty"
													type="text"
													placeholder="Ten cong ty" 
													required={true}
													value=""
													onChange=""
													name="ten cong ty"
												/>
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
											<Image src={pic} rounded fluid />
										</div>
										<h4 className="mb-2 text-center">Tran Van Hoang</h4>
										<p className="mb-2 text-center">hoangtrang@gmail.com</p>
										<p className="mb-2 text-center">0908174589</p>
										<p className="mb-2 text-center">Diem danh gia 4.25 sao</p>
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
})(UserDetailPage);
