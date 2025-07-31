import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  console.log("Layout component rendering...");
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:pl-65 pt-15 lg:pt-0">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;