import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);
  // While checking auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }
  // If user already logged in → redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }
  // If no user → allow access
  return <Outlet />;
};

export default PublicRoute;
