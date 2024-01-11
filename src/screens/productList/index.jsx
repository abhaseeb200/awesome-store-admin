import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoPrintOutline } from "react-icons/io5";
import { PiNewspaperLight } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GoDownload } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { LuEye, LuLoader2 } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import InputCustom from "../../components/inputs";
import Dropdown from "../../components/dropdown";
import SelectCustom from "../../components/select";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import PageHeading from "../../components/pageTitle";
import { Card } from "../../components/card";
import CardSkeleton from "../../components/card/skeleton";
import Modal from "../../components/modal";
import ThumbnailSlider from "../../components/slider";
import {
  getCategories,
  getCategoryData,
  getProducts,
  searchProduct,
} from "../../api/api";

const ProductList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [cardInnerLoader, setCardInnerLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  // const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [currentProduct, setCurrentProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [skip, setSkip] = useState(0);
  // const [skipSearch, setSkipSearch] = useState(0);
  const [total, setTotal] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10); //work as a limit
  const [search, setSearch] = useState("");
  const [searchButtton, setSearchButtton] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isOnLoaded, setIsOnLoaded] = useState(true);

  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);
  const queryParam = currentParams.get("q");
  const postPerPageParam = currentParams.get("postPerPage");
  const skipParam = currentParams.get("offset");
  const categoryParam = currentParams.get("category");

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
    let skipTEMP = (pageNumber - 1) * postPerPage;
    setSkip(skipTEMP);
    setCardInnerLoader(true);
    if (search.trim() !== "") {
      handleSearch(postPerPage, skipTEMP);
    } else {
      fetchProductData(postPerPage, skipTEMP);
    }
  };

  const handlePostPerPage = (e) => {
    let val = e.target.value;
    setPostPerPage(val);
    setSkip(0);
    setCurrentPaginationNum(1); //May be its useless
    setCardInnerLoader(true);
    if (search.trim() !== "") {
      handleSearch(val, 0);
    } else {
      fetchProductData(val, 0);
    }
  };

  const handleView = (product) => {
    console.log({ product }, "VIEW");
    setIsOpenModal(true);
    setCurrentProduct(product);
  };

  const discountPrice = (price, discountPercentage) => {
    let priceAfterDiscount = price - (discountPercentage / 100) * price;
    return priceAfterDiscount.toFixed(2);
  };

  const handleCategoryFilter = (e) => {
    let val = e.target.value;
    setCurrentCategory(val);
    setCardInnerLoader(true);
    fetchCategoryProducts(val);
  };

  const fetchCategories = async () => {
    try {
      let response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryProducts = async (category) => {
    // console.log({ category, categoryParam, currentCategory });
    // setCardInnerLoader(true);
    if (category === "0") {
      fetchProductData();
    } else {
      try {
        setSearch("");
        let response = await getCategoryData(category);
        // console.log(response);
        setProductData(response.data.products);
        setTotal(response.data.total);
        setSkip(0);
        setCurrentPaginationNum(1);
      } catch (error) {
        console.log(error);
      } finally {
        setCardInnerLoader(false);
        setMainLoader(false);
      }
    }
  };

  const handleSearch = async (
    currentPostPerPage = postPerPage,
    currentSkip = skip,
    currentSearch = search
  ) => {
    console.log({ currentSearch, currentPostPerPage, searchLoader });
    if (currentSearch.trim() !== "" && !searchLoader) {
      try {
        setSearchLoader(true);
        setCurrentCategory("");
        let option = {
          limit: currentPostPerPage,
          skip: currentSkip,
          search: currentSearch,
        };
        let response = await searchProduct(option);
        setProductData(response.data.products);
        setTotal(response.data.total);
        setSkip(response.data.skip);
        setIsSearch(true);
        if (response.data.skip === 0) {
          setCurrentPaginationNum(1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSearchLoader(false);
        setCardInnerLoader(false);
        setMainLoader(false);
      }
    } else {
      console.log("SEARCH IS NOTING....");
      setSkip(0);
      fetchProductData();
      setCurrentPaginationNum(1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !searchLoader) {
      setCardInnerLoader(true);
      setSearchButtton(search);
      handleSearch(postPerPage, 0);
    }
  };

  const fetchProductData = async (
    currentPostPerPage = postPerPage,
    currentSkip = skip
  ) => {
    console.log("--------------", { currentSkip }, { currentPostPerPage });
    try {
      let option = { limit: currentPostPerPage, skip: currentSkip };
      let response = await getProducts(option);
      setProductData(response.data.products);
      setSkip(response.data.skip);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoader(false);
      setCardInnerLoader(false);
    }
  };

  const handleParams = () => {
    //QUERY SEARCH
    if (search) {
      currentParams.set("q", search);
    } else {
      currentParams.delete("q");
    }

    if (postPerPage > 10) {
      currentParams.set("postPerPage", postPerPage);
    } else {
      currentParams.delete("postPerPage");
    }

    // console.log({ currentPaginationNum, postPerPage, skip }, "+++==");
    if (skip >= postPerPage) {
      currentParams.set("offset", skip);
    } else {
      currentParams.delete("offset");
    }

    if (currentCategory !== "0" && currentCategory) {
      console.log({ currentCategory }, "+++++++");
      currentParams.forEach((value, key) => {
        if (key !== "category") {
          currentParams.delete(key);
        }
      });
      currentParams.set("category", currentCategory);
    } else {
      currentParams.delete("category");
    }

    const newURL = currentParams.toString()
      ? `${location.pathname}?${currentParams.toString()}`
      : location.pathname;

    history.replaceState({}, "", newURL);
  };

  useEffect(() => {
    fetchCategories();
    let postPerPageTEMP = postPerPage;
    let skipTemp = skip;
    if (postPerPageParam) {
      postPerPageTEMP = parseInt(postPerPageParam);
      setPostPerPage(parseInt(postPerPageParam)); //May be its useless
    }
    if (skipParam) {
      setSkip(parseInt(skipParam)); //May be its useless
      skipTemp = parseInt(skipParam);
      let pageNumber = Math.ceil(parseInt(skipParam) / postPerPageTEMP + 1);
      setCurrentPaginationNum(pageNumber);
    }

    if (queryParam) {
      setSearch(queryParam); //May be its useless
      setSearchButtton(queryParam); //May be its useless
      handleSearch(postPerPageTEMP, skipTemp, queryParam);
    } else if (categoryParam) {
      setCurrentCategory(categoryParam); //May be its useless
      fetchCategoryProducts(categoryParam);
    } else {
      fetchProductData(postPerPageTEMP, skipTemp);
    }
  }, []);

  useEffect(() => {
    console.log("PARRAMS ");
    handleParams();
  }, [searchButtton, postPerPage, skip, currentCategory]);

  return (
    <>
      <div>
        <PageHeading title="Product List" />
        {mainLoader ? (
          <CardSkeleton />
        ) : (
          <Card>
            {/* head - filter */}
            <div className="filter py-6 px-5">
              <h4 className="text-lg text-gray-600 font-medium pb-2">Filter</h4>
              <div className="flex sm:flex-row flex-col gap-4">
                <span className="sm:w-1/2 w-full">
                  <SelectCustom
                    customClass="w-full py-2 capitalize"
                    onChange={handleCategoryFilter}
                    value={currentCategory}
                  >
                    <option value="0" select="select">
                      Select Category
                    </option>
                    {categories.map((item, index) => {
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
            <div className="py-6 px-5 flex sm:flex-row flex-col gap-4 justify-between">
              <span className="sm:w-48 w-full block relative">
                <InputCustom
                  type="text"
                  placeholder="Search Product"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <span
                  className="absolute top-1.5 right-1.5 text-primaryDark p-1 cursor-pointer rounded-md bg-primaryLight hover:text-white hover:bg-primaryDark transition "
                  onClick={() => {
                    // let isSearch = true;
                    handleSearch(postPerPage, 0);
                    setSearchButtton(search);
                  }}
                >
                  {searchLoader ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    <IoIosSearch />
                  )}
                </span>
              </span>
              <span className="flex flex-wrap gap-2 items-center">
                {total > 10 && (
                  <SelectCustom
                    customClass="py-2 sm:w-auto sm:flex-none w-1/2 flex-1"
                    onChange={handlePostPerPage}
                    value={postPerPage}
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
                  titleClass="relative bg-gray-300 flex items-center py-2 px-6 rounded-md text-gray-600 text-sm w-full justify-center"
                  menuItemsClass="absolute left-0 w-full"
                />
                <Link to="/productEditor" className="sm:w-auto w-full">
                  <Button
                    name="Add Product"
                    icon={<GrAdd size="1rem" />}
                    className="w-full justify-center"
                  />
                </Link>
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
                        Product
                      </th>
                      <th className="text-left py-4 px-3 font-medium">
                        Category
                      </th>
                      <th className="text-left py-4 px-3 font-medium">Price</th>
                      <th className="text-left py-4 px-3 font-medium">QTY</th>
                      <th className="py-4 font-medium pr-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.length > 0 ? (
                      productData.map((product, index) => {
                        return (
                          <tr
                            className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm"
                            key={index}
                          >
                            <td className="py-4 flex gap-2 pl-5">
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
                            <td className="py-4 pr-5">
                              <span className="flex gap-1.5 justify-center text-gray-500">
                                <Link to={`/productEditor/${product?.id}`}>
                                  <span className="hover:text-primaryDark cursor-pointer">
                                    <TbEdit size="1.3rem" />
                                  </span>
                                </Link>
                                <span className="hover:text-primaryDark cursor-pointer">
                                  <MdOutlineDeleteOutline size="1.3rem" />
                                </span>
                                <span
                                  className="hover:text-primaryDark cursor-pointer"
                                  onClick={() => handleView(product)}
                                >
                                  <LuEye size="1.3rem" />
                                </span>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                        <td className="py-4 text-center" colSpan="5">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {/* footer - pagination */}
            <div className="py-6 flex sm:flex-row flex-col gap-3 justify-between items-center px-5">
              {total > 10 && (
                <>
                  <p className="text-xs text-gray-500">
                    {/* Displaying 1 to 10 of 100 entries */}
                  </p>
                  <Pagination
                    totalPages={Math.ceil(total / postPerPage)} //10 is post per page
                    currentPage={currentPaginationNum}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        customWidth="w-full max-w-4xl"
      >
        <div className="flex item-center sm:flex-row flex-col gap-5 items-center">
          <div className="sm:w-1/2 w-full  aspect-square bg-gray-200">
            <ThumbnailSlider currentProductData={currentProduct} />
          </div>
          <div className="sm:w-1/2 w-full text-gray-600">
            <p className="bg-gray-800 text-white px-3 py-1 uppercase text-sm inline">
              {currentProduct?.brand}
            </p>
            <h3 className="text-2xl font-semibold pt-2 pb-4">
              {currentProduct?.title}
              <span className="text-sm pl-2">
                ({currentProduct?.discountPercentage}% OFF)
              </span>
            </h3>
            <p className="pb-2 font-semibold">
              <span className="text-lg line-through text-gray-400 pe-2">
                ${currentProduct?.price}
              </span>
              <span className="text-lg">
                $
                {discountPrice(
                  currentProduct?.price,
                  currentProduct?.discountPercentage
                )}
                {/* {(
                  currentProduct?.price -
                  (currentProduct?.discountPercentage / 100) *
                    currentProduct?.price
                ).toFixed(2)} */}
              </span>
            </p>
            <p className="text-sm pb-3">{currentProduct?.description}</p>
            <p className="text-sm">
              <span className="font-semibold mr-2">Availability:</span>
              {currentProduct?.stock} in Stock
            </p>
            <p className="text-sm">
              <span className="font-semibold mr-2">Category:</span>
              <span className="capitalize">{currentProduct?.category}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductList;
