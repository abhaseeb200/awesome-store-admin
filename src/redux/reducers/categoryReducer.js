import { GETCATEGORY } from "../types/categoryType";

const initialState = {
  categoryList: [],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GETCATEGORY:
      return { categoryList: [...action.data] }
    default:
      return state;
  }
};

export default categoryReducers;
