import { combineReducers } from "redux";
import userReducer from "./userReducer";

// Gộp các reducer riêng lẻ lại thành 1, gọi mỗi khi reducer riêng lẻ ấy được gọi
export default combineReducers({ userReducer })