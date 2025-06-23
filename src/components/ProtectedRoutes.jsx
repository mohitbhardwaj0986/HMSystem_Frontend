import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
  const { user, accessToken } = useSelector((state) => state.user);

  return (
    user && accessToken ? <Outlet /> :
    (<Navigate to="/login" />)
  );
};

export default ProtectedRoutes;
