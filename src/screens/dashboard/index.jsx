import { useEffect, useState } from "react";
import { ImCoinDollar } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { Card, CardHeading } from "../../components/card";
import { getProducts } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  let [customerSize, setCustomerSize] = useState(0);
  let [productSize, setProductSize] = useState(0);

  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData('user');

  const fetchCustomerSize = async () => {
    // try {
    //   let response = await getAllUsers();
    //   setCustomerSize(response.size);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const fetchProductSize = async () => {
    try {
      let option = { limit: 1, skip: 0 };
      let response = await getProducts(option);
      setProductSize(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerSize();
    fetchProductSize();
  }, []);

  return (
    <>
      <span className="p-3"></span>
      <div className="flex gap-3 flex-col lg:flex-row">
        <div className="lg:w-3/5 w-full">
          <Card>
            <CardHeading title="Statistics" />
            <div className="flex flex-col sm:flex-row pt-4 pb-10 px-5">
              <div className="sm:w-1/3 w-full flex sm:gap-1.5 gap-3 items-center">
                <span className="bg-gray-300 dark:bg-dark-600 dark:text-gray-300 rounded-full flex items-center justify-center w-10 h-10">
                  <ImCoinDollar size="1.2rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600 dark:text-gray-300">23</h5>
                  <p className="text-gray-400">Sales</p>
                </span>
              </div>
              <div className="sm:w-1/3 w-full flex sm:gap-1.5 gap-3 items-center sm:py-0 py-3">
                <span className="bg-gray-300 dark:bg-dark-600 dark:text-gray-300 rounded-full flex items-center justify-center w-10 h-10">
                  <TbUsers size="1.2rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600 dark:text-gray-300">
                    {customerSize}
                  </h5>
                  <p className="text-gray-400">Customers</p>
                </span>
              </div>
              <div className="sm:w-1/3 w-full flex sm:gap-1.5 gap-3 items-center">
                <span className="bg-gray-300 dark:bg-dark-600 dark:text-gray-300 rounded-full flex items-center justify-center w-10 h-10">
                  <BsCart3 size="1.2rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600 dark:text-gray-300">
                    {productSize}
                  </h5>
                  <p className="text-gray-400">Products</p>
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:w-2/5 w-full">
          <Card>
            <CardHeading title="Popular Products" />
            <div className="flex flex-wrap justify-between items-center pb-5 px-5">
              <div className="flex items-center">
                <span>
                  <img
                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/products/iphone.png"
                    width="52"
                  />
                </span>
                <span>
                  <h5 className="text-gray-600 dark:text-gray-300 ">
                    Apple Iphone 13
                  </h5>
                  <p className="text-gray-400 text-sm">Item: #FXZ-4567</p>
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">$72.40</span>
            </div>
            <div className="flex flex-wrap justify-between items-center pb-6 px-5">
              <span className="flex items-center">
                <img
                  src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/products/iphone.png"
                  width="52"
                />
                <span>
                  <h5 className="text-gray-600 dark:text-gray-300 ">
                    Apple Iphone 13
                  </h5>
                  <p className="text-gray-400 text-sm">Item: #FXZ-4567</p>
                </span>
              </span>
              <span className="text-gray-600 dark:text-gray-300">$999.9</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
