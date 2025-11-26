import { useState, useEffect } from "react";
import api from "../api/api";
import { frameData } from "framer-motion";

const AccountSettings = () => {
  const [name, setName] = useState("");
   const [bio, setBio] = useState("");
   const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userPhoto,setUserPhoto]=useState()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch user info
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me");
      const user = res.data.user;
      setName(user.name || "");
      setUsername(user.username || "");
      setBio(user.bio ||"");
      setGender(user.gender || "");
      setDob(user.dob || "")
      setLocation(user.location || "")
      setInterests(user.interests)
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setUserPhoto(user.photo_url || "")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Auto hide messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Handle profile update
  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      frameData.append("bio",bio);
      formData.append("gender",gender);
      formData.append("dob",dob);
      formData.append("location",location);
      formData.append("interests",interests)
      formData.append("email", email);
      formData.append("phone", phone);
      if (photo) formData.append("photo", photo);

      const res = await api.patch("/auth/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-xl">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Account Settings
      </h2>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-5">

        {/* Profile Picture */}
        <div className="flex items-center gap-5">
          <img
            src={photo ? URL.createObjectURL(photo) : userPhoto || "/default-avatar.png"}
            alt="profile avatar"
            className="w-20 h-20 rounded-full object-cover border border-gray-400 dark:border-white/40"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="Full name"
          />
        </div>
        {/* Username */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="Username"
          />
        </div>
                {/* Bio */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="Write something about yourself"
          ></textarea>
        </div>

         {/* Gender */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
         {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
          />
        </div>
         {/* Location */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="City, Country"
          />
        </div>
                {/* Interests */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Interests / Specialization</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="e.g., Cardiology, Fitness, Yoga"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="Email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium mb-1 dark:text-white">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white outline-none"
            placeholder="Phone"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-500 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* Messages */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900 p-6 rounded-2xl border border-red-400 mt-6">
        <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-200">
          Danger Zone
        </h3>
        <p className="text-sm mb-3 text-red-600 dark:text-red-300">
          Once you delete your account, it cannot be recovered.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
