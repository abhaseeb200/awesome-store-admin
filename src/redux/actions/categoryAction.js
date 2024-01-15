import { GETCATEGORY } from "../types/categoryType";

const getCategoryAction = (data) => {
  return {
    type: GETCATEGORY,
    data: data,
  };
};

export { getCategoryAction };
