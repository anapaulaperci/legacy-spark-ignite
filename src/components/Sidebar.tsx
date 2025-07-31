import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Home, 
  Calendar, 
  FileText, 
  CheckSquare, 
  User, 
  BookOpen,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Shield
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  const location = useLocation();
  const { signOut, user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();
        
      if (data) {
        setUserRole(data.role);
      }
    };
    
    fetchUserRole();
  }, [user]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      id: "dashboard",
      title: "Home",
      icon: Home,
      path: "/"
    },
    {
      id: "resumos",
      title: "Material de Estudo",
      icon: FileText,
      path: "/resumos"
    },
    {
      id: "anotacoes",
      title: "Anotações",
      icon: FileText,
      path: "/anotacoes"
    },
    {
      id: "checklist",
      title: "Plano de Implementação",
      icon: CheckSquare,
      path: "/checklist"
    },
    {
      id: "ia",
      title: "IA Assistant",
      icon: BookOpen,
      path: "/ia"
    },
    {
      id: "perfil",
      title: "Perfil",
      icon: User,
      hasDropdown: true,
      items: [
        { title: "Meu Perfil", path: "/perfil" },
        ...(userRole === 'admin' ? [{ title: "Administração", path: "/admin" }] : [])
      ]
    },
  ...(userRole === 'admin'
    ? [
        {
          id: "adm",
          title: "Administração",
          icon: BookOpen,
          path: "/admin"
        }
      ]
    : [])
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="lg:hidden lg:ms-65 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[60] bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex justify-between basis-full items-center w-full py-2.5 px-2 sm:px-5">
          {/* Sidebar Toggle */}
          <button 
            type="button" 
            className="w-7 h-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="shrink-0 size-4" />
          </button>

          {/* Project Name */}
          <div className="inline-flex items-center text-start font-semibold text-gray-800 dark:text-white">
            <span className="max-w-16 truncate">Imersão Posicionamento</span>
          </div>
        </div>
      </header>

      {/* ========== MAIN SIDEBAR ========== */}
      <aside 
        className={`
          fixed inset-y-0 start-0 z-[60]
          w-65 h-full
          bg-purple-950
          lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
          transition-all duration-300 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full max-h-full py-5">
          <header className="h-11.5 px-8">
            {/* Logo */}
            <Link 
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" 
              to="/"
            >
              <div className="flex items-center space-x-3">
                <img src="/lovable-uploads/7433a794-51a8-45eb-81be-aeaccb87a06f.png" alt="Ana Paula Perci" className="h-8 w-8" />
                <span className="text-white font-bold text-lg">{userRole}Ana Paula Perci </span>
              </div>
            </Link>
          </header>

          {/* Content */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {/* Nav */}
            <nav className="p-5 pt-5 w-full flex flex-col flex-wrap">
              <ul className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.hasDropdown) {
                    return (
                      <li className="hs-accordion" key={item.id}>
                        <button 
                          type="button" 
                          className="hs-accordion-toggle hs-accordion-active:bg-white/10 w-full text-start flex gap-x-3 py-2 px-3 text-sm text-white/80 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white/10"
                        >
                          <Icon className="shrink-0 mt-0.5 size-4" />
                          {item.title}
                          <ChevronDown className="hs-accordion-active:-rotate-180 shrink-0 mt-1 size-3.5 ms-auto transition" />
                        </button>

                        <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                          <ul className="ps-7 mt-1.5 space-y-1.5 relative before:absolute before:top-0 before:start-[19px] before:w-0.5 before:h-full before:bg-white/10">
                            {item.items?.map((subItem) => (
                              <li key={subItem.path}>
                                <Link
                                  className={`flex gap-x-4 py-2 px-3 text-sm rounded-lg focus:outline-hidden transition-colors ${
                                    isActive(subItem.path)
                                      ? 'bg-white/20 text-white'
                                      : 'text-white/80 hover:bg-white/10'
                                  }`}
                                  to={subItem.path}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.title === "Administração" && <Shield className="h-4 w-4 mr-2" />}
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <Link
                        className={`flex gap-x-3 py-2 px-3 text-sm rounded-lg focus:outline-hidden transition-colors ${
                          isActive(item.path!)
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                        to={item.path!}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="shrink-0 mt-0.5 size-4" />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <footer className="hidden lg:block sticky bottom-0 inset-x-0 border-t border-white/10">
            <div className="px-7">
              <div className="flex">
                <div className="group w-full inline-flex items-center py-3 text-start text-white align-middle">
                  <img src="/lovable-uploads/7433a794-51a8-45eb-81be-aeaccb87a06f.png" alt="Ana Paula Perci" className="size-8 shrink-0" />
                  <span className="block ms-3">
                    <span className="block text-sm font-medium text-white group-hover:text-white/70 group-focus-hover:text-white/70">
                      Ana Paula Perci
                    </span>
                    <span className="block text-xs text-white/70">
                      anapaulaperci.com
                    </span>
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </footer>

          {/* Close Button for Mobile */}
          <div className="lg:hidden absolute top-3 -end-3 z-10">
            <button 
              type="button" 
              className="w-6 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-white/10 bg-purple-950 text-gray-400 hover:text-gray-300 focus:outline-hidden focus:text-gray-300 disabled:opacity-50 disabled:pointer-events-none" 
              onClick={() => setIsOpen(false)}
            >
              <X className="shrink-0 w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;