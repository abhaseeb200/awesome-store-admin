import { GETPRODUCT } from "../types/productType";

const getProductAction = (data, currentPage, postPerPage) => {
  return {
    type: GETPRODUCT,
    data: data,
    currentPage: currentPage,
    postPerPage: postPerPage,
  };
};

export { getProductAction };
