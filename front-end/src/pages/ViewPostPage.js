import { useEffect, useState } from "react";
import {
	Card,
	Button,
	Row,
	Col,
	Container,
	// Pagination,
} from "react-bootstrap";
import API, { endpoints } from "../utils/API";
import PaginationBar from "../components/PaginationBar";
import Routes from "../routes";
import LoadingOverlay from "../components/LoadingOverlay";

const ViewPostPage = (props) => {
	const [posts, setPosts] = useState();
	const [count, setCount] = useState(0);
	const [next, setNext] = useState("");
	const [previous, setPrevious] = useState("");

	const getPosts = async (page = 1) => {
		try {
			const res = await API.get(endpoints["posts"] + `?page=${page}`);
			setPosts(res.data.results);
			setCount(res.data.count);
			setPrevious(res.data.previous);
			setNext(res.data.next);
			// console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const gotoPostDetail = (postId) => {
		props.history.push(Routes.PostDetailPage.path + "?id=" + postId);
	};

	useEffect(() => {
		getPosts();
	}, []);
	// console.log(typeof posts, posts);

	if (posts)
		return (
			<Container>
				<Row className="my-5">
					{posts.map((post, index) => {
						return (
							<>
								<Col md={6} sm={12} className="p-2">
									<Card className="animate__animated animate__fadeIn">
										<Card.Body>
											<Card.Title>
												{post.tieu_de}
											</Card.Title>
											<Card.Text className="text-justify">
												{(post.noi_dung).substr(0, 245)}...
											</Card.Text>
											<Button
												onClick={() =>
													gotoPostDetail(post.id)
												}
												variant="primary"
											>
												Xem chi tiết
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
	else return <LoadingOverlay />;
};

export default ViewPostPage;
