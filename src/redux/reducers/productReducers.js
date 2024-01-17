import { GETPRODUCT } from "../types/productType"

const initialState = {
    productsList: [],
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case GETPRODUCT:
            //add new key 'currentPage:1', for help in filter data if does't hit API
            const updatedData = action.data.map(item => ({ ...item, currentPage: action.currentPage }));
            // const removeSameIDData = action.data.filter(i => !action.data.map(j => j.id).includes(i.id))
            // const removeSameIDData = action.data.filter(i => )
            console.log({ removeSameIDData }, "______");
            // console.log({ updatedData }, "++++++++++++++++");
            return {
                productsList: [...state.productsList, ...updatedData],
            }
        default:
            return state
    }
}

export default productReducers