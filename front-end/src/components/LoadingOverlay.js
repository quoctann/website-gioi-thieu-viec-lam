import { Spinner, Container } from "react-bootstrap";
const LoadingOverlay = () => {
	return (
		<Container style={{height: '50vh'}} className="d-flex align-items-center justify-content-center my-5">
			<Spinner
				animation="border"
				role="status"
				variant="secondary"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</Container>
	);
};

export default LoadingOverlay;
