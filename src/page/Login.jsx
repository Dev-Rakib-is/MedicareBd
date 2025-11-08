import { useState } from "react";
import { useAuth } from "../contex/AuthContex";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../api/api";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { setLoading, login } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { email, password, role });
      login(data);
      navigate("/");
    } catch (err) {
      console.log(err);
      const errorMassage = err.response?.data?.message || "Login Failed";
      setError(errorMassage);

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      {/* Form  */}
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 transition-all"
      >
        {/*  Title */}
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login
        </h3>
        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-0 transition-all"
          required
        />
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-0 transition-all"
            required
          />
          {/* Eye Toggle button  */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-3 dark:text-white"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Role Selection */}
        <select
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-0 transition-all"
        >
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-xl border bg-green-600 text-white border-black/40 dark:border-white/40 cursor-pointer dark:text-white font-semibold text-lg shadow-md"
        >
          Login
        </motion.button>
        {error && <p className="text-center text-xl text-red-600">{error}</p>}
        {/* Registration Link */}
        <p className="text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="text-violet-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
