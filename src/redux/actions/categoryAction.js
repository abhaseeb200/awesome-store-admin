import {
  CREATEECATEGORY,
  DELETECATEGORY,
  GETCATEGORY,
  UPADATECATEGORY,
} from "../types/categoryType";

const getCategoryAction = (data) => {
  return {
    type: GETCATEGORY,
    payload: data,
  };
};

const deleteCategoryAction = (id) => {
  return {
    type: DELETECATEGORY,
    id: id,
  };
};

const updateCategoryAction = (category, id) => {
  return {
    type: UPADATECATEGORY,
    category: category,
    id: id,
  };
};

const createCategoryAction = (category) => {
  return {
    type: CREATEECATEGORY,
    category: category,
  };
};

export { getCategoryAction, deleteCategoryAction, updateCategoryAction,createCategoryAction };
