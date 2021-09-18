import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleLogo from "./SimpleLogo";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { authUser } from "../redux/actions";

const NavigationBar = (props) => {
	
	const user = props.userInfo.userReducer;

	let rightCorner = (
		<>
			<Nav.Item>
				<Button
					as={Link}
					to="/register"
					className="me-1"
					variant="outline-dark"
				>
					Đăng ký
				</Button>
				<Button as={Link} to="/login" className="ms-1" variant="dark">
					Đăng nhập
				</Button>
			</Nav.Item>
		</>
	);

	if (user) {
		rightCorner = (
			<>
				<Nav.Item>
					<Button
						as={Link}
						to="/"
						className="ms-1"
						variant="outline-dark"
					>
						Xin chào {user.first_name} {user.last_name}!
					</Button>
					<Button className="ms-1" variant="dark">
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
					<Navbar.Brand as={Link} to="/">
						<SimpleLogo />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav>
							<Nav.Link as={Link} to="/">
								Trang chủ
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								Xem tin tuyển dụng
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
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
			emitUser: (user) => dispatch(authUser(user)),
		};
	}
)(NavigationBar);
