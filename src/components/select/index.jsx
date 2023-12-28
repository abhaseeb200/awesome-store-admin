import "./style.css";
const SelectCustom = ({ children, customClass, ...props }) => {
  return (
    <select
      className={`text-sm border border-1 border-gray-400 rounded-md text-gray-600 focus:border-primary outline-0 focus:drop-shadow-md transition ${customClass}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default SelectCustom;
