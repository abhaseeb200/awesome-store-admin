import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import PageHeading from "../../components/pageTitle";
import { CardHeading } from "../../components/card";

const OrderDetails = () => {
  return (
    <>
      <PageHeading title="Order Details" />
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="bg-white drop-shadow-md rounded-md px-5 sm:w-3/5 w-full">
          <CardHeading title="Order details"/>
          <div className="overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                  <th className="text-left py-4 font-medium">Products</th>
                  <th className="text-left py-4 px-3 font-medium">Price</th>
                  <th className="text-left py-4 px-3 font-medium">QTY</th>
                  <th className="text-left py-4 px-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 flex gap-2">
                    <span>
                      <img
                        src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/products/woodenchair.png"
                        width="38"
                        height="38px"
                      />
                    </span>
                    <span className="flex flex-col">
                      <h5>Wooden Chair</h5>
                      <p className="text-gray-400">Material: Wooden</p>
                    </span>
                  </td>
                  <td className="py-4 px-3">$840</td>
                  <td className="py-4 px-3">2</td>
                  <td className="py-4 px-3">$1680</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col py-6 gap-2 text-sm text-gray-600">
            <div className="flex flex-row justify-between">
              <span>Subtotal :</span>
              <span>$78792</span>
            </div>
          </div>
        </div>

        <div className="bg-white drop-shadow-md rounded-md px-5 pb-6 sm:w-2/5 w-full">
          <h4 className="text-lg text-gray-600 font-medium py-6">
            Customer details
          </h4>
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white p-2.5 rounded-full">
              <FiUser size="1.3rem" />
            </span>
            <span>
              <p className="text-md text-gray-600">Shamus Tuttle</p>
              <p className="text-sm text-gray-400">Customer ID: #58909</p>
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 py-5">
            <span className="bg-green-100 text-green-600 p-2.5 rounded-full">
              <FiShoppingCart size="1.3rem" />
            </span>
            <span>
              <p>12 Orders</p>
            </span>
          </div>
          <h4 className="text-md text-gray-600 font-medium">Contact info</h4>
          <p className="text-gray-500 text-sm">Email: Shamus889@yahoo.com</p>
          <p className="text-gray-500 text-sm">Mobile: +1 (609) 972-22-22</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
