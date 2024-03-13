import  { useState } from "react";

const Navbar = () => {
   Navbar;
   const [isNavOpen, setIsNavOpen] = useState(false);

   return (
      <nav className="flex items-center justify-between px-5 h-16 ">
         <div className="text-3xl font-bold ">
            <a href="/map">locate.io</a>
         </div>
         <section className="MOBILE-MENU flex lg:hidden">
            <div
               className={`HAMBURGER-ICON space-y-2 z-50 md:hidden ${
                  isNavOpen ? "hidden" : "block"
               }`}
               onClick={() => setIsNavOpen((prev) => !prev)}
            >
               <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
               <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
               <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
            </div>
            <div
               className={`CROSS-ICON z-50 md:hidden ${
                  isNavOpen ? "block" : "hidden"
               }`}
               onClick={() => setIsNavOpen(false)}
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

            <div
               className={`${
                  isNavOpen ? "block" : "hidden"
               } flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black text-white md:hidden z-40`}
            >
               <ul
                  className={`MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]`}
               >
                  <li className=" my-8 uppercase">
                     <a href="/map">Map</a>
                  </li>
                  <li className=" my-8 uppercase">
                     <a href="/all-profiles">All Profiles</a>
                  </li>
                  <li className=" my-8 uppercase">
                     <a href="/profile">Profile</a>
                  </li>
               </ul>
            </div>
         </section>

         <ul className="DESKTOP-MENU hidden space-x-8 md:flex items-center md:gap-3 lg:gap-14 xl:gap-32">
            <li className="font-bold uppercase ">
               <a href="/map">Map</a>
            </li>
            <li className="font-bold uppercase ">
               <a href="/all-profiles">All Profiles</a>
            </li>
            <li className="font-bold uppercase ">
               <a href="/profile">Profile</a>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
