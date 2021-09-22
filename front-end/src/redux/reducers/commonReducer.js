import { VIEW_HIRING_PAGE } from "../actionTypes"

// State mặc định
const init = {
    hiringId: 0,
}

// Nếu không nhận vào state nào thì state vẫn như cũ (init)
const commonReducer = (state = init, action) => {
    switch (action.type) {
        case VIEW_HIRING_PAGE: {
            const { id, name } = action.payload;
            return {
                ...state,
                [name]: id
            };
        }
        default:
            return state;
    }
}

export default commonReducer;