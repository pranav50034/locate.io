import React from 'react'
interface UserCardProps {
   location: { lat: number; long: number };
   name: string;
   username: string;
   onClick: () => void
}
const UserCard = ({ name, username, location, onClick }: UserCardProps) => {
   return <div onClick={onClick} className='border p-2 rounded-md cursor-pointer hover:bg-gray-200'>
      <p className=''>Name: <span className='font-bold text-[20px]'>{name}</span></p>
      <p>Username: <span className='font-bold text-[20px]'>{username}</span></p>
      <p>Location: <span className='font-bold text-[20px]'>{location.lat}, {location.long}</span></p>
   </div>;
};

export default UserCard