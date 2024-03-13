import React, { useState, useCallback } from 'react';

interface Coords {
   lat: number;
   long: number;
}
interface User {
   name: string;
   username: string;
   location: Coords;
}
interface SearchProps {
    profiles: User[];
    setProfiles: (value: User[]) => void;
}
const SearchComponent = ({ profiles, setProfiles }: SearchProps) => {
   const [nameToSearch, setNameToSearch] = useState("");

   const handleSearch = useCallback(async () => {
      const filteredProfiles = profiles.filter((profile) =>
         profile.name.toLowerCase().includes(nameToSearch.toLowerCase())
      );
      setProfiles(filteredProfiles);
   }, [nameToSearch]);
   return (
      <div>
         <input
            type="search"
            value={nameToSearch}
            placeholder="Search by name"
            onChange={(e) => setNameToSearch(e.target.value)}
            className="w-full border rounded p-2 mb-2 focus:outline-none"
         />
         <button
            onClick={handleSearch}
            className="bg-black text-white font-bold py-2 px-4 rounded mb-3"
         >
            Search
         </button>
      </div>
   );
};

export default React.memo(SearchComponent);