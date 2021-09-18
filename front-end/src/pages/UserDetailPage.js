import cookies from "react-cookies";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const UserDetailPage = (props) => {
	if (
		cookies.load("user") ||
		props.userInfo.userReducer.hasOwnProperty("username")
	)
		return (
			<>
				<p>is logged</p>
			</>
		);
	else return <Redirect to="/login" />;
};

export default connect((state) => {
	return {
		userInfo: state,
	};
})(UserDetailPage);
