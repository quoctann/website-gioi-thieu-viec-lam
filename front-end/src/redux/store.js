import { createStore } from "redux";
import rootReducer from "./reducers"

// rootReducer đọc file index trước để gộp các reducer lại thành 1
export default createStore(rootReducer)