import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Card } from "../../components/card";
import CardSkeleton from "../../components/card/skeleton";
import InputCustom from "../../components/inputs";
import PageHeading from "../../components/pageTitle";
import SelectCustom from "../../components/select";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import { getCategories } from "../../api/api";
import AddCategoryModal from "../../components/modal/addCategoryModal";

const CategoryList = () => {
  // const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [cardInnerLoader, setCardInnerLoader] = useState(false); //it work only if pagination, search or post per page functionality
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesBackUP, setCategoriesBackUP] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    //cateogory value for both ADD and UPDATE
    value: "",
    isError: false,
    messageError: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const handlePageChange = (pageNumber) => {
    // setCurrentPaginationNum(pageNumber);
    // setSkip((pageNumber - 1) * 10); //10 is post per page
  };

  const handleSearch = (e) => {
    let val = e.target.value;
    setSearch(val);
    if (val.trim() !== "") {
      let filter = categories.filter((category) =>
        category.toLowerCase().includes(val.trim().toLowerCase())
      );
      // console.log(filter);
      setCategoriesBackUP(filter);
    } else {
      setCategoriesBackUP(categories);
    }
  };

  const handleAddCategory = (e) => {
    setIsOpenModal(true);
    setIsUpdate(false);
    setCurrentCategory({ value: "" });
  };

  const fetchCategories = async () => {
    try {
      let response = await getCategories();
      setCategories(response.data);
      setCategoriesBackUP(response.data);
      setMainLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    console.log(category, "---------");
    setIsOpenModal(true);
    setCurrentCategory({ value: category });
    setIsUpdate(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div>
        <PageHeading title="Category List" />
        {mainLoader ? (
          <CardSkeleton />
        ) : categories?.length > 0 ? (
          <Card>
            {/* head - search & filter */}
            <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between px-5">
              <span className="sm:w-48 w-full block">
                <InputCustom
                  type="text"
                  placeholder="Search Category"
                  onChange={handleSearch}
                  value={search}
                />
              </span>
              <span className="flex items-center gap-2">
                {/* {categoriesBackUP.length > 10 && (
                  <SelectCustom customClass="py-2">
                    <option value="10" select="select">
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </SelectCustom>
                )} */}
                <Button name="Add Category" onClick={handleAddCategory} />
              </span>
            </div>
            {/* body - table */}
            <div className="overflow-auto">
              {cardInnerLoader ? (
                <div className="animate-pulse px-5">
                  <div className="p-4 bg-gray-300"></div>
                  <div className="p-4 my-2 bg-gray-300"></div>
                  <div className="p-4 bg-gray-300"></div>
                </div>
              ) : (
                <table className="table-auto w-full">
                  <thead>
                    <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                      <th className="text-left py-4 font-medium pl-5">
                        Category
                      </th>
                      <th className="py-4 font-medium pr-5 text-end">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesBackUP.length > 0 ? (
                      categoriesBackUP.map((category, index) => {
                        return (
                          <tr
                            className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm"
                            key={index}
                          >
                            <td className="py-4 pl-5 capitalize">{category}</td>
                            <td className="py-4 pr-5">
                              <span className="flex gap-1.5 justify-end text-gray-500">
                                <span className="hover:text-primaryDark cursor-pointer">
                                  <TbEdit
                                    size="1.3rem"
                                    onClick={() => handleEdit(category)}
                                  />
                                </span>
                                <span className="hover:text-primaryDark cursor-pointer">
                                  <MdOutlineDeleteOutline size="1.3rem" />
                                </span>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                        <td className="py-4 text-center" colspan="5">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {/* footer - pagination */}
            <div className="py-6 px-5 flex sm:flex-row flex-col gap-3 justify-between items-center">
              {categoriesBackUP?.length > 10 && (
                <>
                  {/* <p className="text-xs text-gray-500">
                    Displaying 1 to 10 of 100 entries
                  </p>
                  <Pagination
                    totalPages="3"
                    currentPage={currentPaginationNum}
                    onPageChange={handlePageChange}
                  /> */}
                </>
              )}
            </div>
          </Card>
        ) : (
          <Card>
            <p className="sm:text-xl text-gray-500 h-80 flex items-center justify-center">
              No category is found
            </p>
          </Card>
        )}
      </div>

      <AddCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default CategoryList;
