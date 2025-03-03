import { FiUpload } from "react-icons/fi";

const UploadField = ({ isError, messageError,...props }) => {
  return (
    <>
      <label className="capitalize text-sm leading-none text-gray-600 dark:text-gray-300">
        {props?.label}
      </label>

      <div
        className={`${
          props?.className
        } w-full flex flex-col items-center rounded-md border-2 border-dashed tracking-wide cursor-pointer py-14 ${
          isError ? "border-red-400" : "border-gray-400"
        }`}
        onClick={() => props?.onClick()}
      >
        <span className="bg-gray-200 py-3 px-3 rounded-md mb-5">
          {props?.value ? (
            <img
              src={props?.value}
              alt="Uploaded preview"
              className="w-40 h-40 object-cover"
            />
          ) : (
            <FiUpload size="1.5rem" />
          )}
        </span>

        {props?.title && (
          <span className="mt-2 text-base leading-normal bg-primaryLight text-primaryDark py-1.5 px-4 rounded-md">
            {props?.title}
          </span>
        )}
      </div>

      {isError ? (
        <small className="text-red-500 block">Please upload media</small>
      ) : (
        ""
      )}
    </>
  );
};

export default UploadField;
