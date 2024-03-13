import { Navigate, Outlet } from "react-router-dom"
import { getAuthTokenFromCookie } from "../util/getToken";
const PrivateRoutes = () => {

    const token = getAuthTokenFromCookie()

   if (token) {
      return <Outlet />;
   } else {
      return <Navigate to="/" replace />;
   } 
};

export default PrivateRoutes;
