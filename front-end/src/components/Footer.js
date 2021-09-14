import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="footer orange-gradient mt-5 p-4">
			<Container>
				<Row>
					<Col sm={12} md={6}>
						<h5 className="fw-bold">Giới thiệu</h5>
						<p style={{ textAlign: "justify" }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Phasellus consectetur diam eu dignissim
							ultricies. Mauris pulvinar augue at risus dictum
							pulvinar. In porta at nisi a ultricies. Phasellus
							volutpat tempus arcu, sollicitudin interdum elit
							scelerisque id. Mauris ac leo non arcu finibus
							suscipit.
						</p>
					</Col>
					<Col sm={6} md={3}>
						<h5 className="fw-bold">Về chúng tôi</h5>
						<ul className="list-unstyled">
							<li>Liên hệ</li>
							<li>Chính sách</li>
							<li>Điều khoản sử dụng</li>
							<li>Báo cáo lạm dụng</li>
						</ul>
					</Col>

					<Col sm={6} md={3}>
						<h5 className="fw-bold">Dành cho Nhà tuyển dụng</h5>
						<ul className="list-unstyled">
							<li>Đăng tin tuyển dụng</li>
							<li>Tìm kiếm ứng viên</li>
							<li>Thông tin công ty</li>
							<li>Báo cáo vi phạm</li>
						</ul>
					</Col>
				</Row>
				<hr />
			</Container>
			<Container>
				<div className="row">
					<div className="col-md-8 col-sm-6 col-xs-12">
						<p className="copyright-text">
							&copy; 2021 Created by Tan Tran Quoc
						</p>
					</div>

					<div className="col-md-4 col-sm-6 col-xs-12">
						<ul className="list-inline">
							<li className="list-inline-item">Facebook</li>
							<li className="list-inline-item">Youtube</li>
							<li className="list-inline-item">LinkedIn</li>
							<li className="list-inline-item">Twitter</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
