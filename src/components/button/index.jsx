const Button = ({ name, className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-primary hover:bg-primaryDark rounded-md drop-shadow-md text-white text-md px-5 py-2 transition flex items-center gap-x-2 ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
