import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";

// Sử dụng redux-persist để ngăng ko cho state reset khi refresh trang web
const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };