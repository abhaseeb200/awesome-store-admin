import { useEffect } from "react";
import { z } from "zod";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { useForm } from "@tanstack/react-form";
import Input from "@/components/inputs";
import UploadModal from "@/components/modal/uploadModal";
import UploadField from "@/components/uploadField";
import useCategory from "@/hook/useCategory";

const categorySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  // thumbnail: z.string().min(1, { message: "Thumbnail is required" }),
});

const AddCategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  showUploadModal,
  setShowUploadModal,
  updateCategory,
  isUpdate,
}) => {
  const { createMutation, updateMutation } = useCategory(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  const form = useForm({
    defaultValues: {
      title: updateCategory?.title,
      description: updateCategory?.description,
      thumbnail: updateCategory?.thumbnail,
    },
    validators: {
      onChange: categorySchema,
      onSubmit: ({ value }) => {
        return {
          fields: {
            thumbnail: value?.thumbnail ? undefined : "Please upload media",
          },
        };
      },
    },
    onSubmit: async ({ value }) => {
      if (isUpdate) {
        let mergedWithId = { value, id: updateCategory?._id };
        updateMutation.mutate(mergedWithId, {
          onSuccess: () => {
            setIsOpenModal(false);
          },
        });
      } else {
        createMutation.mutate(value, {
          onSuccess: () => {
            form.reset();
            setIsOpenModal(false);
          },
        });
      }
    },
  });

  const handleOnChangeUpload = (url) => {
    form.setFieldValue("thumbnail", url);
    form.validateField("thumbnail", "change");
    setShowUploadModal(false);
  };

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [isOpenModal]);

  return (
    <>
      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        customWidth="w-full max-w-lg"
      >
        <h3 className="text-lg text-gray-600 font-medium dark:text-gray-200 mb-4">
          {isUpdate ? "Update" : "Add New"} Category
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

          {/* ================== DESCRIPTION ================== */}
          <form.Field
            name="description"
            children={(field) => {
              return (
                <Input
                  id={field?.name}
                  type="description"
                  placeholder="Description"
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
                    onClick={() => setShowUploadModal(true)}
                  />
                </div>
              );
            }}
          />

          {/* ================== SUBMIT BUTTONS ================== */}
          <div className="flex gap-4 mb-2">
            {isUpdate ? (
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                isLoading={updateMutation.isPending}
                className="w-1/2 justify-center"
                name={"Update Product"}
              />
            ) : (
              <Button
                type="submit"
                disabled={createMutation.isPending}
                isLoading={createMutation.isPending}
                className="w-1/2 justify-center"
                name={"Publish Product"}
              />
            )}

            <Button
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
        isOpen={showUploadModal}
        handleOnChangeUpload={handleOnChangeUpload}
      />
    </>
  );
};

export default AddCategoryModal;
