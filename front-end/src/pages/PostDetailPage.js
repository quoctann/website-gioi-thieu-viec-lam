import {
    faBriefcase,
	faBuilding,
	faCalendar,
    faCalendarTimes,
    faCheckDouble,
    faCogs,
    faCommentDollar,
    faGraduationCap,
    faMapMarkerAlt,
    faMedal,
    faStar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import API, { endpoints } from "../utils/API";

const PostDetailPage = () => {
	// Đối tượng của react router lưu thông tin param
	const params = new URLSearchParams(useLocation().search);

	const postId = params.get("id");

	const [post, setPost] = useState();

	const getPostDetail = async (id = postId) => {
		try {
			const res = await API.get(endpoints["post-detail"] + id + "/");
			setPost(res.data);
			console.log(typeof res.data, res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPostDetail();
	}, []);

    // Đổi yyyy/mm/dd thành dd/mm/yyyy
    const formatDate = (date) => {
        let datePart = date.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1], day = datePart[2];
        
        return day+'/'+month+'/'+year;
    }

    const infoDetail = (item) => {
        return (
            <div className="text-center">
                <p><FontAwesomeIcon icon={item.icon} /> {item.title}</p>
                {(item.arr).length > 0 
                ?   (item.arr).map(i => {
                        return <Badge pill className="m-1 p-1" bg={item.bg}>{i.ten}</Badge>
                    })
                :   <span className="text-muted">Không có yêu cầu</span>
                }
            </div>
        );
    }

	if (post)
		return (
			<>
				<Container>
					<Row className="my-5">
						<Col sm={12} md={8} className="mb-2">
							<Card className="p-4" border="dark">
								<Card.Title>
									<h2 className="fw-bold">{post.tieu_de}</h2>
								</Card.Title>
								<Card.Subtitle>
									<div className="d-flex flex-row align-items-center mb-3">
										<h4 className="m-0 ms-1">
                                            <span className="me-2">
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </span>
											{post.nha_tuyen_dung.ten_cong_ty}
										</h4>
									</div>
									<div className="d-flex flex-row align-items-center mb-3">
										<h4 className="m-0 ms-1">
                                            <span className="me-2">
                                                <FontAwesomeIcon icon={faCommentDollar}/>
                                            </span>
											Mức lương:{" "}
                                            <span className="fw-bold text-danger">
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
										</h4>
									</div>
								</Card.Subtitle>
								<hr />
								<Card.Body>
                                    <Card.Text className="text-justify">{post.noi_dung}</Card.Text>
                                </Card.Body>
                                <hr />
                                <Button variant="success">Nộp đơn ứng tuyển</Button>
							</Card>
						</Col>
						<Col sm={12} md={4} className="mb-2">
							<Card className="p-4" border="dark">
								<Card.Body>
									<p>
										<FontAwesomeIcon icon={faCalendar} />{" "}
										Ngày đăng: {formatDate(post.ngay_tao)}
									</p>
									<p>
                                        <FontAwesomeIcon icon={faCalendarTimes} />{" "}
                                        Ngày hết hạn: {formatDate(post.ngay_het_han)}
                                    </p>
									<p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />{"  "}
                                        Địa chỉ: {post.nha_tuyen_dung.dia_chi}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faUsers} />{"  "}
                                        Quy mô: {post.nha_tuyen_dung.quy_mo} nhân viên
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faStar} />{"  "}
                                        Điểm đánh giá công ty: {post.nha_tuyen_dung.diem_danh_gia_tb} 
                                    </p>
									<hr />
                                    {infoDetail({
                                        icon: faCheckDouble,
                                        title: "Phúc lợi",
                                        arr: post.phuc_loi,
                                        bg: "success"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faGraduationCap,
                                        title: "Bằng cấp",
                                        arr: post.bang_cap,
                                        bg: "danger"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faBriefcase,
                                        title: "Ngành nghề",
                                        arr: post.nganh_nghe,
                                        bg: "info"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faMedal,
                                        title: "Kinh nghiệm",
                                        arr: post.kinh_nghiem,
                                        bg: "primary"
                                    })}
                                    <hr />
                                    {infoDetail({
                                        icon: faCogs,
                                        title: "Kỹ năng",
                                        arr: post.ky_nang,
                                        bg: "secondary"
                                    })}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	else return <LoadingOverlay />;
};

export default PostDetailPage;
