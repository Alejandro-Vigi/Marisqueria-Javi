import { Navigate } from "react-router-dom";

const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutos

function isAuthenticated() {
  const logged = localStorage.getItem("mj_admin_logged") === "1";
  if (!logged) return false;

  const expiresAtRaw = localStorage.getItem("mj_admin_expiresAt");
  const expiresAt = expiresAtRaw ? parseInt(expiresAtRaw, 10) : 0;

  // Si no hay fecha o ya expiró → limpiar y pedir login de nuevo
  if (!expiresAt || Date.now() > expiresAt) {
    localStorage.removeItem("mj_admin_logged");
    localStorage.removeItem("mj_admin_expiresAt");
    return false;
  }

  // Si sigue siendo válida, renovamos la sesión otros 30 minutos
  const newExpiresAt = Date.now() + SESSION_DURATION_MS;
  localStorage.setItem("mj_admin_expiresAt", String(newExpiresAt));

  return true;
}

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
