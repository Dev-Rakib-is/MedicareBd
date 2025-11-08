import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../contex/AuthContex";
import api from "../api/api";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSpecs, setLoadingSpecs] = useState(true);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/doctors");
        setDoctors(data.doctors || data);
      } catch (err) {
        console.log("Doctor fetch error:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await api.get("/specializations");
        setSpecializations(data.specializations || data);
      } catch (err) {
        console.log("Specializations fetch error:", err);
      } finally {
        setLoadingSpecs(false);
      }
    };
    fetchSpecializations();
  }, []);

  // Button click
  const handleButton = () => {
    navigate(user ? "/book-appointment" : "/login");
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20 bg-violet-500 dark:bg-gray-800 rounded"
      >
        <h1 className="text-5xl text-white font-bold">Your Health, Our Priority</h1>
        <p className="text-xl py-4 text-white">
          Book appointments with the best doctors — anytime, anywhere.
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleButton}
          className="text-black bg-white rounded px-6 py-2 font-semibold cursor-pointer"
        >
          {user ? "Book Appointment" : "Login"}
        </motion.button>
      </motion.section>

      {/* Specializations */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="my-10"
      >
        <h2 className="text-4xl text-center text-black dark:text-white pb-10">
          Popular Specializations
        </h2>
        {loadingSpecs ? (
          <p className="text-center text-black dark:text-white">Loading Specializations...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specializations.map((sp) => (
              <div
                key={sp._id}
                className="p-4 bg-white dark:bg-black/40 rounded shadow text-center"
              >
                <p className="text-black dark:text-white font-semibold">{sp.name}</p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Doctors */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="my-10"
      >
        <h2 className="text-4xl text-center text-black dark:text-white pb-10">Our Doctors</h2>
        {loadingDoctors ? (
          <p className="text-center text-black dark:text-white">Loading Doctors...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="p-4 bg-white dark:bg-black/40 rounded shadow"
              >
                <p className="text-lg font-semibold text-black dark:text-white">{doc.name}</p>
                <p className="text-black dark:text-white">{doc.specialization}</p>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
