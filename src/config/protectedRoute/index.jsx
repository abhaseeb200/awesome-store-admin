import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const ProtectRoute = () => {
  const { data } = useAuth();

  if (!data?.token) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectRoute;
