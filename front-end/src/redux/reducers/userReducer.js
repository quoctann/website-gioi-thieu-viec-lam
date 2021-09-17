import { AUTH_USER } from "../actionTypes"

// State mặc định
const initialState = {
    user: {},
}

// Nếu không nhận vào state nào thì state vẫn như cũ (init)
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER: {
            return {
                // Spread operator, lấy object từ payload map vào object state, 
                // ghi đè các trường cùng key, tạo mới nếu state không có
                ...state.user,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export default userReducer;