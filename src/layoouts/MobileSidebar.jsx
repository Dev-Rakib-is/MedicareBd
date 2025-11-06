import { motion } from "motion/react";
import { useAuth } from "../contex/AuthContex";
import { Link, NavLink } from "react-router";
import { X } from "lucide-react";

const MobileSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 90 }}
      className="md:hidden fixed top-0 left-0 bg-gray-200 dark:bg-gray-900 w-64 h-full z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between p-4 border-b border-black/40 dark:border-white/40">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
            onClick={onClose}
          >
            Doctor
          </Link>
          <p className="text-xs font-light dark:text-white">Appointment</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-xl"
        >
          <X className="dark:text-white"/>
        </motion.button>
      </div>

      {/* Navigation */}
      {!user && (
        <nav className="space-y-3 p-2">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/registration"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white"
            }
          >
            Registration
          </NavLink>
        </nav>
      )}

      {/* User Logout */}
      {user && (
        <motion.button
          onClick={() => {
            logout();
            onClose();
          }}
          className="bg-red-600 font-bold text-white p-2 rounded m-2"
        >
          Logout
        </motion.button>
      )}
    </motion.aside>
  );
};

export default MobileSidebar;
