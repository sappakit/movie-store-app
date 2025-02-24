import { AiFillInstagram } from "react-icons/ai";
import {
  FaCartShopping,
  FaFacebook,
  FaHeart,
  FaTwitter,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { RiMovie2AiFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex h-16 w-full items-center justify-between bg-[#030712] px-8 text-white">
      {/* Left side */}
      <div className="flex items-center gap-12">
        {/* Website logo */}
        <button
          className="flex items-center gap-2"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
        >
          <RiMovie2AiFill className="h-7 w-7 text-violet-500" />
          <p className="text-xl font-semibold">MovieMart</p>
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-6 text-sm text-white">
          <button className="transition-colors duration-300 hover:text-violet-500">
            Home
          </button>
          <button className="transition-colors duration-300 hover:text-violet-500">
            New Releases
          </button>
          <button className="transition-colors duration-300 hover:text-violet-500">
            Categories
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search box */}
        <div className="flex w-[15rem] items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
          />

          <button>
            <IoSearch className="text-gray-400" />
          </button>
        </div>

        <button>
          <FaHeart className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
        </button>
        <button>
          <FaCartShopping className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800">
          <LuUserRound className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-4 bg-[#030712] text-sm text-gray-400">
      {/* Contract icon */}
      <div className="flex gap-6">
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <FaFacebook />
        </button>
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <AiFillInstagram className="h-[1.1rem] w-[1.1rem]" />
        </button>
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <FaTwitter />
        </button>
      </div>

      <p>© MovieMart, LLC. All rights reserved.</p>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <button>Privacy</button>
        <button>Terms</button>
        <button>Help</button>
        <button>Devices</button>
      </div>
    </div>
  );
}
