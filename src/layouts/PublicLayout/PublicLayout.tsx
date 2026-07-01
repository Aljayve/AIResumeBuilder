import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import PublicNavbar from "../../components/navbar/PublicNavbar";
import Footer from "../../components/footer/Footer";

export default function PublicLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    if (token) return null;

    return (
        <div className="min-h-screen bg-white text-slate-900
        dark:bg-slate-950 dark:text-white">
            <PublicNavbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
