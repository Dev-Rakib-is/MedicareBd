import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user authenticated
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user || data);
    } catch (error) {
      console.error("Auth fetch error:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login
  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password, role });
      if (data.token) localStorage.setItem("token", data.token); 
      setUser(data.user || data);
      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Register Patient
  const registerPatient = async (patientData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register/patient", patientData);
      if (data.token) localStorage.setItem("token", data.token);
      setUser(data.user || data);
      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Register Doctor
  const registerDoctor = async (doctorData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register/doctor", doctorData);
      if (data.token) localStorage.setItem("token", data.token);
      setUser(data.user || data);
      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerPatient,
        registerDoctor,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
