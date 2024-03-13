import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const SignUpPage = () => {
   const [flag, setFlag] = useState(false);

   return (
      <div>
         <div className="px-5 border flex flex-col md:items-center">
            {!flag ? (
               <h1 className="text-2xl font-bold my-3">Signup</h1>
            ) : (
               <h1 className="text-2xl font-bold my-3">Login</h1>
            )}
            {!flag ? <SignupForm /> : <LoginForm />}
            {!flag ? (
               <p
                  className="text-center cursor-pointer"
                  onClick={() => setFlag(!flag)}
               >
                  Already have an account?{" "}
                  <span className="text-red-500 font-medium">Login</span>
               </p>
            ) : (
               <div
                  className="text-center cursor-pointer"
                  onClick={() => setFlag(!flag)}
               >
                  Don't have an account?{" "}
                  <span className="text-red-500 font-medium">Signup</span>
               </div>
            )}
         </div>
      </div>
   );
};

export default SignUpPage;
