import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

interface Props {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    /** If true, redirects authenticated users away from this route */
    redirectIfAuth?: boolean;
    fallback?: ReactNode;
}

export default function RouteGuard({ children, requireAuth, requireAdmin, redirectIfAuth, fallback }: Props) {
    const { user, loading } = useAuthStore();
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (loading) return;
        if ((requireAuth || requireAdmin) && !token) {
            navigate(requireAdmin ? "/admin/login" : "/auth", { replace: true });
            return;
        }
        if (redirectIfAuth && token) {
            navigate("/dashboard", { replace: true });
            return;
        }
        if (requireAdmin && token && user && user.role !== "admin") {
            navigate("/dashboard", { replace: true });
            return;
        }
    }, [loading, user, token, navigate, requireAuth, requireAdmin, redirectIfAuth]);

    if (loading && token) return fallback ?? null;
    if (requireAuth && !token) return null;
    if (requireAdmin && (!token || (user && user.role !== "admin"))) return null;
    if (redirectIfAuth && token) return null;

    return <>{children}</>;
}
