import { set, z } from "zod";
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
import SelectSearch from "@/components/SelectSearch";
import useCategory from "@/hook/useCategory";
import useProduct from "@/hook/useProduct";
import useBrand from "@/hook/useBrand";

const ProductEditor = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [mediaType, setMediaType] = useState("thumbnail"); //type: gallery or thumbnail
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isProductFound = false;
  const isSelectQuery = true;

  const { createMutation, singleProductFetch, updateMutation } = useProduct(id);

  const currentProduct = singleProductFetch?.data;

  const {
    selectQuery,
    setPagination,
    categoriesSelect,
    setSearchValue,
    pagination,
  } = useCategory(isSelectQuery);

  const {
    selectQuery: selectQueryBrand,
    setPagination: setPaginationBrand,
    brandsSelect,
    setSearchValue: setSearchValueBrand,
    pagination: paginationBrand,
  } = useBrand(isSelectQuery);

  const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.object({
      _id: z.string().min(1, { message: "Category is required" }),
    }),
    brand: z.object({
      _id: z.string().min(1, { message: "Brand is required" }),
    }),
    price: z.coerce.number().min(1, "Price is required"),
    stock: z.coerce.number().min(1, "Stock is required"),
  });

  const form = useForm({
    validators: {
      onChange: productSchema,
      onSubmit: ({ value }) => {
        return {
          fields: {
            thumbnail: value?.thumbnail ? undefined : "Please upload media",
          },
        };
      },
    },
    onSubmit: async ({ value }) => {
      if (currentProduct) {
        //UPDATE PRODUCT
        const brand = {
          label: currentProduct?.brand?.title,
          _id: currentProduct?.brand?._id,
        };

        const category = {
          label: currentProduct?.category?.title,
          _id: currentProduct?.category?._id,
        };

        updateMutation.mutate({ ...value, category, brand });
      } else {
        //CREATE PRODUCT
        createMutation.mutate(value, {
          onSuccess: () => {
            form.reset();
          },
        });
      }

    },
  });

  const handleOnChangeUpload = (url, type) => {
    if (type === "gallery") {
      form.setFieldValue("gallery", (oldItems) => [...(oldItems || []), url]);
    } else {
      form.setFieldValue("thumbnail", url);
      form.validateField("thumbnail");
    }
    setShowUploadModal(false);
  };

  useEffect(() => {
    if (currentProduct) {
      form.reset(currentProduct);
    }
  }, [currentProduct]);

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
                {currentProduct ? "Update Product" : "Add Product"}
              </h2>
              <span className="text-gray-500 dark:text-gray-300 text-sm">
                Orders placed across your store
              </span>
            </div>
            <div>
              <Button
                type="submit"
                disabled={!createMutation?.canSubmit}
                isLoading={createMutation?.isSubmitting}
                name={`${currentProduct ? "Update" : "Publish"} Product`}
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
                        value={field?.state.value || ""}
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
                        value={field?.state.value || ""}
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
                        value={field?.state.value || ""}
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
                          value={field?.state.value || ""}
                          isError={field?.state?.meta?.errors?.length}
                          messageError={field?.state?.meta?.errors}
                          onClick={() => {
                            setMediaType(field?.name);
                            setShowUploadModal(true);
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
                              className="flex justify-center h-40"
                              title="Browse a image"
                              onClick={() => {
                                setMediaType(field?.name);
                                setShowUploadModal(true);
                              }}
                            />

                            <div className="flex flex-wrap">
                              {field?.state?.value?.map((url, index) => (
                                <div className="w-[16.6%]" key={index}>
                                  <img
                                    src={url}
                                    className="mx-2 object-cover border-2 border-dashed border-gray-400 rounded-md p-0.5"
                                  />
                                </div>
                              ))}
                            </div>
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
                        value={field?.state.value || ""}
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
                  name="discountPercentage"
                  children={(field) => {
                    return (
                      <Input
                        id={field?.name}
                        type="number"
                        placeholder="Enter your product discounted price"
                        label="Discounted Price (Optional)"
                        name={field?.name}
                        value={field?.state.value || ""}
                        onChange={(e) => field?.handleChange(e?.target?.value)}
                        isError={field?.state?.meta?.errors?.length}
                        messageError={field?.state?.meta?.errors}
                        autoComplete={field?.name}
                      />
                    );
                  }}
                />
              </Card>

              <Card className="px-6 py-6 flex gap-4 flex-col relative z-10">
                <CardHeading title="Organize" />

                {/* ================= SELECT BRAND ================= */}
                <div className="relative z-10">
                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-1 flex justify-between">
                    <span>Select Brand</span>
                  </div>

                  <form.Field
                    name="brand"
                    children={(field) => {
                      return (
                        <SelectSearch
                          placeholder="Select your brand"
                          options={brandsSelect}
                          total={selectQueryBrand?.data?.total}
                          value={field?.state.value || ""}
                          isError={field?.state?.meta?.errors?.length}
                          messageError={field?.state?.meta?.errors}
                          pageIndex={paginationBrand?.pageIndex + 1}
                          setPagination={setPaginationBrand} // USED FOR LOAD MORE: PAGE NUMBER 0,1,2...
                          setSearchValue={setSearchValueBrand}
                          onChange={(value) => {
                            field?.handleChange({
                              _id: value?._id,
                              label: value?.title,
                            });
                          }}
                        />
                      );
                    }}
                  />
                </div>

                {/* ================= SELECT CATEGORY ================= */}
                <div className="relative">
                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-1 flex justify-between">
                    <span>Select Category</span>
                  </div>

                  <form.Field
                    name="category"
                    children={(field) => {
                      return (
                        <SelectSearch
                          placeholder="Select your category"
                          options={categoriesSelect}
                          total={selectQuery?.data?.total}
                          value={field?.state.value}
                          isError={field?.state?.meta?.errors?.length}
                          messageError={field?.state?.meta?.errors}
                          pageIndex={pagination?.pageIndex + 1}
                          setPagination={setPagination} // USED FOR LOAD MORE: PAGE NUMBER 0,1,2...
                          setSearchValue={setSearchValue}
                          onChange={(value) => {
                            field?.handleChange({
                              _id: value?._id,
                              label: value?.title,
                            });
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </form>
      )}

      {/* =================== USE CASE: SELECT PICTURE FROM MODAL  =================== */}
      <UploadModal
        setIsOpen={setShowUploadModal}
        handleOnChangeUpload={handleOnChangeUpload}
        isOpen={showUploadModal}
        type={mediaType}
      />
    </>
  );
};
export default ProductEditor;
