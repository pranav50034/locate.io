import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";
import { MarkerWithInfowindow } from "../components/InfoWindow";

interface Coords {
   lat: number;
   long: number;
}

interface User {
   name: string;
   username: string;
   location: Coords;
}

const MapPage: React.FC = () => {
   const [me, setMe] =  useState<User | null>(null);
   const [myCoords, setMyCoords] = useState<Coords | null>(null);

   useEffect(() => {
      axios
         .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/userdata`, {
            withCredentials: true,
         })
         .then((response): void => {
            setMyCoords(response.data.location);
            setMe(response.data)
            
         })
         .catch((err) => {
            console.error("Error fetching location:", err);
         });
   }, []);

   return (
      <div className="w-full h-[calc(100vh-64px)]">
         <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            {myCoords && (
               <Map
                  defaultCenter={{ lat: myCoords.lat, lng: myCoords.long }}
                  defaultZoom={10} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
               >
                  <AdvancedMarker
                     position={{
                        lat: myCoords?.lat,
                        lng: myCoords?.long,
                     }}
                  />
                  {
                     me &&
                  <MarkerWithInfowindow position={{ lat: myCoords?.lat, lng: myCoords?.long }} name={me?.name} username={me?.username} />
                  }
               </Map>
            )}
         </APIProvider>
      </div>
   );
};

export default MapPage;
