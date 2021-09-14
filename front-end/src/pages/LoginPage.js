import { Card, Button, Container, Form } from "react-bootstrap";
import { faAngleLeft, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleInput from "../components/SimpleInput";
import useSubmitForm from "../utils/CustomHooks"

const LoginPage = () => {

	const login = async () => {
		console.log("OK")
		console.log(inputs)
	}

	const { inputs, handleInputChange, handleSubmit } = useSubmitForm(login);

	return (
		<>
			<Container className="animate__animated animate__fadeIn">
				<div className="my-4 text-center">
					<FontAwesomeIcon
						icon={faAngleLeft}
						className="text-secondary"
					/>{" "}
					<Link to="/" className="link-secondary">
						Trở về trang chủ
					</Link>
				</div>
				<Card
					border="secondary"
					className="mx-auto mt-2 p-5 shadow form-width"
				>
					<Form onSubmit={handleSubmit}>
						<h3 className="fw-bold text-center my-4">
							Đăng nhập để sử dụng ngay!
						</h3>

						<SimpleInput
							label="Tên người dùng"
							faIcon={faUser}
							type="text"
							placeholder="nguyen_van_a"
							onChange={handleInputChange}
							value={inputs.username}
							name="username"
						/>

						<SimpleInput
							label="Mật khẩu"
							faIcon={faKey}
							type="password"
							placeholder="********"
							onChange={handleInputChange}
							value={inputs.password}
							name="password"
						/>

						<Form.Group className="my-2 d-flex justify-content-between">
							<Form.Check
								type="checkbox"
								label="Giữ tôi luôn đăng nhập"
							/>
							<Form.Label>
								<Link className="text-secondary">
									Quên mật khẩu?
								</Link>
							</Form.Label>
						</Form.Group>
						<Button
							variant="dark"
							type="submit"
							className="w-100 my-2"
						>
							Đăng nhập
						</Button>
					</Form>
					<p className="my-2 text-center">
						Chưa có tài khoản?{" "}
						<Link to="/register">Đăng ký ngay!</Link>
					</p>
				</Card>
			</Container>
		</>
	);
};
export default LoginPage;
