import { Row, Col, Image } from "react-bootstrap";

const HomeFakeParagraph = (props) => {
	return (
		<Row className="my-5 d-flex flex-row align-items-center">
			<Col sm={12} md={6}>
				<Image src={props.image} fluid />
			</Col>
			<Col sm={12} md={6}>
				<div>
					<h2 className="fw-bold">Lorem islum dolo</h2>
					<p style={{ textAlign: "justify" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Curabitur ut est blandit, venenatis risus in,
						sollicitudin sem. Integer laoreet quam augue, sit amet
						accumsan urna laoreet viverra. Suspendisse arcu tortor,
						blandit id libero ac, laoreet sodales nulla. Maecenas
						mattis ligula leo, non congue lacus rhoncus nec. Sed
						convallis mi lectus, in facilisis metus maximus non.
						Donec odio sapien, dignissim eleifend lacinia quis,
						varius eget ligula. Proin a eros suscipit, pellentesque
						nibh sit amet, lacinia ante. Etiam quis consequat justo.
						Quisque non leo metus.
					</p>
				</div>
			</Col>
		</Row>
	);
};

const fakeTextGenerator = (number) => {
    let template = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, laborum? Provident eius quo dignissimos quaerat architecto tenetur alias dolores, suscipit veniam quod rem, sunt fuga fugit quia eveniet eos deleniti.";
    for (let i = 0; i < number; i++)
        template += template;
    return template;
}

export {
    HomeFakeParagraph,
    fakeTextGenerator,
};
