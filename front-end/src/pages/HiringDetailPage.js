import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faStar, faUsers} from "@fortawesome/free-solid-svg-icons"
import API, { endpoints } from "../utils/API"

import pic from "../assets/images/python.jpg"
import LoadingOverlay from "../components/LoadingOverlay"
import PaginationBar from "../components/PaginationBar"

const HiringDetailPage = (props) => {

    // Hứng res trả ra để phân trang
	const [count, setCount] = useState(0);

	const [next, setNext] = useState("");

	const [previous, setPrevious] = useState("");

    const [detail, setDetail] = useState({})

    const [ratings, setRatings] = useState([])

    const hiringid = props.hiring.commonReducer.hiringId;

    const getRating = async(hiringId = hiringid, page = 1) => {
        const rating = await API.get(endpoints["hiring-rating"] + `?hiring-id=${hiringId}&page=${page}`)
        console.log(rating.data)
        setCount(rating.data.count);
        setNext(rating.data.next);
        setPrevious(rating.data.previous);
        setRatings(rating.data.result)
    };

    const getDetail = async () => {
        const detail = await API.get(endpoints["hiring"] + `${props.hiring.commonReducer.hiringId}/`)
        console.log(detail.data)
        setDetail(detail.data)
    };

    useEffect(() => {
        getDetail();
        getRating(); 
    }, [])

    // So sánh == thì chạy ngon, === lỗi
    if (!Object.keys(detail).length == 0)
        return (
            <>
                <Container>
                    <Row className="my-5">
                        <Col sm={12} md={8} className="mb-2">
                            <Card className="p-4 mb-2" border="dark">
                                <Card.Title>
                                    <Row className="d-flex align-items-center">
                                        <Col sm={2}><h2><Image src={detail.nguoi_dung.anh_dai_dien} rounded fluid /></h2></Col>
                                        <Col sm={10}><h2 className="fw-bold">{detail.ten_cong_ty}</h2></Col>
                                    </Row>
                                </Card.Title>
                                <hr />
                                <Card.Body>
                                    <Card.Text className="text-justify">{detail.gioi_thieu}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="p-2 mb-2" border="dark">
                                <Card.Title>Đánh giá</Card.Title>
                                <Card.Body>
                                    {ratings.map((rating, index) => {
                                        return (
                                            <>  
                                                <Card className="p-2 mb-2">
                                                    <p>Name: {rating.ung_vien.nguoi_dung.last_name} {rating.ung_vien.nguoi_dung.first_name}</p>
                                                    <p>Rate: {rating.diem_danh_gia}</p>
                                                    <p>Content: {rating.noi_dung}</p>
                                                </Card>

                                            </>
                                        )
                                    })}
                                    <PaginationBar
                                        count={count}
                                        next={next}
                                        previous={previous}
                                        defaultGet={6}
                                        getPosts={(page) => getRating(hiringid, page)}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={4} className="mb-2">
                            <Card className="p-4" border="dark">
                                <Card.Body>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faMapMarkerAlt} /></Col>
                                        <Col>Dia chi: {detail.dia_chi}</Col>
                                    </Row>
                                    <Row as="p">
                                        <Col sm={1}><FontAwesomeIcon icon={faUsers} /></Col>
                                        <Col>Quy mô công ty: {detail.quy_mo} nhân viên</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    else
        return (
            <LoadingOverlay />
        )
}

export default connect(
    (state) => {
        return {
            hiring: state
        }
    }
)(HiringDetailPage);