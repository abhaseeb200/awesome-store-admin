import { Link } from "react-router-dom";
import Button from "@/components//button";
import { Card } from "@/components/card";

const NotFound = ({ title, url }) => {
  return (
    <div className="mt-6 text-center">
      <Card className="py-6">
        <div className="text-3xl text-gray-600 pb-2 font-medium dark:text-gray-300">
          404 - {title} Not Found
        </div>
        <p className="text-gray-500 dark:text-gray-300 pb-4">
          Sorry, the {title} you are looking for does not exist.
        </p>
        <Link to={url}>
          <Button name="Add New" className="mx-auto" />
        </Link>
      </Card>
    </div>
  );
};

export default NotFound
