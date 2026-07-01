import { useState, useRef, useEffect } from "react";
import { MoreVertical, FileEdit, Copy, Download, Target, Mic, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { resumeApi } from "../../api/resume.api";
import { toast } from "sonner";

interface Props {
    resumeId: string;
    resumeTitle: string;
    onDelete?: (id: string) => void;
}

export default function ResumeActionsMenu({ resumeId, resumeTitle, onDelete }: Props) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleDelete = async () => {
        if (!confirm(`Delete "${resumeTitle}"? This cannot be undone.`)) return;
        setDeleting(true);
        try {
            await resumeApi.delete(resumeId);
            onDelete?.(resumeId);
            toast.success("Resume deleted");
        } catch {
            toast.error("Failed to delete resume");
        } finally {
            setDeleting(false);
            setOpen(false);
        }
    };

    const actions = [
        { label: "Edit Resume", icon: FileEdit, color: "text-gray-700 dark:text-gray-300", onClick: () => navigate(`/dashboard/resumes/${resumeId}`) },
        { label: "Duplicate Resume", icon: Copy, color: "text-gray-700 dark:text-gray-300", onClick: () => toast.info("Coming soon") },
        { label: "Download PDF", icon: Download, color: "text-gray-700 dark:text-gray-300", onClick: () => toast.info("Coming soon") },
        { label: "Job Match", icon: Target, color: "text-gray-700 dark:text-gray-300", onClick: () => navigate("/dashboard/jobs") },
        { label: "Interview Prep", icon: Mic, color: "text-gray-700 dark:text-gray-300", onClick: () => navigate("/dashboard/interview-prep") },
        { label: "Delete Resume", icon: Trash2, color: "text-red-600 dark:text-red-400", onClick: handleDelete, disabled: deleting },
    ];

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <MoreVertical size={18} />
            </button>

            {open && (
                <div
                    className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                    onClick={(e) => e.stopPropagation()}
                >
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.03] ${action.color} disabled:opacity-50`}
                        >
                            <action.icon size={16} className="shrink-0" />
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
