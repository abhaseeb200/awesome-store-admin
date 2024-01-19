import { DELETERODUCT, GETPRODUCT, UPDATEPRODUCT } from "../types/productType"

const initialState = {
    productsList: [],
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case GETPRODUCT:
            const { data, pageCount, currentLimit, currentOffset } = action.payload
            const store = {
                data: data,
                pageCount: pageCount,
                currentLimit: currentLimit,
                currentOffset: currentOffset
            }
            return {
                ...state,
                productsList: [...state.productsList, store]
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