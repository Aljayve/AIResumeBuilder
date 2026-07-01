import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, className = "", ...props }, ref) => {
        const [visible, setVisible] = useState(false);

        return (
            <div className={className}>
                {label && (
                    <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={visible ? "text" : "password"}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-400"
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        tabIndex={-1}
                    >
                        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
