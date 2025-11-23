import { Outlet } from "react-router";

const SettingsLayout = () => {
  const menu = [
    { label: "Profile", to: "/setting/profile" },
    { label: "Account", to: "/setting/account" },
    { label: "Preferences", to: "/setting/preferences" },
    { label: "Notifications", to: "/setting/notifications" },
    { label: "Security", to: "/setting/security" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-4 overflow-auto mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
