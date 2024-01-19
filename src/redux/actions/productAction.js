import { DELETERODUCT, GETPRODUCT } from "../types/productType";

const getProductAction = (data, pageCount, currentLimit, currentOffset) => {
  return {
    type: GETPRODUCT,
    payload: { data, pageCount, currentLimit, currentOffset }
  };
};

const deleteProductAction = (id) => {
  return {
    type: DELETERODUCT,
    id: id
  }
}

export { getProductAction, deleteProductAction };
