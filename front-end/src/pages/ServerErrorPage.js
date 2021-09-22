import { Link } from "react-router-dom";
import Routes from "../routes";

const ServerErrorPage = () => {
	return (
		<>
			<div id="notfound">
				<div class="notfound">
					<div class="notfound-404">
						<h3>Oops! Internal Server Error</h3>
						<h1>
							<span>5</span>
							<span>0</span>
							<span>0</span>
						</h1>
					</div>
					<h2>
						we are sorry, but something went wrong. We're looking for what happened
					</h2>
                    <Link to={Routes.LandingPage.path}>Back to home</Link>
				</div>
			</div>
		</>
	);
};
export default ServerErrorPage;
