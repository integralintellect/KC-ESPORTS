import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem(
    "kc_admin_token"
  );

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const currentTime =
      Date.now() / 1000;

    if (
      !payload.exp ||
      payload.exp < currentTime
    ) {
      localStorage.removeItem(
        "kc_admin_token"
      );

      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );
    }
  } catch (error) {
    console.error(
      "Invalid admin token:",
      error
    );

    localStorage.removeItem(
      "kc_admin_token"
    );

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedAdminRoute;