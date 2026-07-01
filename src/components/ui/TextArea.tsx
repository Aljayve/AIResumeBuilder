import { forwardRef } from "react";

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, className = "", ...props }, ref) => {
        return (
            <div className={className}>
                {label && (
                    <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-400"
                    {...props}
                />
            </div>
        );
    }
);

TextArea.displayName = "TextArea";
export default TextArea;
