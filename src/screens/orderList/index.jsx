import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import { PiNewspaperLight } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GoDownload } from "react-icons/go";
import InputCustom from "../../components/inputs";
import Dropdown from "../../components/dropdown";
import SelectCustom from "../../components/select";
import Pagination from "../../components/pagination";
import PageHeading from "../../components/pageTitle";

const OrderList = () => {
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);

  const exportDropdownItems = [
    { label: "Print", icon: <IoPrintOutline size="1.1rem" /> },
    { label: "Cvs", icon: <PiNewspaperLight size="1.1rem" /> },
    { label: "Pdf", icon: <HiOutlineNewspaper size="1.1rem" /> },
  ];

  const actionDropdownItems = [{ label: "View" }, { label: "Delete" }];

  const handlePageChange = (pageNumber) => {
    setCurrentPaginationNum(pageNumber);
  };

  return (
    <>
      <div>
        <PageHeading title="Order List" />
        <div className="bg-white drop-shadow-md rounded-md px-5">
          <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between">
            <span className="sm:w-48 w-full block">
              <InputCustom type="text" placeholder="Search Order" />
            </span>
            <span className="flex items-center gap-2">
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
                icon={<GoDownload size="1rem"className="mr-2" />}
                titleClass="text-sm relative bg-gray-300 flex items-center py-2 px-6 rounded-md text-gray-600"
                menuItemsClass="absolute left-0"
              />
            </span>
          </div>
          <div className="overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                  <th className="text-left py-4 font-medium">Order</th>
                  <th className="text-left py-4 px-3 font-medium">Date</th>
                  <th className="text-left py-4 px-3 font-medium">Customers</th>
                  <th className="text-left py-4 px-3 font-medium">Status</th>
                  <th className="py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4 px-3">Jun 20, 2022, 11:11</td>
                  <td className="py-4 px-3">Zondra Klimkin</td>
                  <td className="py-4 px-3">Delivered</td>
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
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4 px-3">Jun 20, 2022, 11:11</td>
                  <td className="py-4 px-3">Zondra Klimkin</td>
                  <td className="py-4 px-3">Delivered</td>
                  <td className="py-4">
                    <span className="flex justify-center">
                      <Dropdown
                        items={actionDropdownItems}
                        title={<MdMoreVert size="1.2rem" />}
                        menuItemsClass="absolute right-0 w-48"
                      />
                    </span>
                  </td>
                </tr>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4 px-3">Jun 20, 2022, 11:11</td>
                  <td className="py-4 px-3">Zondra Klimkin</td>
                  <td className="py-4 px-3">Delivered</td>
                  <td className="py-4">
                    <span className="flex justify-center">
                      <MdMoreVert size="1.2rem" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default OrderList;
