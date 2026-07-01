import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";
import TemplatePreview from "./TemplatePreview";
import TemplatePreviewModal from "./TemplatePreviewModal";
import { getTemplateImageSrc } from "../../constants/templateImages";

interface Props {
    title: string;
    slug: string;
    category: string;
    description: string;
    premium: boolean;
}

export default function TemplateCard({
    title,
    slug,
    category,
    description,
    premium,
}: Props) {
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    const imageSrc = getTemplateImageSrc(slug);

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="relative flex h-56 items-center justify-center bg-gray-50 p-4 dark:bg-gray-800">
                    <TemplatePreview slug={slug} title={title} />
                    {premium && (
                        <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                            Premium
                        </span>
                    )}
                </div>

                <div className="p-5">
                    <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                        {category}
                    </span>

                    <h3 className="mt-3 font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        >
                            <Eye size={16} className="inline mr-1.5" />
                            Preview
                        </button>
                        <button
                            onClick={() => navigate(`/dashboard/resumes/create?template=${slug}`)}
                            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
                        >
                            Use Template
                        </button>
                    </div>
                </div>
            </div>

            {showPreview && (
                <TemplatePreviewModal
                    title={title}
                    slug={slug}
                    category={category}
                    description={description}
                    premium={premium}
                    imageSrc={imageSrc}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
}
