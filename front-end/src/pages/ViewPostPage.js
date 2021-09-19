import { useEffect, useState } from "react";
import {
	Card,
	Button,
	Row,
	Col,
	Spinner,
	Container,
	// Pagination,
} from "react-bootstrap";
import API, { endpoints } from "../utils/API";
import PaginationBar from "../components/PaginationBar";

const ViewPostPage = () => {
	const [posts, setPosts] = useState();
	const [count, setCount] = useState(0);
	const [next, setNext] = useState("");
	const [previous, setPrevious] = useState("");

	const getPosts = async (page = 1) => {
		const res = await API.get(endpoints["posts"] + page);
		setPosts(res.data.results);
		setCount(res.data.count);
		setPrevious(res.data.previous);
		setNext(res.data.next);
		// console.log(res.data);
	};

	const gotoPostDetail = (postId) => {
		console.log(postId)
	}

	useEffect(() => {
		getPosts();
	}, []);
	// console.log(typeof posts, posts);

	if (posts)
		return (
			<Container className="animate__animated animate__fadeIn">
				<Row className="my-5">
					{posts.map((post, index) => {
						return (
							<>
								<Col md={6} sm={12} className="p-2">
									<Card>
										<Card.Body>
											<Card.Title>
												{post.tieu_de}
											</Card.Title>
											<Card.Text>
												{post.noi_dung}
											</Card.Text>
											<Button onClick={() => gotoPostDetail(post.id)} variant="primary">
												Chi tiết
											</Button>
										</Card.Body>
									</Card>
								</Col>
							</>
						);
					})}
				</Row>
				<div className="d-flex align-center justify-content-center my-5">
					{/* {pagination} */}
					<PaginationBar
						count={count}
						getPosts={getPosts}
						previous={previous}
						next={next}
						defaultGet={6}
					/>
				</div>
			</Container>
		);
	else
		return (
			<Spinner
				animation="border"
				role="status"
				className="mx-auto align-middle"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
};

export default ViewPostPage;
