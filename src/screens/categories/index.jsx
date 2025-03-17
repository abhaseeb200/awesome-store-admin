import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Card } from "@/components/card";
import CardSkeleton from "@/components/card/skeleton";
import Input from "@/components/inputs";
import PageHeading from "@/components/pageTitle";
import SelectDropdown from "@/components/select";
import Pagination from "@/components/pagination";
import Button from "@/components/button";
import AddCategoryModal from "@/components/modal/addCategoryModal";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import Table from "@/components/table";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import API from "@/config/api";
import { z } from "zod";

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const CategoryList = () => {
  const [data, _setData] = useState(() => [...defaultData]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [mainLoader, setMainLoader] = useState(false);
  const [cardInnerLoader, setCardInnerLoader] = useState(false); //it work only if pagination, search or post per page functionality
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(["ss"]);
  const [categoriesBackUP, setCategoriesBackUP] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [currentID, setCurrentID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  // const { categoryList } = useSelector((state) => state.category);
  // const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    // setCurrentPaginationNum(pageNumber);
    // setSkip((pageNumber - 1) * 10); //10 is post per page
  };

  const handleSearch = (e) => {
    // let val = e.target.value;
    // setSearch(val);
    // if (val.trim() !== "") {
    //   let filter = categories.filter((category) =>
    //     category.toLowerCase().includes(val.trim().toLowerCase())
    //   );
    //   // console.log(filter);
    //   setCategoriesBackUP(filter);
    // } else {
    //   setCategoriesBackUP(categories);
    // }
  };

  const handleAddCategory = (e) => {
    setIsOpenModal(true);
    setIsUpdate(false);
    // setCurrentCategory({ value: "" });
  };

  const fetchCategories = async () => {
    // try {
    //   let response = await getCategories();
    //   dispatch(getCategoryAction(response.data));
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setMainLoader(false);
    // }
  };

  const handleEdit = (categoryData) => {
    // const {id, name, slug} = categoryData
    // setCurrentCategory({ value: name });
    // setCurrentID(id)
    // setIsUpdate(true);
    // setIsOpenModal(true);
  };

  const handleDelete = (id) => {
    // dispatch(deleteCategoryAction(id));
    // toast.success("Category Deleted Succesffully!", {
    //   autoClose: 1500,
    // });
  };

  useEffect(() => {
    // console.log("___________________");
    // if (categoryList?.length) {
    //   setMainLoader(false);
    //   console.log({ categoryList }, "CATEGORY");
    //   setCategories(categoryList);
    //   setCategoriesBackUP(categoryList);
    // } else {
    //   fetchCategories();
    // }
  }, []);

  // useEffect(() => {
  //   setCategories(categoryList);
  //   setCategoriesBackUP(categoryList);
  // }, [categoryList]);

  //----------------- NEW CODE-----------------

  const columns = [
    { accessorKey: "firstName", cell: (info) => info.getValue() },
    {
      accessorFn: (row) => row.lastName,
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    },
    {
      accessorKey: "age",
      header: () => "Age",
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
    },
    {
      id: "actions",
      header: "Action",
      cell: (info) => (
        <span className="flex gap-1.5 justify-center text-gray-500 dark:text-gray-300 actions">
          {/* =========== UPDATE - USE-CASE:  =========== */}
          <Link to={`update`}>
            <span className="hover:text-primaryDark cursor-pointer">
              <TbEdit size="1.3rem" />
            </span>
          </Link>

          {/* =========== DELETE - USE-CASE: DELETE CATEGORY WITH THEIR ID =========== */}
          <span
            className="hover:text-primaryDark cursor-pointer"
            onClick={() => console.log("delete", info?.row?.original)}
          >
            <MdOutlineDeleteOutline size="1.3rem" />
          </span>
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div>
        <PageHeading title="Category List" />
        {mainLoader ? (
          <CardSkeleton />
        ) : (
          <Card>
            {/* head - search & filter */}
            <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between px-5">
              <span className="sm:w-48 w-full block">
                {/* <Input
                  type="text"
                  placeholder="Search Category"
                  onChange={handleSearch}
                  value={search}
                /> */}
              </span>
              <span className="flex items-center gap-2">
                {/* {categoriesBackUP.length > 10 && (
                  <SelectDropdown customClass="py-2">
                    <option value="10" select="select">
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </SelectDropdown>
                )} */}
                <Button name="Add Category" onClick={handleAddCategory} />
              </span>
            </div>

            <Table table={table} />

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
        )}
      </div>

      <AddCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        currentID={currentID}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default CategoryList;
