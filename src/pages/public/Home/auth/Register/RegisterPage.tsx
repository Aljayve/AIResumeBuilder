import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Input from "../../../../../components/ui/Input";
import PasswordInput from "../../../../../components/ui/PasswordInput";
import Button from "../../../../../components/ui/Button";
import { authApi, type RegisterDto } from "../../../../../api/auth.api";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<RegisterDto>();

    const onSubmit = async (data: RegisterDto) => {
        try {
            const res = await authApi.register(data);
            localStorage.setItem("accessToken", res.data.accessToken);
            navigate("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="my-4">
                <h2 className="text-xl font-bold sm:text-2xl dark:text-white">Create Account</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Start Building ATS-friendly resumes</p>
            </div>

            <Input placeholder="First Name" {...register("firstName", { required: true })} />
            <Input placeholder="Last Name" {...register("lastName", { required: true })} />
            <Input placeholder="email@example.com" type="email" {...register("email", { required: true })} />
            <PasswordInput placeholder="Password" {...register("password", { required: true })} />
            <PasswordInput placeholder="Confirm Password" {...register("confirmPassword", { required: true })} />

            <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-blue-500 cursor-pointer hover:underline">
                Already have an account?
            </p>
        </form>
    );
}
