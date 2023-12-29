import { ImCoinDollar } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { Card, CardHeading } from "../../components/card";

const Dashboard = () => {
  return (
    <>
      <span className="p-3"></span>
      <div className="flex gap-3">
        <div className="sm:w-3/5 w-full">
          <Card>
            <CardHeading title="Statistics" />
            <div className="flex pt-4 pb-10">
              <div className="w-1/3 flex gap-1.5">
                <span className="bg-gray-300 px-3 rounded-full flex items-center">
                  <ImCoinDollar size="1.3rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600">230K</h5>
                  <p className="text-gray-400">Sales</p>
                </span>
              </div>
              <div className="w-1/3 flex gap-1.5">
                <span className="bg-gray-300 px-3 rounded-full flex items-center">
                  <TbUsers size="1.3rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600">8.549k</h5>
                  <p className="text-gray-400">Customers</p>
                </span>
              </div>
              <div className="w-1/3 flex gap-1.5">
                <span className="bg-gray-300 px-3 rounded-full flex items-center">
                  <BsCart3 size="1.3rem" />
                </span>
                <span className="">
                  <h5 className="text-gray-600">1.423k</h5>
                  <p className="text-gray-400">Products</p>
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className="sm:w-2/5 w-full">
          <Card>
            <CardHeading title="Popular Products" />
            <div className="flex justify-between items-center pb-5">
              <span className="flex items-center">
                <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/products/iphone.png" width="52"/>
                <span>
                  <h5 className="text-gray-600 ">Apple Iphone 13</h5>
                  <p className="text-gray-400 text-sm">Item: #FXZ-4567</p>
                </span>
              </span>
              <span className="text-gray-600">$72.40</span>
            </div>
            <div className="flex justify-between items-center pb-6">
              <span className="flex items-center">
                <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/products/iphone.png" width="52"/>
                <span>
                  <h5 className="text-gray-600 ">Apple Iphone 13</h5>
                  <p className="text-gray-400 text-sm">Item: #FXZ-4567</p>
                </span>
              </span>
              <span className="text-gray-600">$999.9</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
