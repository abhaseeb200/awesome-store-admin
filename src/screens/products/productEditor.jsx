import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import InputCustom from "../../components/inputs";
import SelectCustom from "../../components/select";
import TextareaCustom from "../../components/textarea";
import PageHeading from "../../components/pageTitle";
import { Card, CardHeading } from "../../components/card";
import AddCategoryModal from "../../components/modal/addCategoryModal";
import { addProduct, getCategories, getSingleProduct } from "../../api/api";

const ProductEditor = () => {
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
  const [description, setDescription] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [price, setPrice] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [brand, setBrand] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [category, setCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [thumbnail, setThumbnail] = useState({
    value: "",
    isError: false,
    url: "",
  });
  const [gallary, setGallary] = useState();
  const [gallaryData, setGallaryData] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isProductFound, setIsProductFound] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const { id } = useParams();
  const { categoryList } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const fetchCategoriesName = async () => {
    try {
      let response = await getCategories();
      setCategoriesName(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentProduct = async () => {
    try {
      let response = await getSingleProduct(id);
      const {
        title,
        stock,
        description,
        price,
        discountPercentage,
        brand,
        category,
        thumbnail,
        images,
      } = response.data;
      setTitle({ value: title });
      setQuantity({ value: stock });
      setDescription({ value: description });
      setPrice({ value: price });
      setDiscountPercentage(discountPercentage);
      setBrand({ value: brand });
      setCategory({ value: category });
      setThumbnail({ url: thumbnail });
      setGallaryData(images);
    } catch (error) {
      console.log(error);
      setIsProductFound(true);
    }
  };

  const handleThumbnail = (e) => {
    if (e.target.files) {
      let tempImgURL = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files, e.target.value);
      setThumbnail({
        value: e.target.files,
        url: tempImgURL,
      });
    }
  };

  const handleGallary = (e) => {
    if (e.target.files) {
      let newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setGallaryData([...newImages, ...gallaryData]);
    }
  };

  const handleAddNewCategory = () => {
    console.log("----");
    setIsOpenModal(true);
    setCurrentCategory({ value: "" });
  };

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
    //DESCRIPTION
    if (description.value.trim() === "") {
      setDescription({
        value: description.value,
        isError: true,
        messageError: "Description should not be empty",
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
    //BRAND
    if (brand.value.trim() === "") {
      setBrand({
        value: brand.value,
        isError: true,
        messageError: "Brand should not be empty",
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
    if (thumbnail.value === "" || thumbnail.url === "") {
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
      description.value.trim() !== "" &&
      price.value !== "" &&
      price.value > 0 &&
      brand.value.trim() !== "" &&
      category.value !== "" &&
      category.value !== "0" &&
      thumbnail.url !== ""
    ) {
      console.log(
        title.value,
        quantity.value,
        price.value,
        category.value,
        thumbnail.url
      );
      if (isUpdate) {
        handleUpdateProduct();
      } else {
        handleCreateProduct();
      }
    }
  };

  const handleUpdateProduct = () => {
    console.log("UPDATE PRODUCT...");
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

  const handleEmptyFields = () => {
    setTitle({ value: "" });
    setQuantity({ value: "" });
    setDescription({ value: "" });
    setPrice({ value: "" });
    setDiscountPercentage("");
    setBrand({ value: "" });
    setCategory({ value: "" });
    setThumbnail({ url: "" });
    setGallaryData([]);
  };

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      fetchCurrentProduct();
    } else {
      setIsUpdate(false);
      setIsProductFound(false);
      handleEmptyFields();
    }
  }, [id]);

  useEffect(() => {
    if (categoryList?.length) {
      setCategoriesName(categoryList);
    } else {
      fetchCategoriesName();
    }
  }, []);

  //beacause is page pe mujy realtime kerna hai
  useEffect(() => {
    setCategoriesName(categoryList);
  }, [categoryList]);

  return (
    <>
      {isProductFound ? (
        <div className="mt-6 text-center">
          <Card>
            <div className="py-6">
              <div className="text-3xl text-gray-600 pb-2 font-medium">
                404 - Product Not Found
              </div>
              <p className="text-gray-500 dark:text-gray-300 pb-4">
                Sorry, the product you are looking for does not exist.
              </p>
              <Link to="/products">
                <Button name="Add Product" className="mx-auto" />
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <div className="">
          <PageHeading title="Product Editor" />
          <div className="flex flex-wrap gap-2 justify-between items-end">
            <div className="">
              <h2 className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {isUpdate ? "Update Product" : "Add Product"}
              </h2>
              <span className="text-gray-500 dark:text-gray-300 text-sm">
                Orders placed across your store
              </span>
            </div>
            <div>
              <Button
                name={isUpdate ? "Update Product" : "Publish Product"}
                onClick={handlePusblishProduct}
              />
            </div>
          </div>

          <div className="flex gap-3 flex-col lg:flex-row py-6">
            <div className="lg:w-3/5 w-full">
              {/* product information */}
              <Card>
                <CardHeading title="Product information" />
                <div className="pb-4 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Name
                  </label>
                  <InputCustom
                    placeholder="Product title"
                    type="text"
                    value={title.value}
                    isError={title.isError}
                    messageError={title.messageError}
                    onChange={(e) => setTitle({ value: e.target.value })}
                  />
                </div>
                <div className="pb-4 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Quantity / Stock
                  </label>
                  <InputCustom
                    placeholder="Product qunatity"
                    type="number"
                    value={quantity.value}
                    isError={quantity.isError}
                    messageError={quantity.messageError}
                    onChange={(e) => setQuantity({ value: e.target.value })}
                  />
                </div>
                <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Description
                  </label>
                  <TextareaCustom
                    placeholder="Product description"
                    rows="10"
                    isError={description.isError}
                    messageError={description.messageError}
                    value={description.value}
                    onChange={(e) => setDescription({ value: e.target.value })}
                  />
                </div>
              </Card>
              {/* Media */}
              <Card>
                <CardHeading title="Media" />
                <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Thumbnail
                  </label>
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
                      // value={thumbnail?.value}
                      onChange={handleThumbnail}
                    />
                  </label>
                  <div>
                    {thumbnail.isError && (
                      <small className="text-red-500 block">
                        Please upload media
                      </small>
                    )}
                  </div>
                </div>
                <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Gallary(Optional)
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {gallaryData.map((gallary, index) => {
                      return (
                        <img
                          src={gallary}
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
                    <label className="text-sm text-gray-500 dark:text-gray-300 block">
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

            <div className="lg:w-2/5 w-full">
              {/* Pricing */}
              <Card>
                <CardHeading title="Pricing" />
                <div className="pb-4 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Base Price
                  </label>
                  <InputCustom
                    placeholder="Price"
                    type="number"
                    value={price.value}
                    isError={price.isError}
                    messageError={price.messageError}
                    onChange={(e) => setPrice({ value: e.target.value })}
                  />
                </div>
                <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Discounted Price (Optional)
                  </label>
                  <InputCustom
                    placeholder="Discounted Price"
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                  />
                </div>
              </Card>
              {/* Organize */}
              <Card>
                <CardHeading title="Organize" />
                <div className="pb-4 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300 block mb-1">
                    Brand
                  </label>
                  <InputCustom
                    placeholder="Product brand"
                    value={brand.value}
                    isError={brand.isError}
                    messageError={brand.messageError}
                    onChange={(e) => setBrand({ value: e.target.value })}
                  />
                </div>
                <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300 block mb-1 flex justify-between">
                    <span>Category</span>
                    <span
                      className="text-primaryDark cursor-pointer hover:underline underline-offset-2 transition dark:text-primaryLight"
                      onClick={handleAddNewCategory}
                    >
                      Add New Category
                    </span>
                  </label>
                  <SelectCustom
                    customClass="py-2 w-full capitalize"
                    value={category.value}
                    isError={category.isError}
                    messageError={category.messageError}
                    onChange={(e) => setCategory({ value: e.target.value })}
                  >
                    <option value="0" select="select">
                      Select Category
                    </option>
                    {categoriesName.map((category, index) => {
                      return (
                        <option value={category} key={index}>
                          {category}
                        </option>
                      );
                    })}
                  </SelectCustom>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
      <AddCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </>
  );
};
export default ProductEditor;
