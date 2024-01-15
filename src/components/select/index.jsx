import "./style.css";
const SelectCustom = ({
  isError,
  messageError,
  children,
  customClass,
  ...props
}) => {
  return (
    <>
      <select
        className={`${
          isError ? `border-red-500` : `border-gray-300 focus:border-primary`
        } text-sm border border-1 border-gray-400 rounded-md text-gray-600 dark:text-gray-200 dark:bg-dark-200 focus:border-primary outline-0 focus:drop-shadow-md transition ${customClass} `}
        {...props}
      >
        {children}
      </select>
      {messageError !== "" && (
        <small className="text-red-500 block">{messageError}</small>
      )}
    </>
  );
};

export default SelectCustom;
