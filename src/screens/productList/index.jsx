import { useState } from "react";
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

const ProductList = () => {
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);

  const exportDropdownItems = [
    { label: "Print", icon: <IoPrintOutline size="1.1rem" /> },
    { label: "Cvs", icon: <PiNewspaperLight size="1.1rem" /> },
    { label: "Pdf", icon: <HiOutlineNewspaper size="1.1rem" /> },
  ];

  const actionDropdownItems = [
    { label: "View", icon: <LuEye size="1.1rem" /> },
    { label: "Edit", icon: <TbEdit size="1.1rem" /> },
    { label: "Delete", icon: <MdOutlineDeleteOutline size="1.1rem" /> },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPaginationNum(pageNumber);
  };

  return (
    <>
      <div>
        <PageHeading title="Product List" />
        <Card>
          {/* head - filter */}
          <div className="filter py-6">
            <h4 className="text-lg text-gray-600 font-medium pb-2">Filter</h4>
            <div className="flex sm:flex-row flex-col gap-4">
              <span className="sm:w-1/2 w-full">
                <SelectCustom customClass="w-full py-2">
                  <option value="0" select="select">
                    Category
                  </option>
                  <option value="20">Office</option>
                  <option value="30">Household</option>
                </SelectCustom>
              </span>
            </div>
          </div>
          <hr className="bg-gray-400 h-0.5" />
          {/* head - search */}
          <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between">
            <span className="sm:w-48 w-full block">
              <InputCustom type="text" placeholder="Search Order" />
            </span>
            <span className="flex flex-wrap gap-2 items-center">
              <SelectCustom customClass="py-2">
                <option value="10" select="select">
                  10
                </option>
                <option value="20">20</option>
                <option value="30">30</option>
              </SelectCustom>
              <Dropdown
                title="Export"
                items={exportDropdownItems}
                icon={<GoDownload size="1rem" className="mr-2" />}
                titleClass="relative bg-gray-300 flex items-center py-2 px-6 rounded-md text-gray-600 text-sm"
                menuItemsClass="absolute left-0"
              />
              <Button name="Add Product" icon={<GrAdd size="1rem" />} />
            </span>
          </div>
          {/* body - table */}
          <div className="overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                  <th className="text-left py-4 font-medium">Product</th>
                  <th className="text-left py-4 px-3 font-medium">Category</th>
                  <th className="text-left py-4 px-3 font-medium">Price</th>
                  <th className="text-left py-4 px-3 font-medium">QTY</th>
                  <th className="text-left py-4 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 flex gap-2">
                    <span>
                      <img
                        src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/ecommerce-images/product-9.png"
                        width="38"
                      />
                    </span>
                    <span className="flex flex-col">
                      <h5>Wooden Chair</h5>
                      <p className="text-gray-400">
                        Air Jordan is a line of basketball shoes produced
                      </p>
                    </span>
                  </td>
                  <td className="py-4 px-3">Shoes</td>
                  <td className="py-4 px-3">$999</td>
                  <td className="py-4 px-3">56</td>
                  <td className="py-4">
                    <span className="flex justify-center cursor-pointer">
                      <Dropdown
                        items={actionDropdownItems}
                        title={<MdMoreVert size="1.2rem" />}
                        menuItemsClass="absolute right-0 w-48"
                      />
                    </span>
                  </td>
                </tr>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 flex gap-2">
                    <span>
                      <img
                        src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/ecommerce-images/product-9.png"
                        width="38"
                      />
                    </span>
                    <span className="flex flex-col">
                      <h5>Wooden Chair</h5>
                      <p className="text-gray-400">
                        Air Jordan is a line of basketball shoes produced
                      </p>
                    </span>
                  </td>
                  <td className="py-4 px-3">Shoes</td>
                  <td className="py-4 px-3">$999</td>
                  <td className="py-4 px-3">56</td>
                  <td className="py-4">
                    <span className="flex justify-center cursor-pointer">
                      <Dropdown
                        items={actionDropdownItems}
                        title={<MdMoreVert size="1.2rem" />}
                        menuItemsClass="absolute right-0 w-48"
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* footer - pagination */}
          <div className="py-6 flex sm:flex-row flex-col gap-3 justify-between items-center">
            <p className="text-xs text-gray-500">
              Displaying 1 to 10 of 100 entries
            </p>
            <Pagination
              totalPages="3"
              currentPage={currentPaginationNum}
              onPageChange={handlePageChange}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductList;
