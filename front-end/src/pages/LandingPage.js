// LandingPage: trang đầu tiên nạp khi người dùng vào website
import React, { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Image, InputGroup, FormControl, Button, Card, Alert, Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBuilding, faCogs, faCommentDollar, faFilter, faGraduationCap, faMedal, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../components/PaginationBar"
import { HomeFakeParagraph } from "../utils/Placeholder"

// Ảnh của carousel
import pic1 from "../assets/images/1.jpg";
import pic2 from "../assets/images/2.jpg";
import pic3 from "../assets/images/3.jpg";

// Thư viện hoạt ảnh
import "animate.css";

// Enpoint để gửi request
import API, { endpoints } from "../utils/API";
import { connect } from "react-redux";

// Tương tác với dữ liệu global redux
import { viewHiringPage, viewPostPage } from "../redux/actions"
import Routes from "../routes";

const LandingPage = (props) => {
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

	// setInterval cho nó tự chạy slide carousel - nội dung (caption)
	const animateCarousel = () => {
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
	}

	// Handle chức năng tìm kiếm nhà tuyển dụng
	const [showSearchResult, setShowSearchResult] = useState(false)
	const [searchResult, setSearchResult] = useState([])
	const [searchInput, setSearchInput] = useState("")

	// Hứng res trả ra từ server để hiện thanh phân trang
	const [count, setCount] = useState(0);
	const [next, setNext] = useState("");
	const [previous, setPrevious] = useState("");
	
	// Handle chức năng tìm kiếm nhà tuyển dụng theo tên
	const handleSearch = async (text = searchInput, page = 1) => {
		const res = await API.get(endpoints["search-hiring-by-name"] + `?name=${text}&page=${page}`)
		
		if (res.data) {
			// console.log(res.data.result)
			let result = [];
			for (let i = 0; i < res.data.result.length; i++) {
				result.push(res.data.result[i])
			}
			// console.log(res.data)
			setSearchResult(result);
			setNext(res.data.next);
			setPrevious(res.data.previous)
			setCount(res.data.count)
			setShowSearchResult(true);		
		}
	}

	// Get thông tin có sẵn trên server các danh mục để lọc
	const [degrees, setDegrees] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([])
	const [careers, setCareers] = useState([]);

	// Gửi request để lấy dữ liệu
	const getFilterCategory = async () => {
		const degreesRes = await API.get(endpoints["degree"]);
		const skillsRes = await API.get(endpoints["skill"]);
		const expRes = await API.get(endpoints["experience"]);
		const careersRes = await API.get(endpoints["career"]);
		setDegrees(degreesRes.data)
		setSkills(skillsRes.data)
		setExperiences(expRes.data)
		setCareers(careersRes.data) 
	}

	// Dữ liệu lọc sẽ được gửi lên server
	const [filterData, setFilterData] = useState({
		"career": "1",
		"degree": "1",
		"experience": "1",
		"skill": "1",
	})

	// Handle thay đổi giá trị select của người dùng
	const handleSelectChange = (event) => {
		setFilterData({
			...filterData,
			[event.target.name]: event.target.value
		})
	}
	
	const [filterResult, setFilterResult] = useState({})
	const [isFirstLoad, setIsFirstLoad] = useState(true)
	// Tiến hành lọc trả ra kết quả cho người dùng (khi nhấn nút filter)
	const handleFilter = async (page = 1) => {
		const res = await API.get(endpoints["job-filter"] + 
			`?career=${filterData.career}&degree=${filterData.degree}&experience=${filterData.experience}&skill=${filterData.skill}&page=${page}`
		);
		setFilterResult({...filterResult, ...res.data});
		setIsFirstLoad(false);
	}

	useEffect(() => {
		getFilterCategory();
		animateCarousel();
	}, []);

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
														<Button 
															onClick={() => {
																props.viewHiringPage(result.nguoi_dung_id);
																props.history.push(Routes.HiringDetailPage.path);
															}} 
															variant="primary"
														>
															Xem chi tiết nhà tuyển dụng
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
									defaultGet={6}
									count={count}
									getPosts={(page) => handleSearch(searchInput, page)}
									next={next}
									previous={previous}
								/>
								</div>
						</div>
					) : (
						<></>
					)}
				</div>

				{/* Văn bản giả */}
				<HomeFakeParagraph image={pic1} />
						
				{/* Filter việc làm theo nhiều tiêu chí */}
				<div className="my-5">
					<h4 className="mb-4 mt-5 text-center text-primary">Tìm kiếm công việc phù hợp với bạn!</h4>
					<Row className="mb-4">
						<Col>
							<FloatingLabel
								controlId="floatingSelect" 
								label={
									<span>
										<FontAwesomeIcon icon={faGraduationCap}/> Bằng cấp
									</span>
								}
							>
								<Form.Select name="degree" onChange={(event) => handleSelectChange(event)}>
									{degrees.map((deg, index) => {
										return (
											<option selected={index===0?true:false} value={deg.id}>{deg.ten}</option>
										)
									})}
								</Form.Select>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingSelect" 
								label={
									<span>
										<FontAwesomeIcon icon={faCogs}/> Kỹ năng
									</span>
								}
							>
								<Form.Select name="skill" onChange={(event) => handleSelectChange(event)}>
									{skills.map((skill, index) => {
										return (
											<option selected={index===0?true:false} value={skill.id}>{skill.ten}</option>
										)
									})}
								</Form.Select>
							</FloatingLabel>
						</Col>
					</Row>
					<Row className="mb-4">
						<Col>
							<FloatingLabel
								controlId="floatingSelect" 
								label={
									<span>
										<FontAwesomeIcon icon={faBriefcase}/> Ngành nghề
									</span>
								}
							>
								<Form.Select name="career" onChange={(event) => handleSelectChange(event)}>
									{careers.map((career, index) => {
										return (
											<option selected={index===0?true:false} value={career.id}>{career.ten}</option>
										)
									})}
								</Form.Select>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingSelect" 
								label={
									<span>
										<FontAwesomeIcon icon={faMedal}/> Kinh nghiệm
									</span>
								}
							>
								<Form.Select name="experience" onChange={(event) => handleSelectChange(event)}>
									{experiences.map((exp, index) => {
										return (
											<option selected={index===0?true:false} value={exp.id}>{exp.ten}</option>
										)
									})}
								</Form.Select>
							</FloatingLabel>
						</Col>
					</Row>
					<div className="d-flex justify-content-center">
						<Button onClick={() => handleFilter()} className="w-25">
							<FontAwesomeIcon icon={faFilter} className="fa-light me-2"/>
							Lọc việc làm
						</Button>	
					</div>			
				</div>

				{/* Kết quả filter */}
				<Row>
					{filterResult.count > 0 
					? (
						(filterResult.result).map((post, index) => {
							return (
								<Col md={6} sm={12} className="p-2">
									<Card className="animate__animated animate__fadeIn">
										<Card.Body>
											<Card.Title className="fw-bold">
												<h4 className="fw-bold">{post.tieu_de}</h4>
												<Row as="p">
													<Col sm={1}><FontAwesomeIcon icon={faBuilding} /></Col>
													<Col>{post.nha_tuyen_dung__ten_cong_ty}</Col>
												</Row>
												<Row as="p">
													<Col sm={1}><FontAwesomeIcon icon={faCommentDollar}/></Col>
													<Col>
														Mức lương:{" "}
														<span className="text-danger">
															{post.luong === 0
																? "Thương lượng"
																: new Intl.NumberFormat(
																		"vi-VN",
																		{
																			style: "currency",
																			currency: "VND",
																		}
																).format(post.luong)}
														</span>
													</Col>
												</Row>
											</Card.Title>
											<hr />
											<Card.Text className="text-justify">
												{post.noi_dung.substr(0,150)}...
											</Card.Text>
											<Button 
												variant="primary"
												onClick={() => {
													// props.viewPostPage(post.id);
													props.history.push(Routes.PostDetailPage.path + `?id=${post.id}`);
												}} 
											
											>Xem chi tiết</Button>
										</Card.Body>
									</Card>
								</Col>
							)
						})
					) 
					: (
						(isFirstLoad ? (<></>) : (
							<Col>
								<Alert
									variant="secondary"
									className="form-width mx-auto text-center"
								>
									Không có kết quả phù hợp
								</Alert>
							</Col>
						))
					)
					}
						
				</Row>


				<HomeFakeParagraph image={pic2} />
			</Container>
		</>
	);
}
export default connect(
	(state) => {
		return {}
	},
	(dispatch) => {
		return {
			viewHiringPage: (id) => dispatch(viewHiringPage(id)),
		}
	}
)(LandingPage);
