import { useEffect, useState } from "react";
import { ImCoinDollar } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { Card, CardHeading } from "../../components/card";
import { getProducts } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { GrLineChart } from "react-icons/gr";
import IncomeChart from "@/components/IncomeChart";

const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="lg:w-1/4 w-full">
      <Card className="p-6">
        <CardHeading title={title} />
        <div className="justify-between text-gray-600 dark:text-gray-300 flex flex-col sm:flex-row">
          <span className="opacity-70">last 07 days</span>
          {icon}
        </div>
        <div className="pt-4 text-gray-600 dark:text-gray-300 text-[29px] font-bold">
          {value}
        </div>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  let [customerSize, setCustomerSize] = useState(0);
  let [productSize, setProductSize] = useState(0);

  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData("user");

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

  // Example popular products array
  const popularProducts = [
    {
      id: 1,
      image: "https://cdn.dummyjson.com/product-images/placeholder.jpg",
      name: "Iphone 16 pro max",
      brand: "Apple",
      price: 30,
    },
    {
      id: 1,
      image: "https://cdn.dummyjson.com/product-images/placeholder.jpg",
      name: "Iphone 16 pro max",
      brand: "Apple",
      price: 30,
    },
    {
      id: 1,
      image: "https://cdn.dummyjson.com/product-images/placeholder.jpg",
      name: "Iphone 16 pro max",
      brand: "Apple",
      price: 30,
    },
    {
      id: 1,
      image: "https://cdn.dummyjson.com/product-images/placeholder.jpg",
      name: "Iphone 16 pro max",
      brand: "Apple",
      price: 30,
    },
    {
      id: 1,
      image: "https://cdn.dummyjson.com/product-images/placeholder.jpg",
      name: "Iphone 16 pro max",
      brand: "Apple",
      price: 30,
    },
  ];

  return (
    <>
      <span className="p-3"></span>
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* === TOTAL REVENUE === */}
        <InfoCard
          icon={<ImCoinDollar size={"1.6rem"} className="-mt-4" />}
          title="Total Revenue"
          value="$1,763"
        />

        {/* === TOTAL ORDERS === */}
        <InfoCard
          icon={<BsCart3 size={"1.6rem"} className="-mt-4" />}
          title="Total Orders"
          value="300"
        />

        {/* === TOTAL PRODUCT === */}
        <InfoCard
          icon={<GrLineChart size={"1.6rem"} className="-mt-4" />}
          title="Total Products"
          value={productSize}
        />

        {/* === PENDING DELIVERY === */}
        <InfoCard
          icon={<TbUsers size={"1.6rem"} className="-mt-4" />}
          title="Pending Delivery"
          value="763"
        />
      </div>
      {/* ================== SECOND ROW ================== */}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* === TOTAL INCOME === */}
        <div className="lg:w-[64%] w-full">
          <Card className="p-6">
            <CardHeading title="Total Income" />
            <p className="text-gray-600 dark:text-gray-300 opacity-60 mb-4">
              Yearly report overview
            </p>
            <IncomeChart />
          </Card>
        </div>

        {/* === POPULAR PRODUCTS === */}
        <div className="lg:w-[36%] w-full">
          <Card className="p-6">
            <CardHeading title="Popular Products" />
            <p className="text-gray-600 dark:text-gray-300 opacity-60">
              Last 07 days
            </p>
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-[#424659] p-3 rounded-md mt-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="size-12 object-cover rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-600 dark:text-gray-300">
                      {product.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.brand}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-lg text-gray-600 dark:text-gray-300">
                  ${product.price}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
