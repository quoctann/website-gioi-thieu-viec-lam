import React, { useState } from "react";
import {
	Container,
	Form,
	Card,
	Button,
	Modal,
	FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faKey,
	faAngleLeft,
	faUser,
	faAddressCard,
	faEnvelope,
	faBuilding,
	faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
// Một ô thành phần input tùy chỉnh
import SimpleInput from "../components/SimpleInput";
// Thư viện UI chọn ngày tháng
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Thư viện thực hiện gọi API tương tác server
// import API from "../api/API"
import useSubmitForm from "../utils/CustomHooks";

const RegisterPage = () => {
	
	// Gửi request lên server
	const register = async () => {
		console.log(inputs)
		if (inputs.password === inputs.confirm_password) {
			const formData = new FormData();
			for (let k in inputs) {
				console.info(k, inputs[k]);
				formData.append(k, inputs[k]);
			}
		}
	}

	// Custom hook để xử lý tác vụ thường gặp với form
	const { inputs, handleInputChange, handleSubmit } = useSubmitForm(register);

	/*
	Note: trước khi post sv check pass & confirm pass,
	set vai_tro, rộng hơn có check username, email có 
	trùng ko, nếu có thì hiện lỗi. (form chung)
	NTD: giới thiệu có thể cập nhật sau khi tạo tk, set đợi xét duyệt = true
	*/
	// Lưu trạng thái hiển thị đăng ký ứng viên hay nhà tuyển dụng
	const HIRING = "Nhà tuyển dụng";

	const APPLICANT = "Ứng viên";

	const [registerType, setRegisterType] = useState("");
	
	// Lưu media file
	const avatar = React.createRef();

	// Lưu ngày sinh (chỉ đối với ứng viên)
	const [birthday, setBirthday] = useState(new Date());

	// Lưu quy mô công ty (chỉ đối với nhà tuyển dụng)
	const companySize = {
		small: "sm",
		medium: "md",
		large: "lg",
	};

	// Handle nút bấm chọn loại tài khoản cần đăng ký
	const toggleSelection = () => {
		if (registerType === APPLICANT) setRegisterType(HIRING);
		else setRegisterType(APPLICANT);
	};

	// Handle chức năng xem điều khoản và điều kiện
	const [showTerm, setShowTerm] = useState(false);

	const handleCloseTerm = () => setShowTerm(false);

	const handleShowTerm = () => setShowTerm(true);

	// Conditional render form tùy loại tài khoản
	let specificContent = null;

	if (registerType === HIRING)
		specificContent = (
			<>
				<SimpleInput
					label="Tên công ty"
					faIcon={faBuilding}
					type="text"
					placeholder="Công ty TNHH XYZ"
					required
					value={inputs.ten_cong_ty}
					onChange={handleInputChange}
					name="ten_cong_ty"
				/>

				<SimpleInput
					label="Địa chỉ"
					faIcon={faMapMarkerAlt}
					type="text"
					placeholder="123 Lê Thánh Tôn"
					required
					value={inputs.dia_chi}
					onChange={handleInputChange}
					name="dia_chi"
				/>

				<FormGroup>
					<Form.Label>Quy mô công ty</Form.Label>
					<Form.Select required>
						<option value={companySize.small}>
							Nhỏ (dưới 200 nhân viên)
						</option>
						<option value={companySize.medium}>
							Vừa (200 đến dưới 100 nhân viên)
						</option>
						<option vvalue={companySize.large}>
							Lớn (trên 1000 nhân viên)
						</option>
					</Form.Select>
				</FormGroup>
			</>
		);

	if (registerType === APPLICANT)
		specificContent = (
			<>
				<Form.Group>
					<Form.Label>Ngày sinh</Form.Label>
					<DatePicker
						selected={birthday}
						onChange={(date) => setBirthday(date)}
						className="form-control"
					/>
				</Form.Group>
			</>
		);
	
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
	
	// Khi trang nạp lần đầu hiện hộp thoại lựa chọn
	if (registerType === "") return question;

	// Form đăng ký có các trường input tùy loại tài khoản
	if (registerType === APPLICANT || registerType === HIRING)
		return (
			<>
				<Container className="animate__animated animate__fadeIn">
					<div className="my-4 text-center">
						<FontAwesomeIcon
							icon={faAngleLeft}
							className="text-secondary"
						/>{" "}
						<Link to="/" className="link-secondary no-decoration">
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
								Loại tài khoản: {registerType}{" "}
								<strong
									onClick={toggleSelection}
									className="text-link"
									style={{ cursor: "pointer" }}
								>
									<u>(Thay đổi)</u>
								</strong>
							</div>

							<SimpleInput
								label="Tên người dùng"
								faIcon={faUser}
								type="text"
								placeholder="tran_quoc_tan"
								required
								value={inputs.username}
								onChange={handleInputChange}
								name="username"
							/>

							<SimpleInput
								label="Tên của bạn"
								faIcon={faAddressCard}
								type="text"
								placeholder="Tấn"
								required
								value={inputs.first_name}
								onChange={handleInputChange}
								name="first_name"
							/>

							<SimpleInput
								label="Họ của bạn"
								faIcon={faAddressCard}
								type="text"
								placeholder="Trần Quốc"
								required
								value={inputs.last_name}
								onChange={handleInputChange}
								name="last_name"
							/>

							<SimpleInput
								label="Email"
								faIcon={faEnvelope}
								type="email"
								placeholder="nguoidung@mail.com"
								required
								value={inputs.email}
								onChange={handleInputChange}
								name="email"
							/>

							<SimpleInput
								label="Mật khẩu"
								faIcon={faKey}
								type="password"
								placeholder="********"
								required
								value={inputs.password}
								onChange={handleInputChange}
								name="password"
							/>

							<SimpleInput
								label="Nhập lại mật khẩu"
								faIcon={faKey}
								type="password"
								placeholder="********"
								required
								value={inputs.confirm_password}
								onChange={handleInputChange}
								name="confirm_password"
							/>

							{specificContent}

							<Form.Group className="my-4" controlId="avatar">
								<Form.Label>Avatar</Form.Label>
								<Form.Control type="file" ref={avatar} />
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
							Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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
			</>
		);
};

export default RegisterPage;
