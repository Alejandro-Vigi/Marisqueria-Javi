import { Navigate } from "react-router-dom";

function isAuthenticated() {
  return localStorage.getItem("mj_admin_logged") === "1";
}

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
