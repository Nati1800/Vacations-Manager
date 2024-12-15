import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/Context/authContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string; 
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not available");
  }

  const { currentUser } = authContext;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/vacations" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;