import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// css tự cấu hình
import "./scss/index.scss";

// css thư viện ngoài
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Lưu chuỗi đường dẫn tự cấu hình
import Routes from "./routes"

ReactDOM.render(
	<BrowserRouter>
		<div className="wrapper">
			<NavigationBar />
			<Switch>
				<Route exact path={Routes.LandingPage.path} component={LandingPage} />
				<Route exact path={Routes.LoginPage.path} component={LoginPage} />
				<Route exact path={Routes.RegisterPage.path} component={RegisterPage} />
			</Switch>
			<Footer />
		</div>
	</BrowserRouter>,
	document.getElementById("root")
);
