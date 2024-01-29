import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../components/button";

const Error = () => {
  const error = useRouteError();
  console.log({ error });
  return (
    <div className="dark:bg-dark-100 w-full h-screen flex flex-col justify-center">
      <div className="text-3xl text-center text-gray-600 pb-3 font-medium dark:text-gray-200">
        Oops!
      </div>
      <p className="text-gray-500 text-center dark:text-gray-300 ">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-rose-500 text-center pb-5">"{error?.message}"</p>
      <Link to="/">
        <Button name="Return To Home" className="mx-auto" />
      </Link>
    </div>
  );
};

export default Error;
