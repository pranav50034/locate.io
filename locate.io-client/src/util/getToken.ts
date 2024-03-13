import Cookies from "universal-cookie";

export const getAuthTokenFromCookie = () => {
   const cookies = new Cookies();
   return cookies.get("authToken");
};
