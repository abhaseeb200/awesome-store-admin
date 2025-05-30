const Input = ({ isError, messageError, ...props }) => {
  return (
    <div className="w-full">
      <label className="capitalize text-sm leading-none text-gray-600 dark:text-gray-300">
        {props?.label}
      </label>
      <input
        {...props}
        className={`${
          isError ? `border-red-500` : `border-gray-300 focus:border-primary`
        } ${props?.className} border bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 rounded-md text-sm leading-none py-2.5 w-full px-3 placeholder:text-md outline-0 focus:drop-shadow-md transition`}
      />
      {isError > 0 && (
        <small className="text-red-500 block">{messageError}</small>
      )}
    </div>
  );
};

export default Input;
