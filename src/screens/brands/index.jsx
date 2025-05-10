import { useMemo, useState } from "react";
import { LuEye } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card } from "@/components/card";
import Input from "@/components/inputs";
import PageHeading from "@/components/pageTitle";
import Button from "@/components/button";
import Table from "@/components/table";
import AddBrandModal from "@/components/modal/addBrandModal";
import useBrand from "@/hook/useBrand";

const BrandScreen = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateBrand, setUpdateBrand] = useState({});

  const {
    brandsFetch,
    deleteMutation,
    sorting,
    searchValue,
    pagination,
    setSorting,
    setSearchValue,
    setPagination,
  } = useBrand();

  const handleUpdate = (data) => {
    setIsOpenModal(true);
    setIsUpdate(true);
    setUpdateBrand(data);
  };

  const handleAddBrand = () => {
    setIsOpenModal(true);
    setIsUpdate(false);
    setUpdateBrand({});
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      },
      {
        accessorKey: "description",
        cell: (info) => info.getValue(),
        sortDescFirst: false,
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
              className="hover:text-primaryDark"
              onClick={() => console.log(info.row.original)}
            >
              <LuEye size="1.3rem" />
            </button>

            {/* =========== UPDATE - USE-CASE:  =========== */}
            <button
              onClick={() => handleUpdate(info?.row?.original)}
              className="hover:text-primaryDark"
            >
              <TbEdit size="1.3rem" />
            </button>

            {/* =========== DELETE - USE-CASE: DELETE BRAND WITH THEIR ID =========== */}
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
    data: brandsFetch?.data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    pageCount:
      Math.ceil(brandsFetch?.data?.total / brandsFetch?.data?.limit) ||
      -1,
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div>
      <div>
        <PageHeading title="Brands" />
        <Card>
          {/* HEAD - SEARCH BAR */}
          <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between px-5">
            <div className="relative flex gap-2 sm:items-center items-start sm:flex-row flex-col">
              <Input
                type="text"
                placeholder="Search Brand"
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

            <div className="flex items-center gap-2">
              <Button
                type="button"
                name="Add Brand"
                onClick={handleAddBrand}
              />
            </div>
          </div>

          <Table
            table={table}
            isLoading={brandsFetch?.isLoading}
            totalItem={brandsFetch?.data?.total}
          />
        </Card>
      </div>

      {isOpenModal && (
        <AddBrandModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
          updateBrand={updateBrand}
          isUpdate={isUpdate}
        />
      )}
    </div>
  );
};

export default BrandScreen;
