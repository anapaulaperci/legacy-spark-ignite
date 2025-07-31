import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  console.log("Layout component rendering...");
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Header */}
      <header className="lg:ml-65 h-[30px] bg-background border-b border-border/40 fixed top-0 left-0 right-0 z-40" />
      
      {/* Main Content */}
      <main className="lg:pl-65 pt-[45px] lg:pt-[30px]">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;