import { MdMoreVert } from "react-icons/md";
import InputCustom from "../../components/inputs";

const OrderList = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl text-gray-600 font-medium py-6">Order List</h2>

        <div className="bg-white drop-shadow-md rounded-md px-5">
          <div className="py-6">
            <span className="w-48 block">
              <InputCustom type="text" placeholder="Search Order" />
            </span>
          </div>
          <div className="">
            <table class="table-auto w-full">
              <thead>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-500 uppercase text-sm">
                  <th className="text-left py-4 font-medium">Order</th>
                  <th className="text-left py-4 font-medium">Date</th>
                  <th className="text-left py-4 font-medium">Customers</th>
                  <th className="text-left py-4 font-medium">Status</th>
                  <th className="text-left py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4">Jun 20, 2022, 11:11</td>
                  <td className="py-4">Zondra Klimkin</td>
                  <td className="py-4">Delivered</td>
                  <td className="py-4">
                    <span className="flex justify-center cursor-pointer">
                      <MdMoreVert size="1.2rem" />
                    </span>
                  </td>
                </tr>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4">Jun 20, 2022, 11:11</td>
                  <td className="py-4">Zondra Klimkin</td>
                  <td className="py-4">Delivered</td>
                  <td className="py-4">
                    <span className="flex justify-center">
                      <MdMoreVert size="1.2rem" />
                    </span>
                  </td>
                </tr>
                <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 text-sm">
                  <td className="py-4 text-primary">#123</td>
                  <td className="py-4">Jun 20, 2022, 11:11</td>
                  <td className="py-4">Zondra Klimkin</td>
                  <td className="py-4">Delivered</td>
                  <td className="py-4">
                    <span className="flex justify-center">
                      <MdMoreVert size="1.2rem" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-6">
            <p className="text-xs text-gray-500">
              Displaying 1 to 10 of 100 entries
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
