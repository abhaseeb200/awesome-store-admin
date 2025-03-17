import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button";
import Input from "@/components/inputs";
import Textarea from "@/components/textarea";
import SelectDropdown from "@/components/select";
import { Card, CardHeading } from "@/components/card";
import AddCategoryModal from "@/components/modal/addCategoryModal";
import UploadModal from "@/components/modal/uploadModal";
import UploadField from "@/components/uploadField";
import NotFound from "@/components/card/notFound";
import API from "@/config/api";
import axios from "axios";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
];

const ProductEditor = () => {
  const [showUploadModal, setShowUploadModal] = useState({
    type: "",
    isOpen: false,
  }); //type: gallery or thumbnail
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isProductFound = false;

  const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.coerce.number().min(1, "Price is required"),
    stock: z.coerce.number().min(1, "Stock is required"),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      return API.post("/products/add", data);
    },
    onSuccess: (response) => {
      toast.success("Product added successfully");
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
      thumbnail: "www",
    },
    validators: {
      onChange: productSchema,
      onSubmit: ({ value }) => {
        return {
          fields: {
            thumbnail: value?.thumbnail ? null : "Please upload media",
          },
        };
      },
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const handleOnChangeUpload = (url, type) => {
    if (type === "gallery") {
      form.setFieldValue("gallery", (oldItems) => [...(oldItems || []), url]);
    } else {
      form.setFieldValue(type, url);
    }
    setShowUploadModal({ type: "", isOpen: false });
  };

  return (
    <>
      {isProductFound ? (
        <NotFound title="Product" url="/products" />
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
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                    name={`${isUpdate ? "Update" : "Publish"} Product`}
                  />
                )}
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
                <form.Field
                  name="thumbnail"
                  children={(field) => {
                    return (
                      <div>
                        <UploadField
                          className="h-80 justify-center"
                          title="Browse a image"
                          label={field?.name}
                          value={field?.state.value}
                          isError={field?.state?.meta?.errors?.length}
                          messageError={field?.state?.meta?.errors}
                          onClick={() => {
                            setShowUploadModal({
                              type: "thumbnail",
                              isOpen: true,
                            });
                          }}
                        />
                      </div>
                    );
                  }}
                />

                {/* ================== GALLERY ================== */}
                <div>
                  <label className="capitalize text-sm leading-none text-gray-600 dark:text-gray-300">
                    Gallery (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 items-end">
                    <form.Field name="gallery" mode="array">
                      {(field) => {
                        return (
                          <>
                            <UploadField
                              className="flex justify-center size-24"
                              onClick={() =>
                                setShowUploadModal({
                                  type: "gallery",
                                  isOpen: true,
                                })
                              }
                            />

                            {field?.state?.value?.map((url, index) => (
                              <img
                                src={url}
                                key={index}
                                className="size-24 object-cover border-2 border-dashed border-gray-400 rounded-md p-1"
                              />
                            ))}
                          </>
                        );
                      }}
                    </form.Field>
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
                      // onClick={handleAddNewCategory}
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
                      <SelectDropdown className="py-2 w-full">
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

      {/* =================== USE CASE: ADD CATEGORY IF DOES'T EXISTS =================== */}
      {/* <AddCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      /> */}

      {/* =================== USE CASE: SELECT PICTURE FROM MODAL  =================== */}
      <UploadModal
        setIsOpen={setShowUploadModal}
        isOpen={showUploadModal?.isOpen}
        type={showUploadModal?.type}
        handleOnChangeUpload={handleOnChangeUpload}
      />
    </>
  );
};
export default ProductEditor;
