import React, { useState } from "react";
import { Container, Form, Card, Button, Modal } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faKey,
	faAngleLeft,
	faUser,
	faAddressCard,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
// Một ô thành phần input tùy chỉnh
import SimpleInput from "../components/SimpleInput";
// Thư viện thực hiện gọi API tương tác server
import API, { endpoints } from "../utils/API";
import useSubmitForm from "../utils/CustomHooks";
import Routes from "../routes";
import cookies from "react-cookies";
import { connect } from "react-redux";

const RegisterPage = (props) => {

	// Các thông tin đều hợp lệ, sẵn sàng post lên server
	let isValid = true;

	const [isSuccess, setIsSuccess] = useState(false);

	// Vai trò tương tụ dưới csdl
	const HIRING = "TUYEN DUNG";

	const APPLICANT = "UNG VIEN";

	// State loại tài khoản muốn đăng ký
	const [registerType, setRegisterType] = useState("");

	// Lưu media file (ảnh đại diện)
	const avatar = React.createRef();
	
	// Handle chức năng xem điều khoản và điều kiện
	const [showTerm, setShowTerm] = useState(false);

	const handleCloseTerm = () => setShowTerm(false);

	const handleShowTerm = () => setShowTerm(true);

	// Gửi request lên server
	const register = async () => {
		const formData = new FormData();
		// Lấy các trường trừ confirm_input
		if (inputs.password === inputs.confirm_password) {
			for (let k in inputs) {
				if (k !== "confirm_password") formData.append(k, inputs[k]);
			}
		}

		formData.append("anh_dai_dien", avatar.current.files[0]);

		switch (registerType) {
			case HIRING:
				formData.append("vai_tro", HIRING);
				break;
			case APPLICANT:
				formData.append("vai_tro", APPLICANT);
				break;
			default:
				isValid = false;
				alert("Invalid request!");
				break;
		}

		for (var key of formData.keys()) {
			console.log(key, formData.get(key));
		}

		if (isValid) {
			try {
				let res = await API.post(endpoints["nguoi-dung"], formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				if(res)
					setIsSuccess(true);
			} catch (err) {
				console.log("ERROR:\n", err);
			}
		}
	};

	// Hook dùng chung để xử lý trạng thái của form
	const { inputs, handleInputChange, handleSubmit } = useSubmitForm(register);

	// Handle nút bấm chọn loại tài khoản cần đăng ký
	const toggleSelection = () => {
		if (registerType === APPLICANT) setRegisterType(HIRING);
		else setRegisterType(APPLICANT);
	};

	// Hộp thoại lựa chọn loại tài khoản (khi trang nạp lần đầu)
	const question = (
		<Modal.Dialog className="animate__animated animate__fadeIn">
			<Modal.Body>
				<FontAwesomeIcon icon={faQuestionCircle} />{" "}
				<span>Bạn muốn tạo loại tài khoản nào?</span>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-primary"
					onClick={() => setRegisterType(APPLICANT)}
				>
					Ứng viên
				</Button>
				<Button
					variant="outline-success"
					onClick={() => setRegisterType(HIRING)}
				>
					Nhà tuyển dụng
				</Button>
			</Modal.Footer>
		</Modal.Dialog>
	);

	// Nếu đã đăng nhập thì redirect về trang chủ
	if (cookies.load("user") || props.userInfo.userReducer.hasOwnProperty("username"))
		return <Redirect to={Routes.LandingPage.path} />;

	// Khi trang nạp lần đầu hiện hộp thoại lựa chọn
	if (registerType === "") return question;

	// Form đăng ký có các trường input tùy loại tài khoản
	if (registerType === APPLICANT || registerType === HIRING)
		return (
			<>
				<Container className="animate__animated animate__fadeIn">
					<div className="my-4 text-center text-secondary">
						<FontAwesomeIcon
							icon={faAngleLeft}
							className="text-secondary"
						/>{" "}
						<Link to={Routes.LandingPage.path} className="text-secondary no-decoration">
							Trở về trang chủ
						</Link>
					</div>
					<Card
						border="secondary"
						className="mx-auto mt-2 p-5 shadow form-width"
					>
						<Form onSubmit={handleSubmit}>
							<h3 className="fw-bold text-center my-4">
								Tạo tài khoản
							</h3>

							<div className="alert alert-secondary">
								Loại tài khoản:{" "}
								{registerType === HIRING
									? "Nhà tuyển dụng"
									: "Ứng viên"}{" "}
								<strong
									onClick={toggleSelection}
									className="text-link"
									style={{ cursor: "pointer" }}
								>
									<u>(Thay đổi)</u>
								</strong>
							</div>
							<span>Các trường có dấu <small className="text-danger">*</small> là bắt buộc</span>
							<SimpleInput
								label="Tên người dùng *"
								faIcon={faUser}
								type="text"
								placeholder="tran_quoc_tan"
								required
								value={inputs.username}
								onChange={handleInputChange}
								name="username"
							/>

							<SimpleInput
								label="Tên của bạn *"
								faIcon={faAddressCard}
								type="text"
								placeholder="Tấn"
								required
								value={inputs.first_name}
								onChange={handleInputChange}
								name="first_name"
							/>

							<SimpleInput
								label="Họ của bạn *"
								faIcon={faAddressCard}
								type="text"
								placeholder="Trần Quốc"
								required
								value={inputs.last_name}
								onChange={handleInputChange}
								name="last_name"
							/>

							<SimpleInput
								label="Email *"
								faIcon={faEnvelope}
								type="email"
								placeholder="nguoidung@mail.com"
								required
								value={inputs.email}
								onChange={handleInputChange}
								name="email"
							/>

							<SimpleInput
								label="Mật khẩu *"
								faIcon={faKey}
								type="password"
								placeholder="********"
								required
								value={inputs.password}
								onChange={handleInputChange}
								name="password"
							/>

							<SimpleInput
								label="Nhập lại mật khẩu *"
								faIcon={faKey}
								type="password"
								placeholder="********"
								required
								value={inputs.confirm_password}
								onChange={handleInputChange}
								name="confirm_password"
							/>

							<Form.Group className="my-4" controlId="avatar">
								<Form.Label>Avatar *</Form.Label>
								<Form.Control
									type="file"
									ref={avatar}
									required
								/>
							</Form.Group>

							<Form.Group className="my-2">
								<Form.Check
									type="checkbox"
									label={
										<>
											Tôi đồng ý với{" "}
											<strong
												style={{ cursor: "pointer" }}
												onClick={handleShowTerm}
											>
												<u>điều khoản và điều kiện</u>
											</strong>
										</>
									}
									required
								/>
							</Form.Group>
							<Button
								variant="dark"
								type="submit"
								className="w-100 my-2"
							>
								Đăng ký ngay
							</Button>
						</Form>
						<p className="my-2 text-center">
							Đã có tài khoản? <Link to={Routes.LoginPage.path}>Đăng nhập</Link>
						</p>
					</Card>
				</Container>

				{/* Modal dùng để show điều khoản và điều kiện, show=false để ẩn */}
				<Modal show={showTerm} onHide={handleCloseTerm}>
					<Modal.Header closeButton>
						<Modal.Title>Điều khoản và điều kiện</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Một số dịch vụ của chúng tôi có chứa phần mềm được cung
						cấp theo các điều khoản trong giấy phép nguồn mở mà
						chúng tôi cung cấp cho bạn. Đôi khi, giấy phép nguồn mở
						này có các điều khoản rõ ràng được ưu tiên áp dụng so
						với một số phần trong các điều khoản này. Do đó, xin
						đừng quên đọc các giấy phép đó. Bạn không được sao chép,
						sửa đổi, phân phối, bán hoặc cho thuê bất kỳ thành phần
						nào trong phần mềm hay các dịch vụ của chúng tôi. Ngoài
						ra, bạn cũng không được dùng kỹ thuật đảo ngược hoặc tìm
						cách trích xuất bất kỳ mã nguồn nào của chúng tôi trừ
						khi có sự cho phép bằng văn bản của chúng tôi hoặc luật
						hiện hành cho phép. Khi một dịch vụ nào đó cần có hoặc
						chứa phần mềm có thể tải xuống, thì trong một số trường
						hợp, phần mềm này có thể tự động cập nhật trên thiết bị
						của bạn ngay khi có sẵn một phiên bản hoặc tính năng
						mới. Một số dịch vụ cho phép bạn điều chỉnh các tùy chọn
						cài đặt về việc tự động cập nhật.
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={handleCloseTerm}>
							Đã hiểu
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal dùng để show đăng nhập thành công */}
				<Modal show={isSuccess} onHide={handleCloseTerm}>
					<Modal.Body>
						Đăng ký thành công, bạn có thể đăng nhập để bổ sung thông tin và sử dụng ngay bây giờ!
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" as={Link} to={Routes.LoginPage.path}>
							Đến trang đăng nhập
						</Button>
						<Button variant="secondary" onClick={() => setIsSuccess(false)}>
							Đóng
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
};

export default connect(
	(state) => {
		return {
			userInfo: state,
		};
	}
)(RegisterPage);
