import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, UserX, Trash2 } from "lucide-react";

export default function UserActions() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-200 bg-white p-1.5 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark" onClick={() => setOpen(false)}>
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                        <Eye size={16} /> View
                    </button>
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                        <UserX size={16} /> Suspend
                    </button>
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10">
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            )}
        </div>
    );
}
