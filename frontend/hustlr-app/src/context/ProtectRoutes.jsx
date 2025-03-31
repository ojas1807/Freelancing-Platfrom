import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (user === null) {
    return null; // Prevents flashing the login page
  }

  if (!user) {
    return <Navigate to="/login_page" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
