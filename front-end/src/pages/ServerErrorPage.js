import { Link } from "react-router-dom";
import Routes from "../routes";

const ServerErrorPage = () => {
	return (
		<>
			<div id="notfound">
				<div class="notfound">
					<div class="notfound-404">
						<h3>Oops! Lỗi server</h3>
						<h1>
							<span>5</span>
							<span>0</span>
							<span>0</span>
						</h1>
					</div>
					<h2>
						Rất tiếc server đang có lỗi kỹ thuật, chúng tôi đang cố gắng khắc phục sớm nhất có thể
					</h2>
                    <Link to={Routes.LandingPage.path}>Trở về trang chủ</Link>
				</div>
			</div>
		</>
	);
};
export default ServerErrorPage;
