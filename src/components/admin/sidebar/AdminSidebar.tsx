import { Link, useLocation } from "react-router";
import { useSidebarStore } from "../../../store/sidebarStore";
import {
  LayoutDashboard,
  Users,
  FileText,
  LayoutTemplate,
  BarChart3,
  Settings,
} from "lucide-react";
import { useCallback } from "react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={24} />, name: "Dashboard", path: "/admin/dashboard" },
  { icon: <Users size={24} />, name: "Users Management", path: "/admin/users" },
  { icon: <FileText size={24} />, name: "Resume Management", path: "/admin/resumes" },
  { icon: <LayoutTemplate size={24} />, name: "Templates", path: "/admin/templates" },
  { icon: <BarChart3 size={24} />, name: "Analytics", path: "/admin/analytics" },
  { icon: <Settings size={24} />, name: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } = useSidebarStore();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path || location.pathname.startsWith(path + "/"),
    [location.pathname]
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
      >
        <Link to="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </span>
          ) : (
            <span className="text-xl font-bold text-brand-500">AP</span>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Admin"
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <circle cx="19" cy="12" r="2" fill="currentColor" />
                  </svg>
                )}
              </h2>
              <ul className="flex flex-col gap-4">
                {navItems.map((nav) => (
                  <li key={nav.name}>
                    <Link
                      to={nav.path!}
                      className={`menu-item group ${isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
                        }`}
                      onClick={() => {
                        if (isMobileOpen) toggleMobileSidebar();
                      }}
                    >
                      <span
                        className={`menu-item-icon-size ${isActive(nav.path!)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                          }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
