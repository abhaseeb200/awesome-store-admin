import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = false;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectRoute;
