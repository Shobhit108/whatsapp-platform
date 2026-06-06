import {
  Bell,
  MoreVertical,
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const Header = () => {
  const [open,
    setOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const menuRef =
    useRef(null);

  useEffect(() => {
    const closeMenu =
      (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(
            e.target
          )
        ) {
          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
  }, []);

  const menuItems = [
    {
      label:
        "Dashboard",
      path: "/",
      icon:
        LayoutDashboard,
    },
    {
      label:
        "Conversations",
      path:
        "/conversations",
      icon:
        MessageSquare,
    },
    {
      label:
        "Contacts",
      path:
        "/contacts",
      icon: Users,
    },
    {
      label:
        "Settings",
      path:
        "/settings",
      icon:
        Settings,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">

      <div className="h-16 px-4 md:px-8 flex items-center justify-between">

        {/* LEFT */}

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-emerald-400">
            WP CRM
          </h1>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          <button className="hover:bg-slate-800 transition p-2 rounded-full">
            <Bell
              size={20}
            />
          </button>

          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold">
            ST
          </div>

          {/* MENU */}

          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() =>
                setOpen(
                  !open
                )
              }
              className="hover:bg-slate-800 transition p-2 rounded-full"
            >
              <MoreVertical
                size={20}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl"
                >
                  {menuItems.map(
                    (
                      item
                    ) => {
                      const Icon =
                        item.icon;

                      return (
                        <button
                          key={
                            item.path
                          }
                          onClick={() => {
                            navigate(
                              item.path
                            );

                            setOpen(
                              false
                            );
                          }}
                          className={`w-full px-5 py-4 flex items-center gap-3 transition hover:bg-slate-800 ${
                            location.pathname ===
                            item.path
                              ? "bg-emerald-500/10 text-emerald-400"
                              : ""
                          }`}
                        >
                          <Icon
                            size={
                              18
                            }
                          />
                          {
                            item.label
                          }
                        </button>
                      );
                    }
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;