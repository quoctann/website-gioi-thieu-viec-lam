import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// css tự cấu hình
import "./scss/index.scss";

// css thư viện ngoài
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import LandingPage from "./pages/LandingPage";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

ReactDOM.render(
	<BrowserRouter>
		<NavigationBar />
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/login" component={LoginPage} />
			<Route exact path="/register" component={RegisterPage} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
