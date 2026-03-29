import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(state => state.auth.status);

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  return children;
}

export default ProtectedRoute;