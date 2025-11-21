import { TextAlignStart } from "lucide-react";
import Darkmode from "../components/ui/Darkmode";
import { useAuth } from "../contex/AuthContex";
import logo from "/Company logo.png";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";

const Navbar = ({ onHamburgerClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayname =
    user?.profile?.name ||
    user?.name ||
    (user?.role === "DOCTOR"
      ? "Doctor"
      : user?.role === "PATIENT"
      ? "Patient"
      : user?.role === "ADMIN"
      ? "Admin"
      : "Guest");

  return (
    <div className="flex justify-between items-center bg-gray-300 dark:bg-gray-800 px-6 py-3 border-b dark:border-white/40 border-black/40 fixed top-0 left-0 right-0 md:left-64 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        {/* Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden cursor-pointer"
          onClick={onHamburgerClick}
        >
          <TextAlignStart className="w-7 h-7 dark:text-white" />
        </motion.button>

        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Company logo"
          className="w-10 h-10 cursor-pointer"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden md:block text-right">
            <p className="text-black dark:text-white text-sm font-medium">
              Emergency Contact:
            </p>
            <a
              href="tel:+8801796478185"
              className="text-black dark:text-white hover:underline text-sm"
            >
              01796478185
            </a>
          </div>
        )}
        {/* Profile Info */}
        <div className="text-black dark:text-white hidden md:block">
          <p className="text-base font-semibold">{displayname}</p>
          <p className="font-extralight text-sm">{user?.role}</p>
        </div>
        {/* DarkMode  */}
        <Darkmode />
        {/* Profile Avatar */}
        {user?.photo_url && (
          <Link to="/setting">
            <img
              src={user.photo_url}
              alt="profile"
              className="w-10 h-10 rounded-full border border-black/40 dark:border-white/40 object-cover"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
