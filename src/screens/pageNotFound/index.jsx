import { Link } from "react-router-dom";
import Button from "../../components/button";
import { Card } from "../../components/card";

const PageNotFound = () => {
  return (
    <div className="mt-6 text-center">
      <Card>
        <div className="py-6">
          <div className="text-3xl text-gray-600 pb-2 font-medium">
            404 - Not Found
          </div>
          <p className="text-gray-500 pb-4">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/">
            <Button name="Return To Home" className="mx-auto" />
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PageNotFound;
