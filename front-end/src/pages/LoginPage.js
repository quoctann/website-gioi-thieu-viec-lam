import { Card, Button, Container, Form } from "react-bootstrap";
import { faAngleLeft, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import cookies from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleInput from "../components/SimpleInput";
import useSubmitForm from "../utils/CustomHooks";
import API, { endpoints } from "../utils/API";
import { connect } from "react-redux";
import { authUser } from "../redux/actions";

const LoginPage = (props) => {
	const login = async () => {
		try {
			const info = await API.get(endpoints["oauth2-info"]);
			const res = await API.post(endpoints["login"], {
				client_id: info.data.client_id,
				client_secret: info.data.client_secret,
				username: inputs.username,
				password: inputs.password,
				grant_type: "password",
			});

			// console.log(res.data);
			cookies.save("access_token", res.data.access_token);

			const user = await API.get(endpoints["current-user"], {
				headers: {
					Authorization: `Bearer ${cookies.load("access_token")}`,
				},
			});
			// console.log("Get user data: \n", user.data)
			cookies.save("user", user.data);
			// Dispatch lên store thông tin user (ko render trang này nữa)
			props.emitUser(user.data);
		} catch (err) {
			console.log(err);
		}
	};

	const { inputs, handleInputChange, handleSubmit } = useSubmitForm(login);

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
/*
	Redux connect() ko truyền gì cả vẫn sử dụng được, thông thường nó nhận 2
	tham số optional: state và dispatch để map tới props, dùng props để truy cập
	những thằng này thay vì gọi dispatch trực tiếp trong component. Lưu ý nên
	trả ra nguyên một state và khi sử dụng trong component cần gì thì trỏ đến
	chi tiết, để khi state nào thay đổi nó sẽ render lại chỉ component dùng
	state đó thôi
*/
export default connect(
	(state) => {
		return {
			userData: state,
		};
	},
	(dispatch) => {
		return {
			emitUser: (user) => dispatch(authUser(user)),
		};
	}
)(LoginPage);
