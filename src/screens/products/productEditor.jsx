import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Button from "@/components/button";
import Input from "@/components/inputs";
import Textarea from "@/components/textarea";
import SelectDropdown from "@/components/select";
import PageHeading from "@/components/pageTitle";
import { Card, CardHeading } from "@/components/card";
import AddCategoryModal from "@/components/modal/addCategoryModal";
import { addProduct, getCategories, getSingleProduct } from "../../api/api";
// import {
//   createProductAction,
//   updateProductAction,
// } from "../../redux/actions/productAction";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
];

const ProductEditor = () => {
  const fileInputRef = useRef(null);

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

  const navigate = useNavigate();

  const { id } = useParams();
  // const { categoryList } = useSelector((state) => state.category);
  // const { productsList } = useSelector((state) => state.product);
  // const dispatch = useDispatch();

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
      // setTitle({ value: title });
      // setQuantity({ value: stock });
      // setDescription({ value: description });
      // setPrice({ value: price });
      // setDiscountPercentage(discountPercentage);
      // setBrand({ value: brand });
      // setCategory({ value: category });
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
      let newImages = Array.from(e.target.files)?.map((file) =>
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
      thumbnail.url !== "" &&
      thumbnail.url !== undefined
    ) {
      // console.log(
      //   title.value,
      //   quantity.value,
      //   price.value,
      //   category.value,
      //   thumbnail.url
      // );
      if (isUpdate) {
        handleUpdateProduct();
      } else {
        handleCreateProduct();
      }
    }
  };

  const handleUpdateProduct = () => {
    let data = {
      id: id,
      title: title.value,
      stock: quantity.value,
      discountPercentage: discountPercentage,
      description: description.value,
      price: price.value,
      brand: brand.value,
      category: category.value,
      thumbnail: thumbnail.url,
      images: [...gallaryData],
    };
    // console.log(data,"______")
    // dispatch(updateProductAction(data));
    navigate("/products", { replace: true });
    toast.success("Product Updated Succesffully!", {
      autoClose: 1500,
    });
  };

  const handleCreateProduct = async () => {
    let data = {
      id: Date.now(),
      title: title.value,
      stock: quantity.value,
      discountPercentage: discountPercentage,
      description: description.value,
      price: price.value,
      brand: brand.value,
      category: category.value,
      thumbnail: thumbnail.url,
      images: [thumbnail.url, ...gallaryData],
    };
    // dispatch(createProductAction(data));
    navigate("/products", { replace: true });
    toast.success("Product Added Succesffully!", {
      autoClose: 1500,
    });
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
      // fetchCurrentProduct();

      // let productObj = productsList.find((page) =>
      //   page.data.some((product) => product.id == id)
      // );

      // if (productObj) {
      //   let currentProduct = productObj.data.find(
      //     (product) => product.id == id
      //   );
      //   console.log(currentProduct);
      //   //iska function bana de... q.k yah do jaga use howa hai
      //   const {
      //     title,
      //     stock,
      //     description,
      //     price,
      //     discountPercentage,
      //     brand,
      //     category,
      //     thumbnail,
      //     images,
      //   } = currentProduct;
      //   setTitle({ value: title });
      //   setQuantity({ value: stock });
      //   setDescription({ value: description });
      //   setPrice({ value: price });
      //   setDiscountPercentage(discountPercentage);
      //   setBrand({ value: brand });
      //   setCategory({ value: category });
      //   setThumbnail({ url: thumbnail });
      //   setGallaryData(images);
      // } else {
      // }
    } else {
      setIsUpdate(false);
      setIsProductFound(false);
      // handleEmptyFields();
    }
  }, [id]);

  useEffect(() => {
    // if (categoryList?.length) {
    //   setCategoriesName(categoryList);
    // } else {
    //   fetchCategoriesName();
    // }
  }, []);

  //beacause is page pe mujy realtime kerna hai
  // useEffect(() => {
  //   setCategoriesName(categoryList);
  // }, [categoryList]);

  // =============== NEW CODE =============== //
  const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    thumbnail: z.string().min(1, { message: "Thumbnail is required" }),
    price: z.coerce.number().min(1, "Price is required"),
    stock: z.coerce.number().min(1, "Stock is required"),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      return console.log(data, "SUBMIT DATA");
      // return axios.post("http://127.0.0.1:3000/", data);
    },
    onSuccess: (response) => {
      toast.success("Product added successfully");
      // queryClient.setQueryData("product", response?.data);
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "title",
      description: "lorem ipsum",
      category: "category",
      brand: "brand",
      price: 100,
      discountPercentage: 10,
      stock: 22,
      gallery: "https://placehold.co/600x400",
      thumbnail: "https://placehold.co/600x400",
    },
    validators: {
      onChange: productSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    form.setFieldValue("file", file);

    if (file) {
      setFileName(file.name);

      // Preview for images
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail({ url: reader?.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isProductFound ? (
        <NotFound />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* ================== SUBMIT BUTTON ================== */}
          <div className="flex flex-wrap gap-2 justify-between items-end pt-6">
            <div>
              <h2 className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {isUpdate ? "Update Product" : "Add Product"}
              </h2>
              <span className="text-gray-500 dark:text-gray-300 text-sm">
                Orders placed across your store
              </span>
            </div>
            <div>
              <Button
                type="submit"
                name={`${isUpdate ? "Update" : "Publish"} Product`}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col lg:flex-row py-6">
            <div className="lg:w-3/5 w-full">
              <Card className="px-6 py-6 flex gap-3 flex-col">
                <CardHeading title="Product information" />
                {/* ================== TITLE ================== */}
                <form.Field
                  name="title"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="text"
                        placeholder="Enter your product title"
                        label={field?.name}
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />

                {/* ================== STOCK ================== */}
                <form.Field
                  name="stock"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="number"
                        placeholder="Enter your product stock"
                        label="Quantity / Stock"
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />

                {/* ================== DESCRIPTION ================== */}
                <form.Field
                  name="description"
                  children={(field) => {
                    return (
                      <Textarea
                        id={field?.name}
                        type="text"
                        placeholder="Enter your product description"
                        label={field?.name}
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />
              </Card>

              <Card className="px-6 py-6 flex gap-3 flex-col">
                <CardHeading title="Media" />

                {/* ================== THUMBNAIL ================== */}
                <Input
                  label="thumbnail"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  className={`w-full flex flex-col items-center rounded-md border-2 border-dashed tracking-wide cursor-pointer py-14 ${
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
                </div>

                {/* {field?.state?.meta?.errors?.length && (
                  <small className="text-red-500 block">
                    Please upload media
                  </small>
                )} */}

                {/* <div className="pb-6 px-5">
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Thumbnail
                  </label>
                  <label
                    className={`w-full flex flex-col items-center rounded-md border-2 border-dashed tracking-wide cursor-pointer py-14 ${
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
                </div> */}

                {/* ================== GALLERY ================== */}
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-300">
                    Gallery (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {gallaryData?.map((gallary, index) => {
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
            </div>

            <div className="lg:w-2/5 w-full">
              <Card className="px-6 py-6 flex gap-3 flex-col">
                <CardHeading title="Pricing" />

                {/* ================= PRICING ================= */}
                <form.Field
                  name="price"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="number"
                        placeholder="Enter your product price"
                        label="Base Price"
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />

                {/* ================= DISCOUNT PRICE ================= */}
                <form.Field
                  name="discountedPrice"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="number"
                        placeholder="Enter your product discounted price"
                        label="Discounted Price (Optional)"
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />
              </Card>

              <Card className="px-6 py-6 flex gap-3 flex-col">
                <CardHeading title="Organize" />

                {/* ================= BRAND ================= */}
                <form.Field
                  name="brand"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="text"
                        placeholder="Enter your product brand"
                        label={field?.name}
                        name={field?.name}
                        value={field?.state.value}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />

                {/* ================= SELECT CATEGORY ================= */}
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-1 flex justify-between">
                    <span>Category</span>
                    <span
                      className="text-primaryDark cursor-pointer hover:underline underline-offset-2 transition dark:text-primaryLight"
                      onClick={handleAddNewCategory}
                    >
                      Add New Category
                    </span>
                  </div>

                  <form.Field
                    name="category"
                    children={(field) => {
                      return (
                        <SelectDropdown
                          className="py-2 w-full capitalize"
                          value={field?.state.value}
                          isError={field?.state?.meta?.errors?.length}
                          messageError={field?.state?.meta?.errors}
                          onChange={(e) =>
                            field?.handleChange(e?.target?.value)
                          }
                        >
                          <option value="" select="select">
                            Select Category
                          </option>
                          {categories?.map((item, index) => {
                            return (
                              <option value={item?.id} key={index}>
                                {item?.name}
                              </option>
                            );
                          })}
                        </SelectDropdown>
                      );
                    }}
                  />
                </div>
              </Card>

              {/* ================== ATTRIBUTES ================== */}
              <Card className="px-6 py-6 flex gap-3 flex-col">
                <CardHeading title="Variants" />
                <div className="pb-4">
                  <div className="flex sm:flex-row flex-col items-end gap-3">
                    <span className="sm:w-1/3 w-full">
                      <label className="text-sm text-gray-500 dark:text-gray-300 block">
                        Options
                      </label>
                      <SelectDropdown customClass="py-2 w-full">
                        <option value="0">Select Option</option>
                        <option value="0">Size</option>
                        <option value="0">Color</option>
                      </SelectDropdown>
                    </span>
                    <span className="sm:w-2/3 w-full">
                      <Input placeholder="Enter Size" type="text" />
                    </span>
                  </div>
                </div>
                <div className="pb-6">
                  <Button type="button" name="Add another option" />
                </div>
              </Card>
            </div>
          </div>
        </form>
      )}
      {/* =================== FOR ADD NEW CATEGORY =================== */}
      {/* <AddCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      /> */}
    </>
  );
};
export default ProductEditor;

const NotFound = () => {
  return (
    <div className="mt-6 text-center">
      <Card className="py-6">
        <div className="text-3xl text-gray-600 pb-2 font-medium dark:text-gray-300">
          404 - Product Not Found
        </div>
        <p className="text-gray-500 dark:text-gray-300 pb-4">
          Sorry, the product you are looking for does not exist.
        </p>
        <Link to="/products">
          <Button name="Add Product" className="mx-auto" />
        </Link>
      </Card>
    </div>
  );
};
