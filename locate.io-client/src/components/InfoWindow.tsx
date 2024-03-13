import { useEffect, useState } from "react";
import {
   AdvancedMarker,
   InfoWindow,
   useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

interface InfoWindowProps {
   position: { lat: number; lng: number };
   name: string;
   username: string;
   allProfiles?: boolean;
}

export const MarkerWithInfowindow = ({
   position,
   name,
   username,
   allProfiles,
}: InfoWindowProps) => {
   const [infowindowOpen, setInfowindowOpen] = useState(allProfiles || false);
   const [markerRef, marker] = useAdvancedMarkerRef();

   useEffect(() => {
      setInfowindowOpen(allProfiles || false);
   }, [allProfiles]);

   return (
      <>
         <AdvancedMarker
            ref={markerRef}
            onClick={() => setInfowindowOpen(true)}
            position={position}
            title={"AdvancedMarker that opens an Infowindow when clicked."}
         />
         {infowindowOpen && (
            <InfoWindow
               anchor={marker}
               maxWidth={200}
               onCloseClick={() => setInfowindowOpen(false)}
            >
               <div className="align-left ">
                  <h1 className="text-[1rem] mb-1 font-bold">
                     Name: <span className="text-red-500">{name}</span>
                  </h1>
                  <h1 className="text-[1rem] mb-1 font-bold">
                     Username: <span className="text-red-500">{username}</span>
                  </h1>
                  <h1 className="text-[1rem] font-bold">
                     Location:{" "}
                     <span className="text-red-500">
                        {position.lat}, {position.lng}
                     </span>
                  </h1>
               </div>
            </InfoWindow>
         )}
      </>
   );
};
