import { Outlet } from "react-router";
import { useState } from "react";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

const RootLayouts = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Desktop Sidebar */}
      <DesktopSidebar className="w-64" />

      <div className="flex flex-col flex-1 overflow-auto">
        <Navbar onHamburgerClick={() => setMenuOpen(!menuOpen)} />
        <main className="px-2 flex-1 dark:bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayouts;
