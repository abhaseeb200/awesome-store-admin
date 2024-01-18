import { DELETERODUCT, GETPRODUCT, UPDATEPRODUCT } from "../types/productType"

const initialState = {
    productsList: [],
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case GETPRODUCT:
            const { data, pageCount, currentLimit } = action.payload
            const store = {
                data: data,
                pageCount: pageCount,
                currentLimit: currentLimit
            }
            return {
                ...state,
                productsList: [store, ...state.productsList]
            };
        case DELETERODUCT:
            const deleteProduct = state.productsList.filter(item => item.id !== action.id)
            console.log({ deleteProduct }, "DELETE PRODUCT");
            return {
                ...state,
                ...deleteProduct
            }
        default:
            return state
    }
}

export default productReducers