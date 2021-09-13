import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SimpleInput = (props) => {
	return (
		<>
			<Form.Group className="my-4">
				<Form.Label>{props.label}</Form.Label>
				<InputGroup className="mb-1">
					<InputGroup.Text>
						<FontAwesomeIcon icon={props.faIcon} />
					</InputGroup.Text>
					<Form.Control type={props.type} placeholder={props.placeholder} />
				</InputGroup>
			</Form.Group>
		</>
	);
};

export default SimpleInput;
