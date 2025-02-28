const Textarea = ({ isError, messageError, name, ...props }) => {
  return (
    <>
      <label className="text-sm text-gray-500 dark:text-gray-300">
        {props?.label}
      </label>
      <textarea
        {...props}
        className={`${
          isError ? `border-red-500` : `border-gray-300 focus:border-primary`
        } border bg-white rounded-md text-sm leading-none text-gray-800 dark:text-gray-300 dark:bg-dark-200 py-2.5 w-full px-3 placeholder:text-md outline-0 focus:drop-shadow-md transition`}
      >
        {name}
      </textarea>
      {messageError !== "" && (
        <small className="text-red-500 block">{messageError}</small>
      )}
    </>
  );
};

export default Textarea;
