import { GETPRODUCT } from "../types/productType";

const getProductAction = (data) => {
  return {
    type: GETPRODUCT,
    data: data,
  };
};

export { getProductAction };
