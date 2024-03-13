import Cookies from "universal-cookie";

export const setAuthTokenCookie = (token: string) => {
   const cookies = new Cookies();
   cookies.set("authToken", token, { path: "/" });
};
