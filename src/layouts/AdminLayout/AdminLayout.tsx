import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSidebarStore } from "../../store/sidebarStore";
import { useAuthStore } from "../../store/authStore";
import AdminTopNavbar from "../../components/admin/navbar/AdminTopNavbar";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

function AdminLayoutContent() {
    const { isExpanded, isHovered, isMobileOpen, toggleMobileSidebar } = useSidebarStore();
    const { user, loading, fetchUser } = useAuthStore();
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!token) {
            navigate("/admin/login", { replace: true });
            return;
        }
        useSidebarStore.getState().initMobile();
        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading && user && user.role !== "admin") {
            navigate("/dashboard", { replace: true });
        }
    }, [loading, user]);

    if (!token || loading || (user && user.role !== "admin")) return null;

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AdminSidebar />
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                        onClick={toggleMobileSidebar}
                    />
                )}
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-72.5" : "lg:ml-22.5"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AdminTopNavbar />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout() {
    return <AdminLayoutContent />
}
