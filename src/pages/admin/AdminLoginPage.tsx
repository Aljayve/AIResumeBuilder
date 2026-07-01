import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import { authApi, type LoginDto } from "../../api/auth.api";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import PageMeta from "../../components/common/PageMeta";

export default function AdminLoginPage() {
    const { user, loading, fetchUser } = useAuthStore();
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [authLoading, setAuthLoading] = useState(false);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginDto>();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading && token && user?.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [loading, user]);

    const onSubmit = async (data: LoginDto) => {
        setAuthLoading(true);
        try {
            const res = await authApi.login(data);
            localStorage.setItem("accessToken", res.data.accessToken);
            await fetchUser();
            const { user: profile } = useAuthStore.getState();
            if (profile?.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                localStorage.removeItem("accessToken");
                useAuthStore.getState().clearUser();
                toast.error("Access denied. Admin credentials required.");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setAuthLoading(false);
        }
    };

    if (loading) return null;

    return (
        <>
            <PageMeta
                title="Admin Login - ResumeAI"
                description="Admin portal login for ResumeAI."
            />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
                            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                        <p className="mt-1 text-sm text-slate-400">Sign in to manage the platform</p>
                    </div>

                    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 backdrop-blur-sm sm:p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="admin@example.com"
                                className="[&_input]:bg-slate-700/50 [&_input]:border-slate-600 [&_input]:text-white [&_input]:placeholder:text-slate-500"
                                {...register("email", { required: true })}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Enter your password"
                                className="[&_input]:bg-slate-700/50 [&_input]:border-slate-600 [&_input]:text-white [&_input]:placeholder:text-slate-500"
                                {...register("password", { required: true })}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-white hover:from-blue-700 hover:to-blue-800"
                                disabled={isSubmitting || authLoading}
                            >
                                {isSubmitting || authLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
}
