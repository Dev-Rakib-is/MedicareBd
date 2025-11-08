import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contex/AuthContex";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

export const Registration = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { loading } = useAuth();
  const [tab, setTab] = useState("PATIENT");

  // Form State
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [specialist, setSpecialist] = useState();
  const [phtoUrl, setPhotoUrl] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const hlndleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // name
    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Missing Name!",
        text: "Type Your Full Name ",
      });
      return;
    }
    // Mail
    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Email is either empty or invalid",
      });
      return;
    }
    // Password
    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Password",
        text: "Please enter Your Password",
      });
      return;
    }
    // Age
    if (!age || age < 0 || age > 120) {
      Swal.fire({
        icon: "warning",
        title: "Missing Password",
        text: "Please Type your Right Age",
      });
      return;
    }
    // Gender
    if (!gender) {
      Swal.fire({
        icon: "warning",
        title: "Missin Gender",
        text: "Select Your Gender",
      });
      return;
    }
    // Spelization
    if (tab === "DOCTOR" && !specialist) {
      Swal.fire({
        icon: "warning",
        title: "Missing Specialization!",
        text: "Please enter your medical specialization.",
      });
      return;
    }
    return;
  };
  return (
    <section className="h-screen flex justify-center items-center bg-gray-200 dark:bg-black p-4">
      <div className="p-8 items-center rounded bg-white dark:bg-gray-900 w-full max-w-md shadow-md">
        <h2 className="text-center text-2xl dark:text-white">Create Account</h2>
        <div className="flex gap-2 my-4 justify-center">
          <button
            onClick={() => setTab("PATIENT")}
            className={` cursor-pointer px-4 py-2 rounded ${
              tab === "PATIENT"
                ? "text-white bg-blue-600"
                : "text-black/90 bg-gray-200"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setTab("DOCTOR")}
            className={` cursor-pointer px-4 py-2 rounded ${
              tab === "DOCTOR"
                ? "text-white bg-blue-600"
                : "text-black/90 bg-gray-200"
            }`}
          >
            Doctor
          </button>
        </div>

        {/* Form  */}
        <form onSubmit={hlndleRegister} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-box dark:placeholder-white/70"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-box dark:placeholder-white/70"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-box dark:placeholder-white/70"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 dark:text-white"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="input-box dark:placeholder-white/70"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
            className="input-box dark:placeholder-white/70"
          >
            <option value="" disabled>
              select an option
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          {tab === "DOCTOR" && (
            <select
              className="input-box dark:placeholder-white/70"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            >
              <option disabled value="">
                Select a option
              </option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Radiologist">Radiologist</option>
              <option value="Surgeon">Surgeon</option>
              <option value="General Physician">General Physician</option>
            </select>
          )}
          <input
            type="text"
            value={phtoUrl}
            placeholder="Photo (optional)"
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input-box dark:placeholder-white/70"
          />

          <motion.button
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="text-lg font-semibold bg-green-600 text-white/90 border px-3 py-2 rounded cursor-pointer shadow-md"
          >
            {loading ? "Registering..." : "Submit"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};
