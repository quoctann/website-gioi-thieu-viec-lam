// LandingPage: trang đầu tiên nạp khi người dùng vào website
import React, { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Image, InputGroup, FormControl, Button, Card, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../components/PaginationBar"

// Ảnh của carousel
import pic1 from "../assets/images/1.jpg";
import pic2 from "../assets/images/2.jpg";
import pic3 from "../assets/images/3.jpg";

// Thư viện hoạt ảnh
import "animate.css";

// Enpoint để gửi request
import API, { endpoints } from "../utils/API";

const LandingPage = () => {
	// Đoạn chữ cạnh hình (carousel)
	const CarouselCaption = (props) => {
		return (
			<div className="d-flex flex-column animate__animated animate__fadeIn">
				<b
					style={{ fontSize: "3rem", fontFamily: "Nunito" }}
					className="pt-4"
				>
					{props.title}
				</b>
				<p>{props.text}</p>
			</div>
		);
	};

	const carouselCaption = [
		<CarouselCaption
			title="Mọi nhu cầu công việc ở một nơi"
			text={
				<>
					<span className="brand-font">Job on the go! </span>chuyên
					cung cấp các giải pháp việc làm tối ưu, cầu nối giữa ứng
					viên và nhà tuyển dụng. Uy tín và chất lượng luôn được quan
					tâm đặt lên hàng đầu.
				</>
			}
		/>,
		<CarouselCaption
			title="Dễ dàng tìm công việc phù hợp"
			text={
				<>
					Với <span className="brand-font">Job on the go! </span>
					bạn có thể dễ dàng tìm kiếm các công việc phù hợp với trình
					độ, kỹ năng của bản thân.
				</>
			}
		/>,
		<CarouselCaption
			title="Hàng nghìn ứng viên sẵn sàng"
			text={
				<>
					Giải pháp giúp việc tuyển dụng của doanh nghiệp hiệu quả và
					đơn giản hơn, đừng bỏ lỡ những ứng viên tiềm năng tại{" "}
					<span className="brand-font">Job on the go!</span>
				</>
			}
		/>,
	];

	const [slideIndex, setSlideIndex] = useState(0);

	// Handle select trên carousel (click tay)
	const handleSelect = (selectedIndex, e) => {
		setSlideIndex(selectedIndex);
	};

	const [showSearchResult, setShowSearchResult] = useState(false)

	const [searchResult, setSearchResult] = useState([])

	const [searchInput, setSearchInput] = useState("")

	const handleSearch = async (text = searchInput, page = 1) => {
		const res = await API.get(endpoints["search-hiring-by-name"] + `?name=${text}&page=${page}`)
		
		if (res.data.length > 0) {
			let result = [];
			for (let i = 0; i < res.data.length; i++) {
				result.push(res.data[i])
			}
			setSearchResult(result);
			setShowSearchResult(true);
		} else if (res.data.length === 0) {
			setSearchResult([])
			setShowSearchResult(true);
		}

	}

	useEffect(() => {
		// setInterval cho nó tự chạy slide carousel - nội dung (caption)
		let tempIdx = slideIndex;
		const interval = setInterval(() => {
			if (tempIdx < carouselCaption.length) {
				setSlideIndex(tempIdx);
				tempIdx++;
			} else {
				tempIdx = 0;
				setSlideIndex(tempIdx);
			}
		}, 3250);
		return () => clearInterval(interval);
	});

	return (
		<>
			{/* Carousel chạy chữ/hình */}
			<div className="orange-gradient" style={{ height: "25rem" }}>
				<Container>
					<Row>
						<Col sm={12} md={6} style={{ height: "25rem" }}>
							{carouselCaption[slideIndex]}
						</Col>
						<Col sm={12} md={6} className="sm-hidden">
							<Carousel
								fade
								className="landing-page-carousel"
								activeIndex={slideIndex}
								onSelect={handleSelect}
							>
								<Carousel.Item>
									<Image
										className=""
										src={pic1}
										alt="First slide"
										fluid
										rounded
									/>
								</Carousel.Item>
								<Carousel.Item>
									<Image
										className=""
										src={pic2}
										alt="Second slide"
										fluid
										rounded
									/>
								</Carousel.Item>
								<Carousel.Item>
									<Image
										className=""
										src={pic3}
										alt="Third slide"
										fluid
										rounded
									/>
								</Carousel.Item>
							</Carousel>
						</Col>
					</Row>
				</Container>
			</div>
			<Container>
				{/* Tìm nhà tuyển dụng */}
				<div>
					<h4 className="mb-4 mt-5 text-center text-primary">Tìm công ty bạn muốn ứng tuyển ngay hôm nay!</h4>
					<div className="form-width mx-auto my-4">
						<InputGroup size="md">
							<FormControl
								placeholder="Tìm nhà tuyển dụng"
								value={searchInput}
								onChange={(event) =>
									setSearchInput(event.target.value)
								}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleSearch();
								}}
							/>
							<Button
								variant="primary"
								onClick={() => handleSearch()}
							>
								<FontAwesomeIcon icon={faSearch} className="fa-light" />
							</Button>
						</InputGroup>
					</div>
					{/* Hiển thị kết quả tìm kiếm nếu có */}
					{showSearchResult ? (
						<div>
							<h4 className="text-center fw-bold">Kết quả tìm kiếm</h4>
							<Row className="my-3">
								{searchResult.length > 0 ? (
									searchResult.map((result, index) => {
										return (
											<Col md={6} sm={12} className="p-2">
												<Card className="animate__animated animate__fadeIn">
													<Card.Body>
														<Card.Title className="fw-bold">{result.ten_cong_ty}</Card.Title>
														<hr />
														<Card.Subtitle>
															<p>
																Điểm đánh giá:{" "}
																{result.diem_danh_gia_tb}{" "}
																<FontAwesomeIcon icon={faStar} className="fa-warning" />
															</p>
														</Card.Subtitle>
														<Card.Text className="text-justify">
															{result.gioi_thieu.substr(0,245)}...
														</Card.Text>
														<Button variant="primary">
															Xem chi tiết công ty
														</Button>
													</Card.Body>
												</Card>
											</Col>
										);
									})
								) : (
									<Col>
										<Alert
											variant="secondary"
											className="form-width mx-auto text-center"
										>
											Không có kết quả phù hợp
										</Alert>
									</Col>
								)}
							</Row>
							<div className="d-flex justify-content-center">
								<PaginationBar
									defaultGet="6"
									count={searchResult.length}
									getPosts={(number) => handleSearch(searchInput, number)}
									next={null}
									previous={null}
								/>
								</div>
						</div>
					) : (
						<></>
					)}
				</div>

				{/* Văn bản giả */}
				<Row className="my-5 d-flex flex-row align-items-center">
					<Col sm={12} md={6}>
						<Image src={pic3} fluid />
					</Col>
					<Col sm={12} md={6}>
						<div>
							<h2 className="fw-bold">Lorem islum dolo</h2>
							<p style={{ textAlign: "justify" }}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Curabitur ut est blandit,
								venenatis risus in, sollicitudin sem. Integer
								laoreet quam augue, sit amet accumsan urna
								laoreet viverra. Suspendisse arcu tortor,
								blandit id libero ac, laoreet sodales nulla.
								Maecenas mattis ligula leo, non congue lacus
								rhoncus nec. Sed convallis mi lectus, in
								facilisis metus maximus non. Donec odio sapien,
								dignissim eleifend lacinia quis, varius eget
								ligula. Proin a eros suscipit, pellentesque nibh
								sit amet, lacinia ante. Etiam quis consequat
								justo. Quisque non leo metus.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default LandingPage;
