import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "jspdf-autotable";
import { LuEye } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import InputCustom from "../../components/inputs";
import SelectCustom from "../../components/select";
import Pagination from "../../components/pagination";
import PageHeading from "../../components/pageTitle";
import { Card } from "../../components/card";
import CardSkeleton from "../../components/card/skeleton";
import { getOrders } from "../../config/services/firebase/order";
import ExportDropDown from "../../components/exportDropdown";
import { getOrderAction } from "../../redux/actions/orderAction";

const OrderList = () => {
  const [currentPaginationNum, setCurrentPaginationNum] = useState(1);
  const [mainLoader, setMainLoader] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderDataBackUP, setOrderDataBackUP] = useState([]);
  const [exportTableData, setExportTableData] = useState([]);
  const [search, setSearch] = useState("");

  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // console.log(orders);
  // const actionDropdownItems = [
  //   { label: "View", icon: <LuEye size="1.1rem" />, action: "view" },
  //   {
  //     label: "Delete",
  //     icon: <MdOutlineDeleteOutline size="1.1rem" />,
  //     action: "delete",
  //   },
  // ];

  const handlePageChange = (pageNumber) => {
    setCurrentPaginationNum(pageNumber);
  };

  const handleDateFormat = (date) => {
    let now = new Date(date);
    let currentDate = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    let time = now.toLocaleString([], { hour12: true }).split(",");
    return currentDate + "," + time[1];
  };

  const handleGetOrders = async () => {
    // setMainLoader(true);
    try {
      let response = await getOrders();
      let temp = [];
      response.forEach((product) => {
        temp.push({ ...product.data(), docID: product.id });
      });
      // console.log(temp, "TEMPPPP");
      // setOrderData(temp);
      // setOrderDataBackUP(temp);
      dispatch(getOrderAction(temp));
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred", {
        autoClose: 1500,
      });
    } finally {
      setMainLoader(false);
    }
  };

  const handleSearch = (e) => {
    let val = e.target.value;
    setSearch(val);
    if (val.trim() !== "") {
      let findOrder = orderData.filter(
        (order) =>
          order.docID.includes(val.trim()) ||
          order.status.toLowerCase().includes(val.trim().toLowerCase()) ||
          order.fullName.toLowerCase().includes(val.trim().toLowerCase())
      );
      setOrderDataBackUP(findOrder);
    } else {
      setOrderDataBackUP(orderData);
    }
  };

  useEffect(() => {
    if (orderList?.length) {
      console.log("-----");
      console.log(orderList, "REDUCERS");
      setOrderDataBackUP(orderList);
      setOrderData(orderList);
      // setMainLoader(false);
      handleGetOrders();
    } else {
      setMainLoader(true);
      handleGetOrders();
    }
  }, []);

  useEffect(() => {
    let newData = orderDataBackUP.map((item) => ({
      order: item?.docID,
      date: handleDateFormat(item?.dateAndTime),
      customer: item?.fullName[0].toUpperCase() + item?.fullName.slice(1),
      status: item?.status[0].toUpperCase() + item?.status.slice(1),
    }));
    setExportTableData(newData);
  }, [orderDataBackUP]);

  useEffect(() => {
    setOrderData(orderList);
    setOrderDataBackUP(orderList);
  }, [orderList]);
  return (
    <>
      <div>
        <PageHeading title="Order List" />
        {mainLoader ? (
          <CardSkeleton />
        ) : orderData?.length > 0 ? (
          <Card>
            {/* head - search & filter */}
            <div className="py-6 flex sm:flex-row flex-col gap-4 justify-between px-5">
              <span className="sm:w-48 w-full block">
                <InputCustom
                  type="text"
                  placeholder="Search Order"
                  onChange={handleSearch}
                  value={search}
                />
              </span>
              <span className="flex items-center gap-2">
                {orderDataBackUP.length > 10 && (
                  <SelectCustom customClass="py-2">
                    <option value="10" select="select">
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </SelectCustom>
                )}
                {orderDataBackUP.length > 0 && (
                  <ExportDropDown
                    exportData={exportTableData}
                    title="Order List Data"
                    filename="order_list_data"
                  />
                )}
              </span>
            </div>
            {/* body - table */}
            <div className="overflow-auto">
              <table className="table-auto w-full" id="orderListTable">
                <thead>
                  <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 dark:text-gray-200 uppercase text-sm">
                    <th className="text-left py-4 font-medium pl-5">Order</th>
                    <th className="text-left py-4 px-3 font-medium">Date</th>
                    <th className="text-left py-4 px-3 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-4 px-3 font-medium">Status</th>
                    <th className="py-4 font-medium pr-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDataBackUP.length > 0 ? (
                    orderDataBackUP.map((order, index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm"
                        >
                          <td className="py-4 text-primary pl-5">
                            {order?.docID}
                          </td>
                          <td className="py-4 px-3">
                            {handleDateFormat(order?.dateAndTime)}
                          </td>
                          <td className="py-4 px-3 capitalize">
                            {order?.fullName}
                          </td>
                          <td className="py-4 px-3 capitalize">
                            {order?.status}
                          </td>
                          <td className="py-4 pr-5">
                            <span className="hover:text-primaryDark">
                              <Link to={`/orders/${order?.docID}`}>
                                <LuEye
                                  size="1.1rem"
                                  className="mx-auto cursor-pointer"
                                />
                              </Link>
                            </span>
                            {/* <span className="flex justify-center">
                          <Dropdown
                            items={actionDropdownItems}
                            title={<MdMoreVert size="1.2rem" />}
                            menuItemsClass="absolute right-0 w-48"
                            handleOnClick={handleDropdownActions}
                            currentDocID = {order?.docID}
                          />
                        </span> */}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm">
                      <td className="py-4 text-center" colSpan="5">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* footer - pagination */}
            <div className="py-6 flex sm:flex-row flex-col gap-3 justify-between items-center">
              {orderDataBackUP?.length > 10 && (
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
              No order is found
            </p>
          </Card>
        )}
      </div>
    </>
  );
};

export default OrderList;
