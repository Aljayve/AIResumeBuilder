import clsx from "clsx";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                "rounded-xl px-5 py-3 text-sm font-medium transition",
                {
                    "bg-blue-600 text-white hover:bg-blue-700":
                        variant === "primary",

                    "border border-slate-300 hover:bg-slate-100":
                        variant === "secondary",
                },
                className
            )}
            {...props}
        />
    );
}