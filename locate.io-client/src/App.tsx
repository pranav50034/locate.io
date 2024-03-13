import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoute";
import ProfilePage from "./pages/Profile";
import SignupPage from "./pages/Signup";
import AllProfilesPage from "./pages/AllProfiles";
import MapPage from "./pages/Map";
export default function App() {
   return (
      <div className="max-w-[1440px] mx-auto">
         <Navbar />
         <Router>
            <Routes>
               <Route path="/" element={<SignupPage />} />
               <Route element={<PrivateRoutes />}>
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/all-profiles" element={<AllProfilesPage />} />
               </Route>
            </Routes>
         </Router>
      </div>
   );
}
