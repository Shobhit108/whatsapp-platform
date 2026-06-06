// Sidebar.jsx
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  Search,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Conversations",
    path: "/conversations",
    icon: MessageSquare,
  },
  {
    name: "Contacts",
    path: "/contacts",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop sidebar width: 72px when collapsed, 240px when expanded
  const desktopWidth = isDesktopExpanded ? 240 : 72;

  return (
    <>
      {/* HAMBURGER MENU BUTTON - Always visible on mobile, hidden on desktop */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 p-2.5 rounded-xl border border-slate-700 shadow-lg"
      >
        <Menu size={20} className="text-emerald-400" />
      </button>

      {/* MOBILE SIDEBAR - Slides from left */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800 shadow-2xl"
            >
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-emerald-400">
                      WP CRM
                    </h1>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 p-3 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                            : "hover:bg-slate-800/50 text-slate-300 hover:text-white"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-slate-800">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 transition text-slate-300">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR - Fixed width, always visible */}
      <aside
        className="hidden lg:flex lg:flex-col bg-slate-950 border-r border-slate-800 h-screen sticky top-0 transition-all duration-300"
        style={{ width: desktopWidth }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          {isDesktopExpanded && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <h1 className="font-bold text-lg text-emerald-400 whitespace-nowrap">
                WP CRM
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
            className={`bg-slate-800/50 p-1.5 rounded-lg hover:bg-slate-700/50 transition-all duration-200 ${
              !isDesktopExpanded && "mx-auto"
            }`}
          >
            {isDesktopExpanded ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "hover:bg-slate-800/50 text-slate-300 hover:text-white"
                  } ${!isDesktopExpanded && "justify-center"}`
                }
                title={!isDesktopExpanded ? item.name : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {isDesktopExpanded && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="p-2 border-t border-slate-800">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition text-slate-300 ${
              !isDesktopExpanded && "justify-center"
            }`}
            title={!isDesktopExpanded ? "Logout" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {isDesktopExpanded && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;