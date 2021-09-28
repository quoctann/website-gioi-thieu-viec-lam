import { VIEW_HIRING_PAGE, XEM_CHI_TIET_UNG_VIEN } from "../actionTypes"

// State mặc định
const init = {
    hiringId: 0,
    ungvienId: 0,
    vieclamId: 0,
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
        case XEM_CHI_TIET_UNG_VIEN:
            const { ungvienId, vieclamId } = action.payload;
            return {
                ...state,
                ungvienId: ungvienId,
                vieclamId: vieclamId,
            }
        default:
            return state;
    }
}

export default commonReducer;