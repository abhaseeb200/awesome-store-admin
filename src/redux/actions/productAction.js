import {
  CREATEPRODUCT,
  DELETERODUCT,
  GETPRODUCT,
  UPDATEPRODUCT,
} from "../types/productType";

const getProductAction = (data, pageCount, currentLimit, currentOffset) => {
  return {
    type: GETPRODUCT,
    payload: { data, pageCount, currentLimit, currentOffset },
  };
};

const deleteProductAction = (pageCountDelete, idDelete) => {
  return {
    type: DELETERODUCT,
    payload: { idDelete, pageCountDelete },
  };
};

const updateProductAction = (data) => {
  return {
    type: UPDATEPRODUCT,
    payload: data,
  };
};

const createProductAction = (data) => {
  return {
    type: CREATEPRODUCT,
    payload: data,
  };
};

export {
  getProductAction,
  deleteProductAction,
  updateProductAction,
  createProductAction,
};
