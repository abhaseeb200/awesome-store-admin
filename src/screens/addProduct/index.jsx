import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Button from "../../components/button";
import InputCustom from "../../components/inputs";
import SelectCustom from "../../components/select";
import TextareaCustom from "../../components/textarea";
import PageHeading from "../../components/pageTitle";
import { Card, CardHeading } from "../../components/card";
import axios from "axios";
import { addProduct } from "../../api/api";

const AddProduct = () => {
  const [title, setTitle] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [quantity, setQuantity] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [price, setPrice] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [category, setCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [thumbnail, setThumbnail] = useState({
    value: "",
    isError: false,
    url: "",
    name: "",
  });
  const [gallary, setGallary] = useState();
  const [gallaryData, setGallaryData] = useState([]);

  const handleThumbnail = (e) => {
    if (e.target.files[0]) {
      let tempImgURL = URL.createObjectURL(e.target.files[0]);
      console.log(tempImgURL, "______-", e.target.files[0]?.name);
      // console.log(e.target.files[0].name, "------",tempImgURL);
      setThumbnail({
        value: e.target.value,
        url: tempImgURL,
        name: e.target.files[0]?.name,
      });
    }
  };

  const handleGallary = (e) => {
    if (e.target.files) {
      let newImages = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setGallaryData([...newImages, ...gallaryData]);
    }
  };

  console.log(gallaryData, "GALLARY DATA");

  const handlePusblishProduct = () => {
    //TITLE
    if (title.value.trim() === "") {
      setTitle({
        value: title.value,
        isError: true,
        messageError: "Title should not be empty",
      });
    }
    //QUANTITY
    if (quantity.value <= 0 || quantity.value === "") {
      setQuantity({
        value: quantity.value,
        isError: true,
        messageError: "Quantiy should be valid",
      });
    }
    //PRICE
    if (price.value <= 0 || price.value === "") {
      setPrice({
        value: price.value,
        isError: true,
        messageError: "Price should be valid",
      });
    }
    //CATEGORY
    if (category.value === "" || category.value === "0") {
      setCategory({
        value: category.value,
        isError: true,
        messageError: "Please select category",
      });
    }
    //MEDIA
    if (thumbnail.value === "") {
      setThumbnail({
        value: thumbnail.value,
        isError: true,
      });
    }

    //Validation
    if (
      title.value.trim() !== "" &&
      quantity.value !== "" &&
      quantity.value > 0 &&
      price.value !== "" &&
      price.value > 0 &&
      category.value !== "" &&
      category.value !== "0" &&
      thumbnail.value !== ""
    ) {
      console.log(
        title.value,
        quantity.value,
        price.value,
        category.value,
        thumbnail.value
      );
      handleCreateProduct();
    }
  };

  const handleCreateProduct = async () => {
    let body = {
      title: title.value,
      quantity: quantity.value,
      price: price.value,
      // category: category.value,
      thumbnail: thumbnail.value,
    };
    try {
      let response = await addProduct(body);
      console.log(response, "RESPONSE....");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <PageHeading title="Add Product" />
        <div className="flex flex-wrap gap-2 justify-between items-end">
          <div className="">
            <h2 className="text-2xl text-gray-600 font-medium">
              Add a new Product
            </h2>
            <span className="text-gray-500 text-sm">
              Orders placed across your store
            </span>
          </div>
          <div>
            <Button name="Publish Product" onClick={handlePusblishProduct} />
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row py-6">
          <div className="sm:w-3/5 w-full">
            {/* product information */}
            <Card>
              <CardHeading title="Product information" />
              <div className="pb-4">
                <label className="text-sm text-gray-500">Name</label>
                <InputCustom
                  placeholder="Product title"
                  type="text"
                  value={title.value}
                  isError={title.isError}
                  messageError={title.messageError}
                  onChange={(e) => setTitle({ value: e.target.value })}
                />
              </div>
              <div className="pb-4">
                <label className="text-sm text-gray-500">Quantity</label>
                <InputCustom
                  placeholder="Product Qunatity"
                  type="number"
                  value={quantity.value}
                  isError={quantity.isError}
                  messageError={quantity.messageError}
                  onChange={(e) => setQuantity({ value: e.target.value })}
                />
              </div>
              <div className="pb-6">
                <label className="text-sm text-gray-500">
                  Description (Optional)
                </label>
                <TextareaCustom placeholder="Product description" rows="10" />
              </div>
            </Card>
            {/* Media */}
            <Card>
              <CardHeading title="Media" />
              <div className="pb-6">
                <label className="text-sm text-gray-500">Thumbnail</label>
                <label
                  className={`w-full flex flex-col items-center rounded-md border border-2 border-dashed tracking-wide cursor-pointer py-14 ${
                    thumbnail.isError ? "border-red-400" : "border-gray-400"
                  }`}
                >
                  <span className="bg-gray-200 py-3 px-3 rounded-md mb-5">
                    {thumbnail.url ? (
                      <img
                        src={thumbnail.url}
                        className="w-40 h-40 object-cover"
                      />
                    ) : (
                      <FiUpload size="1.5rem" />
                    )}
                  </span>
                  <span className="mt-2 text-base leading-normal bg-primaryLight text-primaryDark py-1.5 px-4 rounded-md">
                    Browse image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    value={thumbnail.value}
                    onChange={handleThumbnail}
                  />
                </label>
                <div>
                  {thumbnail?.isError && (
                    <small className="text-red-500 block">
                      Please upload media
                    </small>
                  )}
                </div>
              </div>
              <div className="pb-6">
                <label className="text-sm text-gray-500">
                  Gallary(Optional)
                </label>
                <div className="flex flex-wrap gap-1">
                  {gallaryData.map((gallary, index) => {
                    return (
                      <img
                        src={gallary.url}
                        key={index}
                        className="w-20 h-20 object-cover border-2 border-dashed border-gray-400 rounded-md p-1"
                      />
                    );
                  })}
                  <label className="flex">
                    <div className="flex items-center justify-center rounded-md border border-2 border-dashed border-gray-400 cursor-pointer w-20 h-20">
                      <span className="bg-gray-200 py-3 px-3 rounded-md">
                        <FiUpload size="1.0rem" />
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        value={gallary}
                        onChange={handleGallary}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </Card>
            {/* Variants */}
            {/* <Card>
              <CardHeading title="Variants" />
              <div className="pb-4">
                <div className="flex sm:flex-row flex-col items-end gap-3">
                  <span className="sm:w-1/3 w-full">
                    <label className="text-sm text-gray-500 block">
                      Options
                    </label>
                    <SelectCustom customClass="py-2 w-full">
                      <option value="0">Select Option</option>
                      <option value="0">Size</option>
                      <option value="0">Color</option>
                    </SelectCustom>
                  </span>
                  <span className="sm:w-2/3 w-full">
                    <InputCustom placeholder="Enter Size" type="text" />
                  </span>
                </div>
              </div>
              <div className="pb-6">
                <Button name="Add another option" />
              </div>
            </Card> */}
          </div>

          <div className="sm:w-2/5 w-full">
            {/* Pricing */}
            <Card>
              <CardHeading title="Pricing" />
              <div className="pb-4">
                <label className="text-sm text-gray-500">Base Price</label>
                <InputCustom
                  placeholder="Price"
                  type="number"
                  value={price.value}
                  isError={price.isError}
                  messageError={price.messageError}
                  onChange={(e) => setPrice({ value: e.target.value })}
                />
              </div>
              <div className="pb-6">
                <label className="text-sm text-gray-500">
                  Discounted Price (Optional)
                </label>
                <InputCustom placeholder="Discounted Price" type="number" />
              </div>
            </Card>
            {/* Organize */}
            <Card>
              <CardHeading title="Organize" />
              <div className="pb-6">
                <label className="text-sm text-gray-500 block mb-1">
                  Category
                </label>
                <SelectCustom
                  customClass="py-2 w-full"
                  value={category.value}
                  isError={category.isError}
                  messageError={category.messageError}
                  onChange={(e) => setCategory({ value: e.target.value })}
                >
                  <option value="0" select="select">
                    Select Category
                  </option>
                  <option value="office">Office</option>
                  <option value="shoes">Shoes</option>
                </SelectCustom>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
