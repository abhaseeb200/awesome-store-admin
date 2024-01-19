import { DELETECATEGORY, GETCATEGORY, UPADATECATEGORY } from "../types/categoryType";

const getCategoryAction = (data) => {
  return {
    type: GETCATEGORY,
    payload: data,
  };
};

const deleteCategoryAction = (currentCategory) => {
  return {
    type: DELETECATEGORY,
    payload: currentCategory,
  };
};

const updateCategoryAction = (currentCategory) => {
  return {
    type: UPADATECATEGORY,
    payload: currentCategory,
  };
};


export { getCategoryAction, deleteCategoryAction, updateCategoryAction };
