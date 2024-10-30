import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // If the user is not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // Render children components if authenticated
  return <Outlet />;
};
