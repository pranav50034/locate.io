import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import axios from "axios";
import { setAuthTokenCookie } from "../util/storeToken";
import { useNavigate } from "react-router-dom";

function SignupForm() {
   const [fullName, setFullName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [location, setLocation] = useState<{lat: number, long: number} | null>(null);

   const navigate = useNavigate()

   const handleSignup = async() => {
       setLoading(true);
    if(!location){
        alert("Please Allow Location Access!");
        setLoading(false)
        return
    }
    if(password!==confirmPassword) {
        alert("Passwords do not match!")
        setLoading(false);
        return;
    }
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/register`, {
        username,
        name: fullName,
        password,
        location
    })
    
    alert(response.data.message)
    setLoading(false)
    setAuthTokenCookie(response.data.token);
    navigate("/map")
   }

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat:latitude, long:longitude });
         });
      }
   }, [])

   return (
      <div className="flex flex-col gap-3 w-full items-center">
         <InputComponent
            state={fullName}
            setState={setFullName}
            placeholder="Full Name"
            type="text"
            required={true}
         />
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
         <InputComponent
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder="Confirm Password"
            type="password"
            required={true}
         />
         <Button
            text={loading ? "Loading..." : "Signup"}
            disabled={loading}
            onClick={handleSignup}
         />
      </div>
   );
}

export default SignupForm;
