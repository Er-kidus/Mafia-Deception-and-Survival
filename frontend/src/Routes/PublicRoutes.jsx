import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoutes({ children }) {
  const accessToken = useSelector((state) => state.user.accessToken);

  // Redirect logged-in users away from public pages
  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoutes;
