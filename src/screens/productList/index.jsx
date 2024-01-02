import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdMoreVert } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import { PiNewspaperLight } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GoDownload } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import InputCustom from "../../components/inputs";
import Dropdown from "../../components/dropdown";
import SelectCustom from "../../components/select";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import PageHeading from "../../components/pageTitle";
import { Card } from "../../components/card";
import CardSkeleton from "../../components/card/skeleton";
import { getCategories, getCategoryData, getProducts } from "../../api/api";

const ProductList = () => {
  const [mainLoader, setMainLoader] = useState(true);
  const [cardInnerLoader, setCardInnerLoader] = useState(false);
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [categoriesName, setCategoriesName] = useState([]);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [productData, setProductData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);

  const exportDropdownItems = [
    { label: "Print", icon: <IoPrintOutline size="1.1rem" /> },
    { label: "Cvs", icon: <PiNewspaperLight size="1.1rem" /> },
    { label: "Pdf", icon: <HiOutlineNewspaper size="1.1rem" /> },
  ];

  // const actionDropdownItems = [
  //   { label: "View", icon: <LuEye size="1.1rem" /> },
  //   { label: "Edit", icon: <TbEdit size="1.1rem" /> },
  //   { label: "Delete", icon: <MdOutlineDeleteOutline size="1.1rem" /> },
  // ];

  const handlePageChange = (pageNumber) => {
    setCurrentPaginationNum(pageNumber);
    setSkip((pageNumber - 1) * 10); //10 is post per page
  };

  const handlePostPerPage = (e) => {
    console.log(e.target.value);
    setPostPerPage(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    console.log(e.target.value);
    setCategoryFilterValue(e.target.value);
    fetchCategoryData(e.target.value);
  };

  const fetchCategoriesName = async () => {
    try {
      let response = await getCategories();
      setCategoriesName(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryData = async (category) => {
    setCardInnerLoader(true);
    if (category === "0") {
      fetchProductData();
    } else {
      try {
        let response = await getCategoryData(category);
        console.log(response);
        setProductData(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setCardInnerLoader(false);
      }
    }
  };

  const fetchProductData = async () => {
    try {
      let option = { limit: limit, skip: skip };
      let response = await getProducts(option);
      setProductData(response.data.products);
      setSkip(response.data.skip);
      setTotal(response.data.total);
      setLimit(response.data.limit);
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoader(false);
      setCardInnerLoader(false);
    }
  };

  useEffect(() => {
    fetchCategoriesName();
    fetchProductData();
  }, []);

  useEffect(() => {
    setCardInnerLoader(true);
    fetchProductData();
  }, [skip]);

  return (
    <>
      <div>
        <PageHeading title="Product List" />
        {mainLoader ? (
          <CardSkeleton />
        ) : (
          <Card>
            {/* head - filter */}
            <div className="filter py-6">
              <h4 className="text-lg text-gray-600 font-medium pb-2">Filter</h4>
              <div className="flex sm:flex-row flex-col gap-4">
                <span
                  className="sm:w-1/2 w-full"
                  onChange={handleCategoryFilter}
                  value={categoryFilterValue}
                >
                  <SelectCustom customClass="w-full py-2 capitalize">
                    <option value="0" select="select">
                      Select Category
                    </option>
                    {categoriesName.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })}
                  </SelectCustom>
                </span>
              </div>
            </div>
            <hr className="bg-gray-400 h-0.5" />
            {/* head - search */}
            <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between">
              <span className="sm:w-48 w-full block">
                <InputCustom type="text" placeholder="Search Product" />
              </span>
              <span className="flex flex-wrap gap-2 items-center">
                {productData.length > 10 && (
                  <SelectCustom
                    customClass="py-2"
                    onChange={handlePostPerPage}
                    value={limit}
                  >
                    <option value="10" select="select">
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </SelectCustom>
                )}
                <Dropdown
                  title="Export"
                  items={exportDropdownItems}
                  icon={<GoDownload size="1rem" className="mr-2" />}
                  titleClass="relative bg-gray-300 flex items-center py-2 px-6 rounded-md text-gray-600 text-sm"
                  menuItemsClass="absolute left-0 w-full"
                />
                <Link to="/addproduct">
                  <Button name="Add Product" icon={<GrAdd size="1rem" />} />
                </Link>
              </span>
            </div>
            {/* body - table */}
            <div className="overflow-auto">
              {cardInnerLoader ? (
                <div className="animate-pulse">
                  <div className="p-4 bg-gray-300"></div>
                  <div className="p-4 my-2 bg-gray-300"></div>
                  <div className="p-4 bg-gray-300"></div>
                </div>
              ) : (
                <table className="table-auto w-full">
                  <thead>
                    <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                      <th className="text-left py-4 font-medium">Product</th>
                      <th className="text-left py-4 px-3 font-medium">
                        Category
                      </th>
                      <th className="text-left py-4 px-3 font-medium">Price</th>
                      <th className="text-left py-4 px-3 font-medium">QTY</th>
                      <th className="py-4 px-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((product, index) => {
                      return (
                        <tr
                          className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm"
                          key={index}
                        >
                          <td className="py-4 flex gap-2">
                            <span>
                              <img
                                src={product.thumbnail}
                                width="40"
                                className="object-cover h-10"
                              />
                            </span>
                            <span className="flex flex-col">
                              <h5>{product.title}</h5>
                              <p className="text-gray-400">
                                {product.description.length >= 26
                                  ? product.description.slice(0, 26) + "..."
                                  : product.description}
                              </p>
                            </span>
                          </td>
                          <td className="py-4 px-3 capitalize">
                            {product.category}
                          </td>
                          <td className="py-4 px-3">${product.price}</td>
                          <td className="py-4 px-3">{product.stock}</td>
                          <td className="py-4">
                            <span className="hover:text-primaryDark">
                              <Link to={`/productList/${product.id}`}>
                                <LuEye
                                  size="1.1rem"
                                  className="mx-auto cursor-pointer"
                                />
                              </Link>
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
            <div className="py-6 flex sm:flex-row flex-col gap-3 justify-between items-center">
              {productData.length >= 10 && (
                <>
                  <p className="text-xs text-gray-500">
                    {/* Displaying 1 to 10 of 100 entries */}
                  </p>
                  <Pagination
                    totalPages={Math.ceil(total / 10)} //10 is post per page
                    currentPage={currentPaginationNum}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProductList;
