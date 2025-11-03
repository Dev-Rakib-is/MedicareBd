import { motion } from "motion/react";
import { useAuth } from "../contex/AuthContex";
import { Link } from "react-router";

const Sidebar = () => {
  const { logout, user } = useAuth();
  return (
    <aside className="hidden md:flex flex-col bg-gray-200 dark:bg-gray-900 w-64 h-screen">
      {/* Logo  */}
      <div to="/" className="text-center border-b border-black/40 dark:border-white/40 mb-4 p-2">
        <Link to="/" className="text-2xl font-bold text-green-600">Doctor</Link>
        <h5 className="font-light text-green-600">appointment</h5>
      </div>
      {!user && (  
        <nav className="space-y-3 rounded flex-1 p-2">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-300 rounded dark:text-white dark:hover:text-black">
            Home
          </Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-300 rounded dark:text-white dark:hover:text-black">
            Login
          </Link>
          <Link
            to="/registration"
            className="block px-4 py-2 hover:bg-gray-300 rounded dark:text-white dark:hover:text-black"
          >
            Registration
          </Link>
        </nav>
      )}
      {/* Emergency Number  */}   
      {!user && (
        <div className=" flex flex-col items-center justify-center mb-4">
          <p className="text-black dark:text-white text-center">
            Emergency Nnmber :
          </p>
          <a href="tel:+8801796478185" className="hover:underline dark:text-white">
            01796478185
          </a>
        </div>
      )}

      {/* Logout button  */}
      {user && (
        <motion.button
          onClick={logout}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 font-bold text-white p-2 rounded"
        >
          Logout
        </motion.button>
      )}
    </aside>
  );
};

export default Sidebar;
