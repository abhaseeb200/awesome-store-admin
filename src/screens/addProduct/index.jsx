import { FiUpload } from "react-icons/fi";
import Button from "../../components/button";
import InputCustom from "../../components/inputs";
import SelectCustom from "../../components/select";
import TextareaCustom from "../../components/textarea";
import PageHeading from "../../components/pageTitle";
import { Card, CardHeading } from "../../components/card";

const AddProduct = () => {
  return (
    <>
      <div className="">
        <PageHeading title="Add Product" />
        <div className="flex flex-wrap gap-2 justify-between items-end">
          <div className="">
            <h2 className="text-2xl text-gray-600 font-medium">
              Add a new Product
            </h2>
            <span className="text-gray-500 text-sm">
              Orders placed across your store
            </span>
          </div>
          <div>
            <Button name="Publish Product" />
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row py-6">
          <div className="sm:w-3/5 w-full">
            {/* product information */}
            <Card>
              <CardHeading title="Product information" />
              <div className="pb-4">
                <label className="text-sm text-gray-500">Name</label>
                <InputCustom placeholder="Product title" type="text" />
              </div>
              <div className="pb-4">
                <label className="text-sm text-gray-500">Quantity</label>
                <InputCustom placeholder="Product Qunatity" type="number" />
              </div>
              <div className="pb-6">
                <label className="text-sm text-gray-500">
                  Description (Optional)
                </label>
                <TextareaCustom placeholder="Product description" rows="10" />
              </div>
            </Card>
            {/* Media */}
            <Card>
              <CardHeading title="Media" />
              <div className="pb-6">
                <label className="w-full flex flex-col items-center rounded-md border border-2 border-dashed border-gray-400 tracking-wide border border-blue cursor-pointer py-14">
                  <span className="bg-gray-200 py-3 px-3 rounded-md mb-5">
                    <FiUpload size="1.5rem" />
                  </span>
                  <span className="mt-2 text-base leading-normal bg-primaryLight text-primaryDark py-1.5 px-4 rounded-md">
                    Browse image
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </Card>
            {/* Variants */}
            <Card>
              <CardHeading title="Variants" />
              <div className="pb-4">
                <div className="flex sm:flex-row flex-col items-end gap-3">
                  <span className="sm:w-1/3 w-full">
                    <label className="text-sm text-gray-500 block">
                      Options
                    </label>
                    <SelectCustom customClass="py-2 w-full">
                      <option value="0">Select Option</option>
                      <option value="0">Size</option>
                      <option value="0">Color</option>
                    </SelectCustom>
                  </span>
                  <span className="sm:w-2/3 w-full">
                    <InputCustom placeholder="Enter Size" type="text" />
                  </span>
                </div>
              </div>
              <div className="pb-6">
                <Button name="Add another option" />
              </div>
            </Card>
          </div>

          <div className="sm:w-2/5 w-full">
            {/* Pricing */}
            <Card>
              <CardHeading title="Pricing" />
              <div className="pb-4">
                <label className="text-sm text-gray-500">Base Price</label>
                <InputCustom placeholder="Price" type="number" />
              </div>
              <div className="pb-6">
                <label className="text-sm text-gray-500">
                  Discounted Price (Optional)
                </label>
                <InputCustom placeholder="Discounted Price" type="number" />
              </div>
            </Card>
            {/* Organize */}
            <Card>
              <CardHeading title="Organize" />
              <div className="pb-6">
                <label className="text-sm text-gray-500 block mb-1">
                  Category
                </label>
                <SelectCustom customClass="py-2 w-full">
                  <option value="0">Select Category</option>
                  <option value="0">Office</option>
                  <option value="0">Shoes</option>
                </SelectCustom>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
