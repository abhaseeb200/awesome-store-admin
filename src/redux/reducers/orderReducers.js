import { GETORDER } from "../types/orderType"

const initialState = {
    orderList: [],
}

const orderReducers = (state = initialState, action) => {
    switch (action.type) {
        case GETORDER:
            return { orderList: [...action.data] }
        default:
            return state
    }
}

export default orderReducers