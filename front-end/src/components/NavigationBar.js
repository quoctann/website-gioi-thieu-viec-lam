import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleLogo from "./SimpleLogo";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../redux/actions";
import Routes from "../routes"
import cookies from "react-cookies";

const NavigationBar = (props) => {
	
	let user = props.userInfo.userReducer;
	// console.log("NAV\n", user)

	const signOut = () => {
		cookies.remove("user");
		cookies.remove("access_token");
		props.signOut()
	}

	let rightCorner = (
		<>
			<Nav.Item>
				<Button
					as={Link}
					to={Routes.RegisterPage.path}
					className="me-1"
					variant="outline-dark"
				>
					Đăng ký
				</Button>
				<Button as={Link} to={Routes.LoginPage.path} className="ms-1" variant="dark">
					Đăng nhập
				</Button>
			</Nav.Item>
		</>
	);
	// Nếu user không rỗng
	if (user.hasOwnProperty("username")) {
		rightCorner = (
			<>
				<Nav.Item>
					<Button
						as={Link}
						to={Routes.UserDetailPage.path}
						className="ms-1"
						variant="outline-dark"
					>
						Xin chào {user.first_name} {user.last_name}!
					</Button>
					<Button className="ms-1" variant="dark" onClick={signOut}>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className="fa-light"
						/>{" "}
						Đăng xuất
					</Button>
				</Nav.Item>
			</>
		);
	}
	return (
		<>
			<Navbar
				bg="dark"
				expand="lg"
				className="orange-gradient"
				sticky="top"
			>
				<Container>
					<Navbar.Brand as={Link} to={Routes.LandingPage.path}>
						<SimpleLogo />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav>
							<Nav.Link as={Link} to={Routes.LandingPage.path}>
								Trang chủ
							</Nav.Link>
							<Nav.Link as={Link} to={Routes.ViewPostPage.path}>
								Xem tin tuyển dụng
							</Nav.Link>
							<Nav.Link as={Link} to={Routes.LoginPage.path}>
								Dashboard
							</Nav.Link>
						</Nav>
						<Nav className="ms-auto">{rightCorner}</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default connect(
	(state) => {
		return {
			userInfo: state,
		};
	},
	(dispatch) => {
		return {
			signOut: () => dispatch(logout())
		};
	}
)(NavigationBar);
