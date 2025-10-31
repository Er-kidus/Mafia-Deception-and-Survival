import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const accessToken = useSelector((state) => state.user.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
