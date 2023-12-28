import { Card, CardHeading } from "../../components/card";

const Dashboard = () => {
  return (
    <>
      <span className="p-3"></span>
      <Card>
        <CardHeading title="Statistics" />
        <div className="flex">
          <div className="w-1/3 flex">
            <span>
              
            </span>
            <span>
              <h5 className="text-gray-600">230K</h5>
              <p className="text-gray-400">sales</p>
            </span>
          </div>
          <div className="w-1/3"></div>
          <div className="w-1/3"></div>
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
