import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const RootLayouts = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default RootLayouts;
