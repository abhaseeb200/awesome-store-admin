import { DELETECATEGORY, GETCATEGORY, UPADATECATEGORY } from "../types/categoryType";

const initialState = {
  categoryList: [],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GETCATEGORY:
      return {
        categoryList: [...action.payload]
      }
    case DELETECATEGORY:
      return {
        categoryList: state.categoryList.filter(item => item !== action.payload)
      }
    case UPADATECATEGORY:
      // let currentVal = action.payload
      let findInd = state.categoryList.findIndex(item => item === currentVal)
      // state.categoryList[findInd] = 
      return {
        ...state
      }
    default:
      return state;
  }
};

export default categoryReducers;
