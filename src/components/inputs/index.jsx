const InputCustom = ({ isError, messageError, ...props }) => {
    return (
      <>
        <input
          {...props}
          className={`${
            isError ? `border-red-500` : `border-gray-300 focus:border-primary`
          } border bg-white rounded-md text-sm leading-none text-gray-800 py-2.5 w-full pl-3 placeholder:text-md outline-0 focus:drop-shadow-md transition`}
        />
        {messageError !== "" ? (
          <small className="text-red-500 block">{messageError}</small>
        ) : (
          ""
        )}
      </>
    );
  };
  
  export default InputCustom;
  