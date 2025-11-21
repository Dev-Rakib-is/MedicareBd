import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../contex/AuthContex";
import api from "../api/api";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Banner slider
  const banners = [
    {
      title: "Your Health, Our Priority",
      subtitle: "Book appointments with the best doctors — anytime, anywhere.",
      buttonText: "Book Appointment",
      image: "https://i.ibb.co/JWx8M9jD/bannerbg.jpg",
    },
    {
      title: "24/7 Emergency Services",
      subtitle: "Our team is always ready to assist you.",
      buttonText: "Contact Us",
      image: "https://i.ibb.co.com/KzNbvXc2/24-7-medical-call.jpg",
    },
    {
      title: "Expert Doctors",
      subtitle: "Consult with certified specialists online or offline.",
      buttonText: "See Doctors",
      image: "https://i.ibb.co/JWx8M9jD/bannerbg.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // Doctors & Specializations
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
        console.error("Doctor fetch error:", err);
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
        console.error("Specializations fetch error:", err);
      } finally {
        setLoadingSpecs(false);
      }
    };
    fetchSpecializations();
  }, []);

  // Banner slider interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const handleButton = () => {
    navigate(user ? "/doctor-details" : "/login");
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <motion.section
        key={current}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20 dark:bg-gray-800 bg-cover bg-center bg-no-repeat h-[70vh] flex flex-col justify-center items-center mt-20 relative"
        style={{ backgroundImage: `url(${banners[current].image})` }}
      >
        {/* Blur layer */}
        <div className="absolute inset-0 backdrop-blur-[3px] bg-white/10 rounded"></div>
        <div className="z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black/80 font-bold">
            {banners[current].title}
          </h1>
          <p className="text-base lg:text-xl py-4 text-black">
            {banners[current].subtitle}
          </p>
          <motion.button
            onClick={handleButton}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-gray-600 rounded px-4 py-1 md:px-6 md:py-2 font-semibold cursor-pointer"
          >
            {banners[current].buttonText}
          </motion.button>
        </div>
      </motion.section>
      {/* Specializations Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="my-10"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-black dark:text-white pb-10">
          Popular Specializations
        </h2>
        {loadingSpecs ? (
          <p className="text-center text-black dark:text-white">
            Loading Specializations...
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specializations.map((sp) => (
              <div
                key={sp._id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center"
              >
                <p className="text-black dark:text-white text-xs md:text-base md:font-semibold">
                  {sp.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Doctors Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="my-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-black dark:text-white pb-10">
          Our Doctors
        </h2>
        {loadingDoctors ? (
          <p className="text-center text-black dark:text-white">
            Loading Doctors...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="p-4 bg-white rounded shadow dark:bg-gray-900"
              >
                <img src={doc.image} alt="Doctor Photo" />
                <p className="text-lg font-semibold text-black dark:text-white">
                  {doc.name}
                </p>
                <p className="text-black dark:text-white">
                  {doc.specialization}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
