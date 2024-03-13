import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "./InputComponent";
import Button from "./Button";
import axios from "axios";
import { setAuthTokenCookie } from "../util/storeToken";

function LoginForm() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleLogin = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
           `${import.meta.env.VITE_REACT_APP_BASE_URL}/login`,
           {
              username,
              password,
           })
           if (response.data.token) {
              setAuthTokenCookie(response.data.token);
              navigate("/map");
              setLoading(false);
              return;
           } else if (
              response.data.message === "User not found!" ||
              response.data.message === "Incorrect Password!" ||
              response.data.message === "Network Error!"
           ) {
              alert(response.data.message);
              setLoading(false)
              return;
           } 
        
      } catch (error) {
       alert("User not found!") 
       setLoading(false);
       return
      }
      
        setLoading(false);
        return
   };

   return (
      <div className="flex flex-col gap-3 w-full items-center">
         <InputComponent
            state={username}
            setState={setUsername}
            placeholder="Username"
            type="text"
            required={true}
         />
         <InputComponent
            state={password}
            setState={setPassword}
            placeholder="Password"
            type="password"
            required={true}
         />
         <Button
            text={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
         />
      </div>
   );
}

export default LoginForm;
