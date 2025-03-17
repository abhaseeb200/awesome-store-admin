import { toast } from "react-toastify";
import Modal from "..";
import Button from "@/components/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/inputs";
import UploadModal from "../uploadModal";
import { useState } from "react";
import UploadField from "@/components/uploadField";

const categorySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const AddCategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  currentCategory,
  setCurrentCategory,
  currentID,
  isUpdate,
}) => {
  const [showUploadModal, setShowUploadModal] = useState({
    type: "thumbnail",
    isOpen: false,
  });

  console.log(isOpenModal,"++++++++++");
  

  // const dispatch = useDispatch();
  // const { categoryList } = useSelector((state) => state.category);

  const handleAdd = (e) => {
    // e.preventDefault();
    // let val = currentCategory.value.trim();
    // //Empty Validation
    // if (val === "") {
    //   setCurrentCategory({
    //     value: "",
    //     isError: true,
    //     messageError: "Category name should not be empty",
    //   });
    //   return;
    // }
    // //Already Existed Validation
    // let isAlready = categoryList.some(
    //   (item) => item.category.toLowerCase() === val.toLowerCase()
    // );
    // if (isAlready) {
    //   setCurrentCategory({
    //     value: val,
    //     isError: true,
    //     messageError: "Category name already existed",
    //   });
    //   return;
    // }
    // if (isUpdate) {
    //   //Update category
    //   handleUpdate();
    // } else {
    //   //Add new cateogory
    //   handleAddNew();
    // }
  };

  const handleUpdate = () => {
    // let val = currentCategory.value.trim().toLowerCase();
    // dispatch(updateCategoryAction(val, currentID));
    // setIsOpenModal(false);
    // toast.success("Category Updated Succesffully!", {
    //   autoClose: 1500,
    // });
  };

  const handleAddNew = () => {
    // dispatch(createCategoryAction(currentCategory.value.trim().toLowerCase()));
    // setIsOpenModal(false);
    // toast.success("Category Added Succesffully!", {
    //   autoClose: 1500,
    // });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // setIsOpenModal(false);
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return API.post("/categories/add", data);
    },
    onSuccess: (response) => {
      toast.success("Category added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "title",
      description: "lorem ipsum",
      thumbnail: "",
    },
    validators: {
      onChange: categorySchema,
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
    form.setFieldValue(type, url);
    setShowUploadModal({ type: "thumbnail", isOpen: false });
  };

  return (
    <>
      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        customWidth="w-full max-w-lg"
      >
        <h3 className="text-lg text-gray-600 font-medium dark:text-gray-200 mb-4">
          Add New Category
        </h3>
        <form
          className="flex gap-4 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* ================== TITLE ================== */}
          <form.Field
            name="title"
            children={(field) => {
              return (
                <Input
                  id={field?.name}
                  type="text"
                  placeholder="Mens Shoes"
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

          {/* ================== THUMBNAIL ================== */}
          <form.Field
            name="thumbnail"
            children={(field) => {
              return (
                <div>
                  <UploadField
                    className="h-52 justify-center"
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

          {/* ================== SUBMIT BUTTON ================== */}
          <div className="flex gap-4 mb-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  isLoading={isSubmitting}
                  className="w-1/2 justify-center"
                  name={`${isUpdate ? "Update" : "Publish"} Product`}
                />
              )}
            />
            <Button
              type="button"
              name="Cancel"
              className="w-1/2 justify-center customSecondaryButton"
              onClick={handleCancel}
            />
          </div>
        </form>
      </Modal>

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

export default AddCategoryModal;
