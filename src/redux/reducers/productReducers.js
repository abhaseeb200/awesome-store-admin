import { GETPRODUCT } from "../types/productType"

const initialState = {
    products: {},
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case GETPRODUCT:
            return { products: { ...action.data } }
        default:
            return state
    }
}

export default productReducers