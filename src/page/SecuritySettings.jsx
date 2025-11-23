import { useState } from "react";
import api from "../api/api";


const SecuritySettings = () => {
  const [currentPassword,setCurrentPassword]= useState("");
  const [newPassword,setNewPassword]= useState("");
  const [confarmPassword,setConfarmPassword]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading] =useState(false);


  const displayMessage = (msg)=>{
    setMessage(msg)
    setTimeout(()=>setMessage(""),3000)
  }

const handlePassWord =async ()=>{
  if (!currentPassword && !newPassword &&confarmPassword) {
    displayMessage("All Fields are Required")
  }

  if ( newPassword!==confarmPassword) {
    displayMessage("New password and confirm password do not match!")
    return
  }
  await handlePassword()
}

const handlePassword = async ()=>{
  try{
  setLoading(true)
  const res = await api.post("/auth/update-password",{
    currentPassword,newPassword
  })
  if (res.status === 200) {
    displayMessage("Password updated successfully!")
    setCurrentPassword("");
    setNewPassword("");
    setConfarmPassword("")
  }
}catch(err){
  displayMessage(err.response?.data?.message || "Server error. Try again later.")
}finally{
  setLoading(false)
}
}

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label className="block font-medium mb-2">Current Password</label>
        <input
          value={currentPassword}
          type="password"
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="Enter current password"
          onChange={(e)=>setCurrentPassword(e.target.value)}
        />

        <label className="block font-medium mt-4 mb-2">New Password</label>
        <input
         value={newPassword}
         onChange={(e)=>setNewPassword(e.target.value)}
          type="password"
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="Enter new password"
        />

        <label className="block font-medium mt-4 mb-2">
          Confirm New Password
        </label>
        <input
        value={confarmPassword}
        onChange={(e)=>setConfarmPassword(e.target.value)}
          type="password"
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="Confirm new password"
        />

        <button onClick={handlePassWord} disabled={loading} className={`mt-4  px-4 py-2 rounded border text-white ${loading?"cursor-not-allowed bg-green-300 text-white":"bg-green-600  cursor-pointer"}`}>
          {loading?"Updating . . .":"Update Password"}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SecuritySettings;
