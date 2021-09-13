// LandingPage: trang đầu tiên nạp khi người dùng vào website
import React, { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Image } from "react-bootstrap";

// Ảnh của carousel
import pic1 from "../assets/image/1.jpg";
import pic2 from "../assets/image/2.jpg";
import pic3 from "../assets/image/3.jpg";

// Thư viện hoạt ảnh
import "animate.css";

export default function HomePage() {

	// Đoạn chữ cạnh hình (carousel)
	const CarouselCaption = (props) => {
		return (
			<div className="d-flex flex-column animate__animated animate__fadeIn">
				<b style={{fontSize: "3rem"}} className="pt-4">
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
					Với
					<span className="brand-font">Job on the go! </span>
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
			<div className="orange-gradient" style={{ height: "25rem" }}>
				<Container>
					<Row>
						<Col sm={12} md={6} style={{height: "25rem"}}>
							{carouselCaption[slideIndex]}
						</Col>
						<Col sm={12} md={6}>
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
				<div style={{ height: "20rem" }}>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Sed maiores ipsum dicta! Aut rem in quasi
						voluptate esse quae facere provident, asperiores
						delectus dolorem quis veniam, nobis iusto sed adipisci!
					</p>
				</div>
				<div style={{ height: "20rem" }}>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Sed maiores ipsum dicta! Aut rem in quasi
						voluptate esse quae facere provident, asperiores
						delectus dolorem quis veniam, nobis iusto sed adipisci!
					</p>
				</div>
				<div style={{ height: "20rem" }}>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Sed maiores ipsum dicta! Aut rem in quasi
						voluptate esse quae facere provident, asperiores
						delectus dolorem quis veniam, nobis iusto sed adipisci!
					</p>
				</div>
			</Container>
		</>
	);
}