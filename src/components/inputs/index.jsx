const InputCustom = ({ isError, messageError, ...props }) => {
  return (
    <>
      <input
        {...props}
        className={`${
          isError ? `border-red-500` : `border-gray-300 focus:border-primary`
        } border bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 rounded-md text-sm leading-none py-2.5 w-full px-3 placeholder:text-md outline-0 focus:drop-shadow-md transition`}
      />
      {messageError !== "" && (
        <small className="text-red-500 block">{messageError}</small>
      )}
    </>
  );
};

export default InputCustom;
