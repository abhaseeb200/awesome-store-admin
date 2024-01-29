import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "..";
import Button from "../../button";
import InputCustom from "../../inputs";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../../redux/actions/categoryAction";

const AddCategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  currentCategory,
  setCurrentCategory,
  currentID,
  isUpdate,
}) => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);

  const handleAdd = (e) => {
    e.preventDefault();
    let val = currentCategory.value.trim();
    //Empty Validation
    if (val === "") {
      setCurrentCategory({
        value: "",
        isError: true,
        messageError: "Category name should not be empty",
      });
      return;
    }
    //Already Existed Validation
    let isAlready = categoryList.some(
      (item) => item.category.toLowerCase() === val.toLowerCase()
    );
    if (isAlready) {
      setCurrentCategory({
        value: val,
        isError: true,
        messageError: "Category name already existed",
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
    let val = currentCategory.value.trim().toLowerCase();
    dispatch(updateCategoryAction(val, currentID));
    setIsOpenModal(false);
    toast.success("Category Updated Succesffully!", {
      autoClose: 1500,
    });
  };

  const handleAddNew = () => {
    dispatch(createCategoryAction(currentCategory.value.trim().toLowerCase()));
    setIsOpenModal(false);
    toast.success("Category Added Succesffully!", {
      autoClose: 1500,
    });
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
