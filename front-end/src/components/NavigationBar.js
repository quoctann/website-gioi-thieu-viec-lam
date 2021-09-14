import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleLogo from "./SimpleLogo"

const NavigationBar = () => {
	return (
		<>
			<Navbar
				bg="dark"
				expand="lg"
				className="orange-gradient"
				sticky="top"
			>
				<Container>
					<Navbar.Brand>
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
						<Nav className="ms-auto">
							<Nav.Item>
								<Button className="me-1" variant="outline-dark">
									<Link to="/register" className="no-decoration">Đăng ký</Link>
								</Button>
								<Button className="ms-1" variant="dark">
									<Link to="/login" className="no-decoration">Đăng nhập</Link>
								</Button>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
