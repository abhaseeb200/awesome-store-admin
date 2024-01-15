import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { Card, CardHeading } from "../../components/card";
import PageHeading from "../../components/pageTitle";
import SelectCustom from "../../components/select";
import Button from "../../components/button";
import {
  getOrderDetails,
  setOrderDetails,
} from "../../config/services/firebase/order";
import { getUserData } from "../../config/services/firebase/user";
import CardSkeleton from "../../components/card/skeleton";

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("");
  const [statusBackUP, setStatusBackUP] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [updateStatusLoader, setUpdateStatusLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);

  const { paramsDocID } = useParams();
  // console.log(paramsDocID);

  const handleFetchOrder = async () => {
    try {
      let response = await getOrderDetails(paramsDocID);
      console.log(response.data(), "------");
      setProducts(response.data()?.products);
      setStatus(response.data()?.status);
      setStatusBackUP(response.data()?.status);
      setCurrentDate(response.data()?.dateAndTime);
      handleUserData(response.data()?.userId);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred", {
        autoClose: 1500,
      });
      setMainLoader(false);
    }
  };

  const handleUserData = async (userID) => {
    try {
      let response = await getUserData(userID);
      response.forEach((doc) => {
        console.log(doc.data());
        setUserData(doc.data());
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred", {
        autoClose: 1500,
      });
    } finally {
      setMainLoader(false);
    }
  };

  const handleSubTotal = () => {
    let subTotal = 0;
    products.map(
      (product) => (subTotal += product?.currentPrice * product?.quantity)
    );
    return subTotal;
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
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

  const handleUpdateStatus = async () => {
    // console.log(status);
    try {
      setUpdateStatusLoader(true);
      let response = await setOrderDetails(paramsDocID, status);
      console.log(response);
      setStatusBackUP(status);
      toast.success("Update successful!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred", {
        autoClose: 1500,
      });
    } finally {
      setUpdateStatusLoader(false);
    }
  };

  useEffect(() => {
    handleFetchOrder();
  }, []);
  return (
    <>
      <PageHeading title="Order Details" />
      <div className="pb-6">
        <span className="flex items-center">
          <h3 className="text-lg text-gray-600 font-medium mr-2 pb-1 dark:text-gray-300">
            Order #{paramsDocID}
          </h3>
          <span className="bg-primaryLight text-primaryDark font-medium py-0.5 px-5 rounded text-md capitalize">
            {statusBackUP}
          </span>
        </span>
        <p className="text-gray-400 text-md">{handleDateFormat(currentDate)}</p>
      </div>
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="sm:w-3/5 w-full">
          {mainLoader ? (
            <CardSkeleton />
          ) : (
            <Card>
              <CardHeading title="Order details" />
              <div className="overflow-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 dark:text-gray-200 uppercase text-sm">
                      <th className="text-left py-4 font-medium pl-5">Products</th>
                      <th className="text-left py-4 px-3 font-medium">Price</th>
                      <th className="text-left py-4 px-3 font-medium">QTY</th>
                      <th className="text-left py-4 px-3 font-medium pr-5">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm"
                        >
                          <td className="py-4 flex gap-2 pl-5">
                            <span>
                              <img
                                src={product.thumbnail}
                                width="50"
                                className="object-cover h-full"
                              />
                            </span>
                            <span className="flex flex-col">
                              <h5 className="capitalize">{product?.title}</h5>
                              <span className="text-gray-400 capitalize text-xs">
                                <p>size: {product?.currentSize}</p>
                                <p>color: {product?.currentColor}</p>
                              </span>
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            ${product?.currentPrice}
                          </td>
                          <td className="py-4 px-3">{product?.quantity}</td>
                          <td className="py-4 px-3 pr-5">
                            ${product?.currentPrice * product?.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col py-6 gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex flex-row justify-between px-5">
                  <span>Subtotal :</span>
                  <span>${handleSubTotal().toFixed(2)}</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="sm:w-2/5 w-full">
          {mainLoader ? (
            <CardSkeleton />
          ) : (
            <Card>
              <CardHeading title=" Customer details" />
              <div className="flex items-center gap-2 px-5">
                <span className="bg-primary text-white p-2.5 rounded-full">
                  <FiUser size="1.3rem" />
                </span>
                <span>
                  <p className="text-md text-gray-600 dark:text-gray-300 capitalize">
                    {userData?.fullName}
                  </p>
                  {/* <p className="text-sm text-gray-400">Customer ID: {userData?.userID}</p> */}
                </span>
              </div>
              <div className="flex items-center gap-2 px-5 text-gray-500 dark:text-gray-300 py-5">
                <span className="bg-green-100 text-green-600 p-2.5 rounded-full">
                  <FiShoppingCart size="1.3rem" />
                </span>
                <span>
                  <p>{products.length} Products</p>
                </span>
              </div>
              <div className="pb-6 px-5">
                <h4 className="text-md text-gray-600 dark:text-gray-300 font-medium">
                  Contact info
                </h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Email: {userData?.email}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Mobile: +1 (609) 972-22-22
                </p>
              </div>
            </Card>
          )}

          {mainLoader ? (
            <CardSkeleton />
          ) : (
            <Card>
              <CardHeading title="Order Status" />
              <div className="pb-6 px-5">
                <SelectCustom
                  customClass="py-1.5 w-full"
                  value={status}
                  onChange={handleStatus}
                >
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Delivered">Delivered</option>
                </SelectCustom>
                {updateStatusLoader ? (
                  <Button
                    name={<LuLoader2 size="1.25rem" className="animate-spin" />}
                    className="w-full mt-2 justify-center my-disabled"
                  />
                ) : (
                  <Button
                    name="Update Status"
                    className="w-full mt-2 justify-center"
                    onClick={() => handleUpdateStatus()}
                  />
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
