import React, { useState } from "react";
import Modal from "@/components/modal";
import ThumbnailSlider from "@/components/slider";

function ProductView({ data, isOpenModal, setIsOpenModal }) {
  const discountPrice = (price, discountPercentage) => {
    let priceAfterDiscount = price - (discountPercentage / 100) * price;
    return priceAfterDiscount.toFixed(2);
  };

  return (
    <Modal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      customWidth="w-full max-w-4xl"
    >
      <div className="flex item-center sm:flex-row flex-col gap-5 items-center">
        <div className="sm:w-1/2 w-full  aspect-square bg-gray-200 dark:bg-dark-600">
          <ThumbnailSlider data={data} />
        </div>
        <div className="sm:w-1/2 w-full text-gray-600 dark:text-gray-200">
          <p className="bg-gray-800 dark:bg-dark-600 text-white px-3 py-1 uppercase text-sm inline">
            {data?.brand?.title}
          </p>
          <h3 className="text-2xl font-semibold pt-2 pb-4">
            {data?.title}
            <span className="text-sm pl-2">
              ({data?.discountPercentage}% OFF)
            </span>
          </h3>
          <p className="pb-2 font-semibold">
            <span className="text-lg line-through text-gray-400 pe-2">
              ${data?.price}
            </span>
            <span className="text-lg">
              ${discountPrice(data?.price, data?.discountPercentage)}
            </span>
          </p>
          <p className="text-sm pb-3">{data?.description}</p>
          <p className="text-sm">
            <span className="font-semibold mr-2">Availability:</span>
            {data?.stock} in Stock
          </p>
          <p className="text-sm">
            <span className="font-semibold mr-2">Category:</span>
            <span className="capitalize">{data?.category?.title}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default ProductView;
