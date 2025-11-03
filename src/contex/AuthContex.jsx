import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch User

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Patient Register
  const registerPatient = async (patientData) => {
    setLoading(true);
    try {
      await api.post("/auth/register/patient", patientData);
      return await checkAuth();
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  //  Doctor Register
  const registerDoctor = async (doctorData) => {
    setLoading(true);
    try {
      await api.post("/auth/register/doctor", doctorData);
      return await checkAuth();
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login

  const login = async (logdata) => {
    setLoading(true);
    try {
      await api.post("/auth/login", logdata);
      return await checkAuth();
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Logout

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerPatient,
        registerDoctor,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
