import { useEffect, useState } from "react";
import api from "../api/api";
// import Darkmode from "../components/ui/Darkmode";  // you said no darkmode

const PreferenceSettings = () => {

  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("Medium");
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [autoLogout, setAutoLogout] = useState("Never");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Preferences
  const fetchPreference = async () => {
    try {
      setLoading(true);

      const res = await api.get("/preferences");
      const pref = res.data?.preferences || {};

      setLanguage(pref.language ?? "English");
      setNotifications(pref.notifications ?? true);
      setFontSize(pref.fontSize ?? "Medium");
      setProfileVisibility(pref.profileVisibility ?? "Public");
      setAutoLogout(pref.autoLogout ?? "Never");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreference();
  }, []);

  // Save preferences
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
await api.patch("/preferences", {
  preferences: {
    language,
    notifications,
    fontSize,
    profileVisibility,
    autoLogout,
  }
});

      setSuccess("Preferences updated successfully!");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  // Auto clear message
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);


  return (
    <div className="p-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Preferences
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">

        {/* Language */}
        <SettingItem label="Language">
          <select 
            className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white outline-none"
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
            <option>Arabic</option>
            <option>Chinese</option>
            <option>Spanish</option>
          </select>
        </SettingItem>

        {/* Notifications */}
        <SettingItem label="Notifications">
          <input 
            type="checkbox" 
            checked={notifications}
            onChange={(e)=>setNotifications(e.target.checked)}
            className="w-5 h-5 accent-green-600" 
          />
        </SettingItem>

        {/* Font Size */}
        <SettingItem label="Font Size">
          <select 
            value={fontSize}
            onChange={(e)=>setFontSize(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white outline-none"
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </SettingItem>

        {/* Profile Visibility */}
        <SettingItem label="Profile Visibility">
          <select 
            value={profileVisibility}
            onChange={(e)=>setProfileVisibility(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white outline-none"
          >
            <option>Public</option>
            <option>Private</option>
            <option>Only Me</option>
          </select>
        </SettingItem>

        {/* Auto Logout*/}
        <SettingItem label="Auto Logout Timer">
          <select 
            value={autoLogout}
            onChange={(e)=>setAutoLogout(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white outline-none"
          >
            <option>5 minutes</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>Never</option>
          </select>
        </SettingItem>

        {/* Save Button */}
        <button 
          onClick={handleSave} 
          disabled={loading} 
          className={`w-full mt-4 transition text-white px-4 py-3 rounded-lg font-medium ${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 cursor-pointer"
          }`}
        >
          {loading? "Saving..." : "Save Preferences"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

      </div>
    </div>
  );
};

// Reusable Setting Item
const SettingItem = ({ label, children }) => (
  <div className="flex items-center justify-between">
    <span className="font-medium dark:text-white">{label}</span>
    {children}
  </div>
);

export default PreferenceSettings;
