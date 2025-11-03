import Darkmode from "../components/ui/Darkmode";
import { useAuth } from "../contex/AuthContex";
import logo from "/Company logo.png"

const Navbar = () => {
  const { user } = useAuth();

  const displayname =
    user?.profile?.name || user?.name || user?.role === "DOCTOR"
      ? "Doctor"
      : user?.role === "PATIENT"
      ? "Patient"
      : user?.role === "ADMIN"
      ? "Admin"
      : "Guest";

  return (
    <div className="flex justify-between items-center bg-gray-300 border-b dark:bg-gray-800 px-6 py-3 dark:border-white/40 border-black/40">
      {/* Left Side  */}
      <div className="">
        <img src={logo} alt="Company logo" className="w-10 h-10"/>
      </div>
      {/* Right side */}
      <div>
        {user && (
          <div>
            <p className="text-black dark:text-white hidden md:block">Emergency Contact :</p>
            <a
              href="tel:+8801796478185"
              className="text-black dark:text-white hover:underline"
            >
              01796478185
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Darkmode />
          <div className="text-black dark:text-white">
            <p className="text-base font-semibold">{displayname}</p>
            <p className="font-extralight">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
