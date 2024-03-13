import axios from "axios";
import { useEffect, useState } from "react";
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface Coords {
   lat: number;
   long: number;
}
interface User {
   name: string;
   username: string;
   location: Coords;
}

const ProfilePage = () => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(false);
   const [edit, setEdit] = useState(false)

   const [newName, setNewName] = useState("");
   const [newUsername, setNewUsername] = useState("");

   const navigate = useNavigate();

   const handleClick = () => {
     setEdit(true)
   }

   const handleLogOut = async() => {
      try {
         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/logout`, {},{
            withCredentials: true
         });
         alert(response.data.message)
         navigate("/")
      } catch (error) {
         alert(error)
      }
   }

   const handleUpdateProfile = async() => {
    setLoading(true)
    if(!newName && !newUsername){
      alert("Please fill atleast on field!")
      setLoading(false)
        return
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/update-user`, {
        username: user?.username,
        newName: newName,
        newUsername : newUsername
      })
      fetchUserDetails()
      console.log(response.data.user);
      
      setLoading(false)
      alert(response.data.message)
      
    } catch (error) {
      setLoading(false)
      alert(error)
    }
   };

   const fetchUserDetails = async() => {
    setLoading(true);
    const response = await axios
       .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/userdata`, {
          withCredentials: true,
       })

       setUser(response.data);
       setLoading(false);
   };

   useEffect(() => {
      fetchUserDetails();
   }, []);
   return (
      <div className="px-5 py-2 h-[calc(100vh-64px)] relative  flex flex-col md:items-center">
         <div className="flex justify-between items-center self-center mb-2 md:w-[70%]" >
            <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
            <button
               onClick={handleClick}
               className="border px-6 rounded-md py-2 hover:bg-gray-100"
            >
               Edit
            </button>
         </div>
         {loading && (
            <div
               role="status"
               className="grid place-items-center h-36 border rounded-xl md:w-[70%]"
            >
               <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                     fill="currentColor"
                  />
                  <path
                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                     fill="currentFill"
                  />
               </svg>
               <span className="sr-only">Loading...</span>
            </div>
         )}
         {user && (
            <div className="border p-5 rounded-xl h-46 md:w-[70%]">
               <h1 className="text-xl mb-2">
                  Name: <span>{user.name}</span>
               </h1>
               <h1 className="text-xl mb-2">
                  Username: <span>{user.username}</span>
               </h1>
               <h1 className="text-xl mb-2">
                  Location:{" "}
                  <span>
                     {user.location.lat}, {user.location.long}
                  </span>
               </h1>
               <button className="bg-black text-white px-3 py-1 rounded" onClick={handleLogOut}>Log out</button>
            </div>
         )}

         <div
            className={`${
               edit ? "block" : "hidden"
            } border p-5 absolute inset-0 bg-black grid place-items-center`}
         >
            <div className="flex flex-col justify-center items-center gap-3 w-[80%]">
               <div
                  className="cursor-pointer absolute top-3 right-10"
                  onClick={() => {
                     setEdit(false);
                  }}
               >
                  <svg
                     className="h-8 w-8 text-white"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <line x1="18" y1="6" x2="6" y2="18" />
                     <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
               </div>
               <InputComponent
                  state={newName}
                  setState={setNewName}
                  placeholder="Enter New Name"
                  type="text"
                  required={false}
               />
               <InputComponent
                  state={newUsername}
                  setState={setNewUsername}
                  placeholder="Enter New Username"
                  type="text"
                  required={false}
               />
               <Button
                  text={loading ? "Loading..." : "Update Profile"}
                  disabled={loading}
                  onClick={handleUpdateProfile}
               />
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
