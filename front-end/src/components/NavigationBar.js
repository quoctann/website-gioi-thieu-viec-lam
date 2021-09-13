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
							<Link to="/login" className="nav-link">Demo login</Link>
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
							<NavDropdown
								title="Dropdown"
								id="basic-nav-dropdown"
								className="me-auto"
							>
								<NavDropdown.Item href="#action/3.1">
									Action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav className="ms-auto">
							<Nav.Item>
								<Button className="mx-1" variant="outline-dark">
									<Link to="/register" className="no-decoration">Đăng ký</Link>
								</Button>
								<Button className="mx-1" variant="dark">
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
