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

import LandingPage from "./pages/LandingPage";
// import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDetailPage from "./pages/UserDetailPage";
import ViewPostPage from "./pages/ViewPostPage";
import PostDetailPage from "./pages/PostDetailPage";

// Lưu chuỗi đường dẫn tự cấu hình
import Routes from "./routes"

// "Kho chứa" trung tâm, lưu trữ các biến cục bộ
import { store, persistor } from "./redux/store"

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter >
				<NavigationBar />
				<Switch>
					<Route exact path={Routes.LandingPage.path} component={LandingPage} />
					<Route exact path={Routes.LoginPage.path} component={LoginPage} />
					<Route exact path={Routes.RegisterPage.path} component={RegisterPage} />
					<Route exact path={Routes.UserDetailPage.path} component={UserDetailPage} />
					<Route exact path={Routes.ViewPostPage.path} component={ViewPostPage} />
					<Route exact path={Routes.PostDetailPage.path} component={PostDetailPage} />
				
				</Switch>
				{/* <Footer /> */}
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

