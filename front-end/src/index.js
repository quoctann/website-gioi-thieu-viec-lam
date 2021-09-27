import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
 
// css tự cấu hình
import "./scss/index.scss";

// css thư viện ngoài
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

// "Kho chứa" trung tâm, lưu trữ các biến cục bộ
import { store, persistor } from "./redux/store"

// Lưu chuỗi đường dẫn tự cấu hình
import Routes from "./routes"

import LandingPage from "./pages/LandingPage";
// import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPostPage from "./pages/ViewPostPage";
import PostDetailPage from "./pages/PostDetailPage";
import HiringDetailPage from "./pages/HiringDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import AboutPage from "./pages/AboutPage";
import HiringDashboardPage from "./pages/HiringDashboardPage";
import ApplicantDashboardPage from "./pages/ApplicantDashboardPage";
import QuanTriVienPage from "./pages/QuanTriVienPage";
import ForbiddenPage from "./pages/ForbiddenPage";


ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter >
				<NavigationBar />
				<Switch>
					<Route exact path={Routes.LandingPage.path} component={LandingPage} />
					<Route exact path={Routes.LoginPage.path} component={LoginPage} />
					<Route exact path={Routes.RegisterPage.path} component={RegisterPage} />
					<Route exact path={Routes.ViewPostPage.path} component={ViewPostPage} />
					<Route exact path={Routes.PostDetailPage.path} component={PostDetailPage} />
					<Route exact path={Routes.HiringDetailPage.path} component={HiringDetailPage} />
					<Route exact path={Routes.NotFoundPage.path} component={NotFoundPage} />
					<Route exact path={Routes.ServerError.path} component={ServerErrorPage} />
					<Route exact path={Routes.AboutPage.path} component={AboutPage} />
					<Route exact path={Routes.HiringDashboardPage.path} component={HiringDashboardPage} />
					<Route exact path={Routes.ApplicantDashboardPage.path} component={ApplicantDashboardPage} />
					<Route exact path={Routes.QuanTriVienPage.path} component={QuanTriVienPage} />
					<Route exact path={Routes.ForbiddenPage.path} component={ForbiddenPage} />
				</Switch>
				{/* <Footer /> */}
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

