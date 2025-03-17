import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { GrAdd } from "react-icons/gr";
import { LuEye, LuLoader2 } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import InputCustom from "@/components/inputs";
import SelectCustom from "@/components/select";
import Pagination from "@/components/pagination";
import Button from "@/components/button";
import PageHeading from "@/components/pageTitle";
import { Card } from "@/components/card";
import CardSkeleton from "@/components/card/skeleton";
import ExportDropDown from "@/components/exportDropdown";
import useQueryParams from "@/hook/useQueryParams";
import ProductView from "@/screens/products/productView";
import API from "@/config/api";

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

const ProductList = () => {
  const [data, _setData] = useState(() => [...defaultData]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [search, setSearch] = useState("");
  const [exportTableData, setExportTableData] = useState([]);

  const { query, postPerPage, offset, category } = useQueryParams();

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => API.get("/products"),
  });

  if (error) {
    toast.error(error?.message || "An error occurred");
  }

  console.log(products, "FETCHHH.......");

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
          {/* =========== UPDATE - USE-CASE: OPEN A PRODUCT EDITOR SCREEN WITH THEIR ID IN PARAMS =========== */}
          <Link to={`update`}>
            <span className="hover:text-primaryDark cursor-pointer">
              <TbEdit size="1.3rem" />
            </span>
          </Link>

          {/* =========== DELETE - USE-CASE: DELETE PRODUCT WITH THEIR ID =========== */}
          <span
            className="hover:text-primaryDark cursor-pointer"
            onClick={() => console.log("delete", info?.row?.original)}
          >
            <MdOutlineDeleteOutline size="1.3rem" />
          </span>

          {/* =========== VIEW - USE-CASE: OPEN A MODAL =========== */}
          <span
            className="hover:text-primaryDark cursor-pointer"
            onClick={() => console.log("view", info?.row?.original)}
          >
            <LuEye size="1.3rem" />
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

  const handleView = (product) => {
    console.log({ product }, "VIEW");
    setIsOpenModal(true);
    setCurrentProduct(product);
  };

  const handleDelete = (product) => {
    const { id } = product;
  };

  return (
    <>
      <div>
        <PageHeading title="Product List" />
        {isPending ? (
          <CardSkeleton />
        ) : (
          <Card>
            {/* =================== FILTER =================== */}
            <div className="filter py-6 px-5">
              <h4 className="text-lg text-gray-600 font-medium pb-2 dark:text-gray-200">
                Filter
              </h4>
              <div className="flex sm:flex-row flex-col gap-4">
                <span className="sm:w-1/2 w-full">
                  {/* <SelectCustom
                    customClass="w-full py-2 capitalize"
                    onChange={handleCategoryFilter}
                    value={currentCategory}
                  >
                    <option value="0" select="select">
                      Select Category
                    </option>
                    {categories.map((item, index) => {
                      return (
                        <option value={item?.category?.slug} key={index}>
                          {item?.category?.name}
                        </option>
                      );
                    })}
                  </SelectCustom> */}
                </span>
              </div>
            </div>
            <hr className="bg-gray-400 h-0.5" />

            {/* =================== SEARCH BAR =================== */}
            <div className="py-6 px-5 flex lg:flex-row flex-col gap-4 justify-between">
              <span className="lg:w-48 w-full block relative">
                <InputCustom
                  type="text"
                  placeholder="Search Product"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  className="absolute top-1.5 right-1.5 text-primaryDark p-1 cursor-pointer rounded-md bg-primaryLight dark:bg-dark-600 dark:text-gray-300 hover:text-white hover:bg-primaryDark transition "
                  onClick={() => {
                    // handleSearch(postPerPage, 0);
                    // setSearchButtton(search);
                  }}
                >
                  {/* {searchLoader ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    <IoIosSearch />
                  )} */}
                </span>
              </span>
              <span className="flex gap-2 items-center">
                {/* <SelectCustom
                  customClass="py-2 lg:w-auto w-1/2 flex-1"
                  // onChange={handlePostPerPage}
                  value={postPerPage}
                >
                  <option value="10" select="select">
                    10
                  </option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </SelectCustom> */}
                <span className="lg:w-auto w-1/2">
                  {/* {productData?.length > 0 && (
                    <ExportDropDown
                      title="Product List"
                      filename="product_list_data"
                      exportData={exportTableData}
                    />
                  )} */}
                </span>
                <Link to="create" className="lg:w-auto w-1/2">
                  <Button
                    name="Add Product"
                    icon={<GrAdd size="1rem" />}
                    className="w-full justify-center"
                  />
                </Link>
              </span>
            </div>

            {/* =================== TABLE =================== */}
            <div className="overflow-auto">
              <table className="table-auto w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border border-y-1 border-x-0 border-gray-400 text-gray-500 dark:text-gray-200 uppercase text-sm"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className="text-left py-4 px-3 font-medium"
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={
                                  header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : ""
                                }
                                onClick={header.column.getToggleSortingHandler()}
                                title={
                                  header.column.getCanSort()
                                    ? header.column.getNextSortingOrder() ===
                                      "asc"
                                      ? "Sort ascending"
                                      : header.column.getNextSortingOrder() ===
                                        "desc"
                                      ? "Sort descending"
                                      : "Clear sort"
                                    : undefined
                                }
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-4 px-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================== PAGINATION ===================  */}
            {/* <div className="py-6 flex sm:flex-row flex-col gap-3 justify-between items-center px-5">
              {total > 10 && (
                <>
                  <p className="text-xs text-gray-500">
                    Displaying 1 to 10 of 100 entries
                  </p>
                  <Pagination
                    totalPages={Math.ceil(total / postPerPage)} //10 is post per page
                    currentPage={currentPaginationNum}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div> */}
          </Card>
        )}
      </div>

      <ProductView />
    </>
  );
};

export default ProductList;
