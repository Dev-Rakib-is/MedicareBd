import { motion } from "framer-motion";
import { useAuth } from "../contex/AuthContex";
import { useNavigate } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButton = () => {
    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <motion.section
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <div className="bg-violet-500 dark:bg-gray-800 text-center py-20 rounded">
          <h1 className="text-5xl text-white font-bold">
            Your Health, Our Priority
          </h1>
          <p className="text-xl py-4 text-white">
            Book appointments with the best doctors — anytime, anywhere.
          </p>

          <button
            onClick={handleButton}
            whileTap={{ scale: 0.95 }}
            className="text-black bg-white rounded px-6 py-2 font-semibold cursor-pointer "
          >
            {user ? "Book Appointment" : "Login"}
          </button>
        </div>
      </motion.section>
              {/* Specialization Section  */}
        <section className="bg-black/10 my-10">
          <h2 className="text-4xl text-center py-20 pb-20 text-black dark:text-white">
            Popular Specializations
          </h2>
        </section>
    </>
  );
};

export default Home;
