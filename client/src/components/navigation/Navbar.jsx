import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import useMediaQuery from "../constants/MediaQuery";


const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/services",
    display: "Services",
  },{
    path: "/faq",
    display: "FAQ'S",
  },


];

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 780px)");
  return (
    <header className=" bg-navbar text-white flex items-center py-4">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div>
         <h1 className="text__para">Crash course</h1>
        </div>

        {/* Navigation Links */}
        {isDesktop && (
             <nav className="navigation flex items-center justify-center gap-[2.7rem]">
             {navLinks.map((link, index) => (
               <NavLink
                 key={index}
                 to={link.path}
                 className={(navClass) =>
                   navClass.isActive
                     ? "text-primaryColor text-[16px] leading-7 font-[600]"
                     : "text-textColor text-[16px] leading-7 font-[600]"
                 }
               >
                 {link.display}
               </NavLink>
             ))}
           </nav>
        )}

        {/* Mobile Menu Icon */}
        {!isDesktop && (
          <button
            className="rounded-full p-2 ms:mr-7"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <BiMenu size={34} color="black" />
          </button>
        )}
        {!isDesktop && isMenuToggled && (
          <div className="fixed right-0 bottom-0 h-full font-opensans bg-navbar w-full z-30">
            {/* CLOSE ICON */}
            <div className="flex justify-end p-9 ms:mr-7">
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <HiX size={34} />
              </button>
            </div>

            {/* MENU ITEMS */}
            <motion.div
              whileInView={{ x: [240, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className="flex flex-col justify-center gap-10 ml-[33%] text-2xl "
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                {navLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[600]"
                    }
                  >
                    {link.display}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
