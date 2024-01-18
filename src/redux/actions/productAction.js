import { DELETERODUCT, GETPRODUCT } from "../types/productType";

const getProductAction = (data, pageCount, currentLimit) => {
  return {
    type: GETPRODUCT,
    payload: { data, pageCount, currentLimit }
  };
};

const deleteProductAction = (id) => {
  return {
    type: DELETERODUCT,
    id: id
  }
}

export { getProductAction, deleteProductAction };
