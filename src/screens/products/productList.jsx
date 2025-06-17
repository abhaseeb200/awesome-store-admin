import { useEffect, useMemo, useState } from "react";
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
import Pagination from "@/components/pagination";
import Button from "@/components/button";
import PageHeading from "@/components/pageTitle";
import { Card } from "@/components/card";
import CardSkeleton from "@/components/card/skeleton";
import ExportDropDown from "@/components/exportDropdown";
import useQueryParams from "@/hook/useQueryParams";
import ProductView from "@/screens/products/productView";
import API from "@/config/api";
import Input from "@/components/inputs";
import useProduct from "@/hook/useProduct";
import Table from "@/components/table";
import { IoClose } from "react-icons/io5";

const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState(null);

  const {
    searchValue,
    setSearchValue,
    productFetch,
    pagination,
    sorting,
    setPagination,
    setSorting,
  } = useProduct();

  const handleView = (product) => {
    setIsOpen(true);
    setProductData(product);
  };

  const handleDelete = (product) => {
    const { id } = product;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      },
      {
        accessorKey: "stock",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        cell: (info) => info.getValue(),
      },
      {
        header: "Discount",
        accessorKey: "discountPercentage",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "category",
        cell: (info) => info.getValue()?.title ?? "-",
      },
      {
        accessorKey: "brand",
        cell: (info) => info.getValue()?.title ?? "-",
      },
      {
        accessorKey: "thumbnail",
        cell: (info) => (
          <img src={info.getValue()} className="size-full max-w-20" />
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Action",
        cell: (info) => (
          <span className="flex gap-1.5 justify-start items-center text-gray-500 dark:text-gray-300 actions">
            {/* =========== VIEW - USE-CASE: OPEN IMAGE MODAL TO SHOW THUMBNAIL =========== */}
            <button
              onClick={() => handleView(info?.row?.original)}
              className="hover:text-primaryDark"
            >
              <LuEye size="1.3rem" />
            </button>

            {/* =========== UPDATE - USE-CASE:  =========== */}
            <Link to={`${info?.row?.original?._id}/update`}>
              <button className="hover:text-primaryDark">
                <TbEdit size="1.3rem" />
              </button>
            </Link>

            {/* =========== DELETE - USE-CASE: DELETE CATEGORY WITH THEIR ID =========== */}
            <button
              className="hover:text-primaryDark"
              onClick={() => deleteMutation.mutate(info?.row?.original)}
            >
              <MdOutlineDeleteOutline size="1.3rem" />
            </button>
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: productFetch?.data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    pageCount:
      Math.ceil(productFetch?.data?.total / productFetch?.data?.limit) || -1,
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <>
      <div>
        <PageHeading title="Product List" />
        {productFetch?.isLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <div className="py-6 px-5 flex lg:flex-row flex-col gap-4 justify-between">
              {/* =================== SEARCH BAR =================== */}
              <div className="relative flex gap-2 sm:items-center items-start sm:flex-row flex-col">
                <Input
                  type="text"
                  placeholder="Search Category"
                  className="sm:w-[303px] w-full pr-10"
                  onChange={(event) => setSearchValue(event.target.value)}
                  value={searchValue}
                />
                {searchValue && (
                  <span
                    onClick={() => setSearchValue("")}
                    className="absolute right-2 mb-0.5 cursor-pointer bg-gray-600 rounded-full p-1 hover:bg-gray-500 transition-all ease-in-out"
                  >
                    <IoClose color="#fff" size="1rem" />
                  </span>
                )}
              </div>

              {/* =================== ADD TO PRODUCT - BUTTON =================== */}
              <div className="flex gap-2 items-center">
                <Link to="create" className="lg:w-auto w-1/2">
                  <Button
                    name="Add Product"
                    icon={<GrAdd size="1rem" />}
                    className="w-full justify-center"
                  />
                </Link>
              </div>
            </div>

            {/* =================== TABLE =================== */}
            <Table
              table={table}
              isLoading={productFetch?.isLoading}
              totalItem={productFetch?.data?.total}
            />
          </Card>
        )}
      </div>

      <ProductView
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        data={productData}
      />
    </>
  );
};

export default ProductList;
