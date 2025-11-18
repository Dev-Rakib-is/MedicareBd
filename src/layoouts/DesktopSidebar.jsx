import { motion } from "motion/react";
import { useAuth } from "../contex/AuthContex";
import { Link, NavLink } from "react-router";

const DesktopSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col bg-gray-200 dark:bg-gray-900 w-64 h-screen overflow-y-auto border-r border-black/40 dark:border-white/40">
      {/* Header */}
      <div className="text-center mb-4 p-4 border-b border-black/40 dark:border-white/40">
        <Link to="/" className="text-2xl font-bold text-green-600">
          Doctor
        </Link>
        <h5 className="font-light text-green-600">appointment</h5>
      </div>
      {/* Navigation */}
      {!user && (
        <nav className="space-y-3 flex-1 p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white dark:hover:text-black"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white dark:hover:text-black"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/registration"
            className={({ isActive }) =>
              isActive
                ? "bg-green-600 text-white rounded px-4 py-2 block"
                : "px-4 py-2 block hover:bg-gray-300 dark:text-white dark:hover:text-black"
            }
          >
            Registration
          </NavLink>
        </nav>
      )}

      {/* Emergency */}
      {!user && (
        <div className="flex flex-col items-center mb-4">
          <p className="dark:text-white">Emergency Number :</p>
          <a
            href="tel:+8801796478185"
            className="hover:underline dark:text-white"
          >
            01796478185
          </a>
        </div>
      )}

      {/* User Logout */}
      {user && (
        <motion.button
          onClick={() => logout()}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 font-semibold  text-white p-2 rounded m-2 cursor-pointer"
        >
          Logout
        </motion.button>
      )}
    </aside>
  );
};

export default DesktopSidebar;
