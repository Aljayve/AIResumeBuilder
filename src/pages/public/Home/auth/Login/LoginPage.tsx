import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Input from "../../../../../components/ui/Input";
import PasswordInput from "../../../../../components/ui/PasswordInput";
import Button from "../../../../../components/ui/Button";
import { authApi, type LoginDto } from "../../../../../api/auth.api";

export default function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginDto>();

    const onSubmit = async (data: LoginDto) => {
        try {
            const res = await authApi.login(data);
            localStorage.setItem("accessToken", res.data.accessToken);
            navigate("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <h2 className="text-xl font-bold sm:text-2xl dark:text-white">
                    Welcome Back
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Login to continue building your resume
                </p>
            </div>

            <Input placeholder="Email" type="email" {...register("email", { required: true })} />
            <PasswordInput placeholder="Password" {...register("password", { required: true })} />

            <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-blue-500 hover:underline cursor-pointer">
                Forgot password?
            </p>
        </form>
    );
}
