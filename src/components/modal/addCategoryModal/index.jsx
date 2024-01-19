import { useDispatch } from "react-redux";
import Modal from "..";
import Button from "../../button";
import InputCustom from "../../inputs";
import { updateCategoryAction } from "../../../redux/actions/categoryAction";

const AddCategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  currentCategory,
  setCurrentCategory,
  isUpdate,
}) => {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    //Validation Process
    if (currentCategory.value.trim() === "") {
      setCurrentCategory({
        value: "",
        isError: true,
        messageError: "Category name should not be empty",
      });
      return;
    }
    if (isUpdate) {
      //Update category
      handleUpdate();
    } else {
      //Add new cateogory
      handleAddNew();
    }
  };

  const handleUpdate = () => {
    dispatch(updateCategoryAction(currentCategory.value.trim().toLowerCase()));
    console.log(currentCategory.value.trim(), " UPDATE SUCESSFULLY!");
  };

  const handleAddNew = () => {
    console.log(currentCategory.value.trim(), " ADD SUCESSFULLY!");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  return (
    <Modal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      customWidth="w-full max-w-lg"
    >
      <h3 className="text-lg text-gray-600 font-medium dark:text-gray-200">
        Add New Category
      </h3>
      <form action="">
        <div className="my-5">
          <label className="text-sm text-gray-500 dark:text-gray-300">
            Category Name
          </label>
          <InputCustom
            placeholder="Mens-Shoes"
            value={currentCategory.value}
            isError={currentCategory.isError}
            messageError={currentCategory.messageError}
            onChange={(e) => setCurrentCategory({ value: e.target.value })}
          />
        </div>
        <div className="flex gap-4 mb-2">
          <Button
            name={isUpdate ? "Update" : "Add"}
            type="submit"
            className="w-1/2 justify-center"
            onClick={handleAdd}
          />
          <Button
            name="Cancel"
            className="w-1/2 justify-center customSecondaryButton"
            onClick={handleCancel}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
