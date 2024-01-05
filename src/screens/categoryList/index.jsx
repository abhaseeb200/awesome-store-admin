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
import Modal from "../../components/modal";
import { getCategories } from "../../api/api";

const CategoryList = () => {
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [cardInnerLoader, setCardInnerLoader] = useState(false); //it work only if pagination, search or post per page functionality
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPaginationNum(pageNumber);
    // setSkip((pageNumber - 1) * 10); //10 is post per page
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchCategories = async () => {
    try {
      let response = await getCategories();
      setCategories(response.data);
      setMainLoader(false);
    } catch (error) {
      console.log(error);
    }
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
                {categories.length > 10 && (
                  <SelectCustom customClass="py-2">
                    <option value="10" select="select">
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </SelectCustom>
                )}
                <Button
                  name="Add Category"
                  onClick={() => setIsOpenModal(true)}
                />
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
                    {categories.map((category, index) => {
                      return (
                        <tr
                          className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm"
                          key={index}
                        >
                          <td className="py-4 pl-5 capitalize">{category}</td>
                          <td className="py-4 pr-5">
                            <span className="flex gap-1.5 justify-end text-gray-500">
                              <span className="hover:text-primaryDark cursor-pointer">
                                <TbEdit size="1.3rem" />
                              </span>
                              <span className="hover:text-primaryDark cursor-pointer">
                                <MdOutlineDeleteOutline size="1.3rem" />
                              </span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {/* footer - pagination */}
            <div className="py-6 px-5 flex sm:flex-row flex-col gap-3 justify-between items-center">
              {categories?.length > 10 && (
                <>
                  <p className="text-xs text-gray-500">
                    Displaying 1 to 10 of 100 entries
                  </p>
                  <Pagination
                    totalPages="3"
                    currentPage={currentPaginationNum}
                    onPageChange={handlePageChange}
                  />
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

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        customWidth="w-full max-w-lg"
      >
        <h3 className="text-lg text-gray-600 font-medium">Add New Category</h3>
        <div className="my-5">
          <label className="text-sm text-gray-500">Category Name</label>
          <InputCustom placeholder="Mens-Shoes" />
        </div>
        <div className="flex gap-4 mb-2">
          <Button name="Add" className="w-1/2 justify-center" />
          <Button
            name="Cancel"
            className="w-1/2 justify-center customSecondaryButton"
            onClick={() => setIsOpenModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategoryList;
