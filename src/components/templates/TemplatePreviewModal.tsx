import { useNavigate } from "react-router";
import { X } from "lucide-react";

interface Props {
    title: string;
    slug: string;
    category: string;
    description: string;
    premium: boolean;
    imageSrc: string;
    onClose: () => void;
}

export default function TemplatePreviewModal({ title, slug, category, description, premium, imageSrc, onClose }: Props) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                                {category}
                            </span>
                            {premium && (
                                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                                    Premium
                                </span>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-4 md:flex-row">
                    <div className="flex-1 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="h-full w-full object-contain"
                            style={{ maxHeight: "70vh" }}
                        />
                    </div>
                    <div className="flex w-full flex-col justify-between md:w-64">
                        <div>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                                ATS-friendly layout optimized for parsing systems.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(`/dashboard/resumes/create?template=${slug}`)}
                            className="mt-4 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
                        >
                            Use This Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
