import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "../components/InfoWindow";
import Search from "../components/Search";
interface Coords {
   lat: number;
   long: number;
}

interface User {
   name: string;
   username: string;
   location: Coords;
}

const AllProfilesPage = () => {
   const [profiles, setProfiles] = useState<User[]>([]);
   const [profileArr, setProfileArr] = useState<User[]>([]);
   const [center, setCenter] = useState<Coords>();

   useEffect(() => {
      axios
         .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/get-all-users`, {
            withCredentials: true,
         })
         .then((response: { data: User[] }): void => {
            const data = response.data;
            setProfiles(data);
            setProfileArr(data)
            setCenter({
               lat: data[0].location.lat,
               long: data[0].location.long,
            });
         })
         .catch((error) => {
            alert(error.message);
         });
   }, []);

   return (
      <div className="flex w-full gap-x-2 h-[calc(100vh-64px)] px-5 ">
         <div className="w-[30%] hidden md:block border border-black p-2">
            <h1 className="text-2xl font-bold uppercase mb-3">All Profiles</h1>
            <Search profiles={profiles} setProfiles={setProfileArr} />
            <div className="flex flex-col gap-3">
               {profileArr.map((profile) => (
                  <UserCard
                     key={profile.username}
                     name={profile.name}
                     username={profile.username}
                     location={profile.location}
                     onClick={() => {
                        setCenter((prevCenter) => ({
                           ...prevCenter,
                           lat: profile.location.lat,
                           long: profile.location.long,
                        }));
                     }}
                  />
               ))}
            </div>
         </div>
         <div className="w-full md:w-[70%]">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
               {center && (
                  <Map
                     center={{ lat: center?.lat, lng: center?.long }}
                     defaultZoom={10}
                     mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                  >
                     {profiles.map((profile, index) => (
                        <div key={index}>
                           <AdvancedMarker
                              position={{
                                 lat: profile.location.lat,
                                 lng: profile.location.long,
                              }}
                           />
                           <MarkerWithInfowindow
                              position={{
                                 lat: profile.location.lat,
                                 lng: profile.location.long,
                              }}
                              name={profile.name}
                              username={profile.username}
                              allProfiles={true}
                           />
                        </div>
                     ))}
                  </Map>
               )}
            </APIProvider>
         </div>
      </div>
   );
};

export default AllProfilesPage;
