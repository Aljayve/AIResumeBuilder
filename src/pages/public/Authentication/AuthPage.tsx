import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import LoginPage from "../Home/auth/Login/LoginPage";
import RegisterPage from "../Home/auth/Register/RegisterPage";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    if (token) return null;

    return (
        <>
            <PageMeta
                title="Sign In / Sign Up - ResumeAI"
                description="Create an account or sign in to start building ATS-friendly resumes."
            />
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 sm:px-6">
                <div className="w-full max-w-md">

                    {/* Tabs */}
                    <div className="mb-6 flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                        <button
                            onClick={() => setMode("login")}
                            className={`w-1/2 rounded-lg py-2 text-sm font-medium transition ${mode === "login"
                                ? "bg-blue-600 text-white"
                                : "text-slate-500"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setMode("register")}
                            className={`w-1/2 rounded-lg py-2 text-sm font-medium transition ${mode === "register"
                                ? "bg-blue-600 text-white"
                                : "text-slate-500"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Forms */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm 
                dark:border-slate-800 dark:bg-slate-900
                ">
                        {mode === "login" ? (
                            <LoginPage />
                        ) : (
                            <RegisterPage />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
