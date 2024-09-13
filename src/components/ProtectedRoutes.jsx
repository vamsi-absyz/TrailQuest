import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { allowedRoles } = props;
  const email = Cookies.get("email");
  const company = Cookies.get("company");

  if (company === undefined || email === undefined) {
    return <Navigate to="/" />;
  }

  // if (allowedRoles === "USER") {
  //   return <Outlet />;
  // } else {
  // if (email === "user") {
  //   return <Navigate to="/home" />;
  // } else if (email === "admin") {
  //   return <Navigate to="/admin/dashboard" />;
  // }
  // }
  if (company !== "" && email !== "") {
    return <Outlet />
  } else {
    return <Navigate to="/"/>;
  }
};

export default ProtectedRoute;
