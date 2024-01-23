import {
  CREATEECATEGORY,
  DELETECATEGORY,
  GETCATEGORY,
  UPADATECATEGORY,
} from "../types/categoryType";

const initialState = {
  categoryList: [],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GETCATEGORY:
      let addIDCateogories = [];
      action.payload.map((item) =>
        addIDCateogories.push({
          id: Math.floor(Math.random() * 999999999),
          category: item,
        })
      );
      console.log(addIDCateogories);
      return {
        categoryList: [...addIDCateogories],
      };
    case DELETECATEGORY:
      return {
        categoryList: state.categoryList.filter(
          (item) => item.id !== action.id
        ),
      };
    case UPADATECATEGORY:
      const { id, category } = action;
      let findInd = state.categoryList.findIndex((item) => item.id === id);
      state.categoryList[findInd].category = category;
      return state;
    case CREATEECATEGORY:
      let newCategory = {
        id: Math.floor(Math.random() * 999999999),
        category: action.category,
      };
      // console.log([newCategory, ...addIDCateogories]);
      return {
        categoryList: [newCategory, ...state.categoryList],
      };
    default:
      return state;
  }
};

export default categoryReducers;
