import { CgSpinner } from "react-icons/cg";

const Button = ({
  name,
  isLoading,
  className,
  icon,
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      disabled={isLoading}
      className={`cursor-pointer text-sm bg-primary hover:bg-primaryDark rounded-md drop-shadow-md text-white text-md px-5 py-2 transition flex items-center gap-x-2 ${className}`}
    >
      {isLoading ? <CgSpinner className="animate-spin size-5" /> : null}
      {icon} {name}
    </button>
  );
};

export default Button;
