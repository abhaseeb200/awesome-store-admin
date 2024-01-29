import { getProducts } from "../../api/api";
import {
  CREATEPRODUCT,
  DELETERODUCT,
  GETPRODUCT,
  UPDATEPRODUCT,
} from "../types/productType";

const initialState = {
  productsList: [],
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GETPRODUCT:
      const { data, pageCount, currentLimit, currentOffset } = action.payload;
      const store = {
        data: data,
        pageCount: pageCount,
        // currentLimit: currentLimit,
        // currentOffset: currentOffset
      };
      return {
        ...state,
        productsList: [...state.productsList, store],
      };
    case DELETERODUCT:
      const { pageCountDelete, idDelete } = action.payload;

      const productDeleted = state.productsList.map((item) => {
        if (item.pageCount === pageCountDelete) {
          const updatedData = item.data.filter(
            (product) => product.id !== idDelete
          );
          return {
            ...item,
            data: updatedData,
          };
        }
        return item;
      });

      console.log("____________________", { productDeleted });

      // for (let i = 0; i <= productDeleted.length; i++) {
      //   if (productDeleted[i]?.data?.length !== 10) {
      //     let nextWalaData = productDeleted.find(
      //       (item) => item.pageCount === productDeleted[i]?.pageCount + 1
      //     );
      //     console.log(i, { nextWalaData });
      //     if (nextWalaData) {
      //       console.log(productDeleted[i]?.pageCount + 1, nextWalaData);
      //       productDeleted[i]?.data?.push(nextWalaData.data[0]);
      //       nextWalaData.data.splice(0, 1); //remove next object product
      //     } else {
      //       console.log("API HIT KI ZARORT HAAI");
      //       let skip = (productDeleted[i]?.pageCount - 1) * 10;
      //       let option = { limit: 10, skip: skip };
      //       console.log(option, productDeleted[i]?.pageCount);
      //     }
      //   } else {
      //     console.log("++++++");
      //   }
      // }

      return {
        ...state,
        productsList: productDeleted,
      };

    case UPDATEPRODUCT:
      //thumbnail wala ssahi kerna hai
      console.log(action.payload);
      const {
        id,
        title,
        stock,
        description,
        price,
        brand,
        category,
        thumbnail,
        images,
      } = action.payload;
      let findObj = state.productsList.find((page) =>
        page.data.some((product) => product.id == id)
      );
      let currentProduct = findObj.data.find((item) => item.id == id);
      (currentProduct.title = title),
        (currentProduct.stock = stock),
        (currentProduct.description = description),
        (currentProduct.price = price),
        (currentProduct.brand = brand),
        (currentProduct.category = category),
        (currentProduct.thumbnail = thumbnail),
        (currentProduct.images = images),
        console.log(currentProduct, "+++++++++++++ UPADTAAAE");
      return {
        ...state,
        productsList: [...state.productsList],
      };
    case CREATEPRODUCT:
      //create an random ID -> issue yaha pe yah asekta hai orginal Database ki id our yah id
      let findFirstPage = state.productsList.find(
        (item) => item.pageCount === 1
      );
      findFirstPage.data.unshift(action.payload);
      findFirstPage.data.pop();
      console.log(action.payload);
      return {
        ...state,
        productsList: [...state.productsList],
      };
    default:
      return state;
  }
};

export default productReducers;
