import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSidebarStore } from "../../store/sidebarStore";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import UserSidebar from "../../components/sidebar/UserSidebar";
import TopNavbar from "../../components/navbar/TopNavbar";

function LayoutContent() {
    const { isExpanded, isHovered, isMobileOpen, toggleMobileSidebar } = useSidebarStore();
    const { user, loading, fetchUser } = useAuthStore();
    const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);
    const startPolling = useNotificationStore((s) => s.startPolling);
    const stopPolling = useNotificationStore((s) => s.stopPolling);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!token) {
            navigate("/auth", { replace: true });
            return;
        }
        useSidebarStore.getState().initMobile();
        fetchUser();
        fetchNotifications().then(() => startPolling());
        return () => stopPolling();
    }, []);

    useEffect(() => {
        if (!loading && user && user.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [loading, user]);

    if (!token || loading || (user && user.role === "admin")) return null;

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <UserSidebar />
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                        onClick={toggleMobileSidebar}
                    />
                )}
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? 'lg:ml-72.5' : 'lg:ml-22.5'
                    } ${isMobileOpen ? 'ml-0' : ''}`}
            >
                <TopNavbar />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default function UserLayout() {
    return <LayoutContent />
}
